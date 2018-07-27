import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import getCause from '@selectors/getCause';
import YoutubePlayer from 'react-player'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {updateCause, saveCause, uploadFile} from  '@actions/cause';
import PhotoGallery from '@components/utils/PhotoGallery';
import { Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import PhotoIcon from '@material-ui/icons/Image';
import InputDialog from '@components/utils/InputDialog';
import getError from '@selectors/getError';
import getStatus from '@selectors/getStatus';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    dismissError
  } from '@actions/errors';
import {
    dismissStatus
  } from '@actions/status';
const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        position: 'relative',
      padding: theme.spacing.unit ,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginLeft:theme.spacing.unit * 2,
      marginRight:theme.spacing.unit * 2, 
      height:'75vh'
    },
    subContainer:{
        paddingLeft:theme.spacing.unit * 3,
        paddingRight:theme.spacing.unit * 3, 
    },
    formControl: {
        margin: theme.spacing.unit,
        width:"96%"
    },
    grayTextSection:{
        border:"1px solid #a6a6a6",
        height:200,
        background:"#e8e8e8",
        display:"table",
        position:"relative",
        overflow:"auto",
        borderRadius:5,
        width:"100%"
    },
    verticalMiddleAlign:{
        verticalAlign:"middle",
        display:"table-cell",
        fontSize:22,
        padding:"0 5px"
    },
    rightTopIcon:{
        position:"absolute",
        right:0,
        top:0
    },
    photoSection:{
        height:"40vh",
        overflow:"auto",
        maxHeight:400
    },
    input: {
        display: 'none',
    },
    leftSpacing: {
        marginLeft: theme.spacing.unit,
    },
    rightSpacing: {
        marginRight: theme.spacing.unit,
    },
});
export class Profile extends PureComponent {
  constructor(props) {
    super(props);
    const {cause, dismissError, dismissStatus} = this.props;
    this.state = {
        id: cause.id,
        name: cause.name||"",
        primaryVideoLink:cause.primaryVideoLink||"",
        photoLinks:cause.photoLinks||[],
        percentile:cause.percentile||0,
        description:cause.description||"",
        summary:cause.summary||"",
        details:caches.details||"",
        webLink:cause.webLink||"",
        editFlags:{
            name:false,
            description:false,
            summary:false,
            details:false,
            webLink:false,
            percentile:false,
            openAddLinkDialog:false
        }
    }
    this.handleChange = this.handleChange.bind(this);
    this.setEditStatus = this.setEditStatus.bind(this);
    this.onAddPhoto = this.onAddPhoto.bind(this);
    this.onAddLink = this.onAddLink.bind(this);
    this.addLinkCallback = this.addLinkCallback.bind(this);
    this.onDeletePhotoLink = this.onDeletePhotoLink.bind(this);
    this.onSaveCause = this.onSaveCause.bind(this);
    dismissError();
    dismissStatus();
  }
  handleChange = prop => event => {
    if (this.state.editFlags[prop]){
        const {updateCause} = this.props;
        this.setState({ [prop]: event.target.value });
        updateCause(prop,event.target.value);
    }
    
  };
  setEditStatus =  prop => event => {
    this.setState({ editFlags:{
        [prop]: !this.state.editFlags[prop]
    }});
  };
  addPhotoLinkToState(src, dimension){
    var links = this.state.photoLinks;
    links.push({
        src: src,
        width:dimension?dimension.width:1, 
        height:dimension?dimension.height:1
    })
    this.setState({photoLinks: links});
    this.forceUpdate();
    const {updateCause} = this.props;
    updateCause("photoLinks",links);
  }
  addLinkCallback(b, link){
    if (b){
        var self = this;
        this.getImageSize(link, function(dimension){
            self.addPhotoLinkToState(link, dimension);
        })
    }
    this.setState({
        editFlags:{
            openAddLinkDialog:false
        }
    })
  }
  onAddPhoto(event){
    if (event.target.files && event.target.files[0]) {
        const self = this;
        let reader = new FileReader();
        reader.onload = (e) => {
            self.getImageSize(e.target.result, function(dimension){
                self.addPhotoLinkToState(e.target.result, dimension);
            })
           
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  }
  onAddLink(){
    this.setState({
        editFlags:{
            openAddLinkDialog:true
        }
    })
  }
  onDeletePhotoLink(photos){
    this.setState({photoLinks: photos});
    this.forceUpdate();
    const {updateCause} = this.props;
    updateCause("photoLinks",photos);
  }
  getImageSize(src, cb){

    var image = new Image(); // or document.createElement('img')
    image.onload = function() {
        cb({width:this.width, height:this.height})
    };
    image.src = src;
  }

  onSaveCause(){
    const { cause, saveCause } = this.props;

    saveCause({
      id:cause.get("id"),
      ...this.state
    });
  }

  render() {
    const { classes, error, status } = this.props;
    
    return (
        <div className="root main-container">
            <Grid container spacing={40}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <YoutubePlayer
                            playsinline
                            url={this.state.primaryVideoLink||""}
                            controls = {true}
                            width ={"100%"}
                            height ={"100%"}
                        >
                        </YoutubePlayer>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Grid container className = {classes.subContainer} spacing={32}>
                        <Grid item xs={12} sm={8} >
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item xs={8} sm={6}>
                                    {!this.state.editFlags.name?<Typography variant="title" color="default"  gutterBottom>
                                            {this.state.name || "Charity Name"}
                                    </Typography>:
                                    <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="name">Charity Name</InputLabel>
                                            <Input id="name" value={this.state.name} onChange={this.handleChange("name")} />
                                        </FormControl>}
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={this.setEditStatus("name")}>
                                        {this.state.editFlags.name?<SaveIcon/>:<EditIcon />}
                                    </IconButton>
                                </Grid>
                                <Grid item xs={8} sm={6}>
                                    {!this.state.editFlags.webLink?<Typography variant="subheading" color="default"  gutterBottom>
                                            {this.state.webLink!=""?this.state.webLink:'charitywebsite.com'}
                                    </Typography>:
                                    <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="name">Charity Website</InputLabel>
                                            <Input id="name" value={this.state.webLink} onChange={this.handleChange("webLink")} />
                                        </FormControl>}
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={this.setEditStatus("webLink")}>
                                        {this.state.editFlags.webLink?<SaveIcon/>:<EditIcon />}
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            
                        </Grid>
                        <Grid item xs={12} >
                            <div className={classes.grayTextSection}>
                                {!this.state.editFlags.description?(<Typography variant="subheading" gutterBottom align="center" className = {classes.verticalMiddleAlign} >
                                    {this.state.description||"Misson statement"}
                                </Typography>):
                                <FormControl
                                    className = {classes.formControl}
                                    >
                                    <TextField  
                                        value={this.state.description}
                                        onChange={this.handleChange("description")} 
                                        multiline = {true}
                                        rows = {4}
                                        />
                                </FormControl>}
                                <IconButton onClick={this.setEditStatus("description")} className={classes.rightTopIcon}>
                                    {this.state.editFlags.description?<SaveIcon/>:<EditIcon />}
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <div className={classes.grayTextSection}>
                                {!this.state.editFlags.percentile?(<Typography variant="subheading" gutterBottom align="center" className = {classes.verticalMiddleAlign} >
                                    {this.state.percentile||0}% of founds going to core causes
                                </Typography>):
                                <FormControl
                                    className = {classes.formControl}
                                    >
                                    <TextField  
                                        value={this.state.percentile||0}
                                        style = {{width:100}}
                                        onChange={this.handleChange("percentile")} 
                                        type = {"number"}
                                        startadornment={<InputAdornment position="start">%</InputAdornment>}
                                    />
                                </FormControl>}
                                <IconButton onClick={this.setEditStatus("percentile")} className={classes.rightTopIcon}>
                                    {this.state.editFlags.percentile?<SaveIcon/>:<EditIcon />}
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={5} >
                            <div className={classes.grayTextSection}>
                                {!this.state.editFlags.summary?(<Typography variant="subheading" gutterBottom align="center" className = {classes.verticalMiddleAlign} >
                                    {this.state.summary||"Short-term funding goals"}
                                </Typography>):
                                <FormControl
                                    className = {classes.formControl}
                                    >
                                    <TextField  
                                        value={this.state.summary}
                                        onChange={this.handleChange("summary")} 
                                        multiline = {true}
                                        rows = {4}
                                        />
                                </FormControl>}
                                <IconButton onClick={this.setEditStatus("summary")} className={classes.rightTopIcon}>
                                    {this.state.editFlags.summary?<SaveIcon/>:<EditIcon />}
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={5} >
                            <div className={classes.grayTextSection}>
                                {!this.state.editFlags.details?(<Typography variant="subheading" gutterBottom align="center" className = {classes.verticalMiddleAlign} >
                                    {this.state.details||"Initiatives that you are trying to fund at the moment"}
                                </Typography>):
                                <FormControl
                                    className = {classes.formControl}
                                    >
                                    <TextField  
                                        value={this.state.details}
                                        onChange={this.handleChange("details")} 
                                        multiline = {true}
                                        rows = {4}
                                        />
                                </FormControl>}
                                <IconButton onClick={this.setEditStatus("details")} className={classes.rightTopIcon}>
                                    {this.state.editFlags.details?<SaveIcon/>:<EditIcon />}
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={[classes.grayTextSection, classes.photoSection].join(" ")}>
                                <div style={{margin:20}}> 
                                    <div style={{margin:"0 0 10px 0"}}>
                                        <Button variant="outlined" component="span" className={classes.rightSpacing} 
                                            onClick={this.onAddLink}>
                                            Add Link<LinkIcon className={classes.leftSpacing}  /> 
                                        </Button>
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            id="outlined-button-file"
                                            multiple
                                            type="file"
                                            onChange = {this.onAddPhoto}
                                        />
                                        <label htmlFor="outlined-button-file">
                                            <Button variant="outlined" component="span" >
                                                Add Photo<PhotoIcon className={classes.leftSpacing}  />
                                            </Button>
                                        </label>
                                    </div>
                                    <div>
                                    <PhotoGallery photos={this.state.photoLinks||[]} deleteCallback={this.onDeletePhotoLink}/>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} style={{textAlign:'center'}}>
                            <Button variant="contained" align="center" onClick={this.onSaveCause}>
                            {status?<CircularProgress size={20}/>:'Looks good/Publish'}</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <InputDialog 
                open = {this.state.editFlags.openAddLinkDialog||false}
                contentText={"Please add valid photo link."}
                title={"Add Link"}
                label={"Photo Link"}
                callback = {this.addLinkCallback}
            />
        </div>
    );
  }
}

const mapStateToProps =createSelector(
    getCause,
    getError,
    getStatus,
    (cause, error, status) => ({
      cause,
      error,
      status
    })
  );

export default hot(module)(connect(mapStateToProps,{
    updateCause,
    saveCause,
    uploadFile,
    dismissError,
    dismissStatus
})(withStyles(styles)(Profile)));