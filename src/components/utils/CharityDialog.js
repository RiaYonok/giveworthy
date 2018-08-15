import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import YoutubePlayer from 'react-player'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PhotoGallery from '@components/utils/PhotoGallery';
const styles = theme => ({
    
    paper: {
      position: 'relative',
      padding: theme.spacing.unit ,
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
export class CharityDialog extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };

    }  
   
    handleOKClose=()=>{
        const {callback} = this.props;
        callback&&callback();
    }

    render() {
        const {cause, open, classes} = this.props;
        return (
        <div>
           {cause&& <Dialog
            open={open}
            onClose={this.handleOKClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Charity profile</DialogTitle>
            <DialogContent >
                <Grid container spacing={40}>
                    <Grid item xs={12}>
                        
                            <YoutubePlayer
                                playsinline
                                url={cause.primaryVideoLink||""}
                                controls = {true}
                                width ={"100%"}
                                height ={"100%"}
                            >
                            </YoutubePlayer>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container className = {classes.subContainer} spacing={32}>
                            <Grid item xs={12} sm={8} >
                                <Grid container spacing={8} alignItems="flex-end">
                                    <Grid item xs={12}>
                                       <Typography variant="title" color="default"  gutterBottom>
                                        {cause.name || "Charity Name"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} >
                                       <Typography variant="subheading" color="default"  gutterBottom>
                                            {cause.webLink&&cause.webLink!=""?cause.webLink:'charitywebsite.com'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                
                            </Grid>
                            <Grid item xs={12} >
                                <div className={classes.grayTextSection}>
                                    <Typography variant="subheading" gutterBottom align="center" className = {classes.verticalMiddleAlign} >
                                        {cause.description||"Misson statement"}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} >
                                <div className={classes.grayTextSection}>
                                    <Typography variant="subheading" gutterBottom align="center" className = {classes.verticalMiddleAlign} >
                                        {cause.percentile||0}% of founds going to core causes
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}  >
                                <div className={classes.grayTextSection}>
                                    <Typography variant="subheading" gutterBottom align="center" className = {classes.verticalMiddleAlign} >
                                        {cause.summary||"Short-term funding goals"}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} >
                                <div className={classes.grayTextSection}>
                                    <Typography variant="subheading" gutterBottom align="center" className = {classes.verticalMiddleAlign} >
                                        {cause.details||"Initiatives that you are trying to fund at the moment"}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={[classes.grayTextSection, classes.photoSection].join(" ")}>
                                    <div style={{margin:20}}> 
                                        <PhotoGallery photos={cause.photoLinks||[]} />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleOKClose} color="primary">
                close
                </Button>
            </DialogActions>
            </Dialog>}
        </div>
        );
    }
}

export default hot(module)(withStyles(styles)(CharityDialog));