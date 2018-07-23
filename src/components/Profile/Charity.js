import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import getCause from '@selectors/getCause';
import { Player,BigPlayButton } from 'video-react';
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
import {updateCause, saveCause, uploadFile} from  '@actions/cause';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginLeft:theme.spacing.unit * 2,
      marginRight:theme.spacing.unit * 2, 
    },
    subContainer:{
        paddingLeft:theme.spacing.unit * 3,
        paddingRight:theme.spacing.unit * 3, 
    },
    formControl: {
        margin: theme.spacing.unit,
        width:"100%"
    },
});
export class Profile extends PureComponent {
  constructor(props) {
    super(props);
    const {cause} = this.props;
    this.state = {
        id: cause.id,
        name: cause.name||"",
        primaryVideoLink:cause.primaryVideoLink||"",
        photoLinks:cause.photoLinks,
        percentile:cause.percentile||0,
        description:cause.description||"",
        summary:cause.summary||"",
        details:caches.details||"",
        editFlags:{
            name:false,
            description:false,
            summary:false,
            details:false
        }
    }
    this.handleChange = this.handleChange.bind(this);
    this.setEditStatus = this.setEditStatus.bind(this);
  }
  handleChange = prop => event => {
    if (this.state.editFlags[prop]){
        const {cause, updateCause} = this.props;
        this.setState({ [prop]: event.target.value });
        updateCause(prop,event.target.value);
    }
    
  };
  setEditStatus =  prop => event => {
    this.setState({ editFlags:{
        [prop]: !this.state.editFlags[prop]
    }});
  }
  render() {
    const { classes } = this.props;
    return (
        <div className="root main-container">
            <Grid container spacing={24} className="page-container">
                <Grid item xs={12}>
                    <Paper className={classes.paper} >
                        <Player
                            playsInline
                            src={this.state.primaryVideoLink}
                        >
                            <BigPlayButton position="center" />
                        </Player>
                    </Paper>
                </Grid>
                <Grid item xs={12}  >
                    <Grid container className={classes.subContainer}> 
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
                        </Grid>
                        
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
  }
}

const mapStateToProps =createSelector(
    getCause,
    (cause) => ({
      cause
    })
  );

export default hot(module)(connect(mapStateToProps,{
    updateCause,
    saveCause,
    uploadFile
})(withStyles(styles)(Profile)));