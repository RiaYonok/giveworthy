import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
const styles= {
    gridContainer:{
        marginTop:30
    }    
};
export default class ThanksDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        //this.handleChange = this.handleChange.bind(this);
        this.shareOnSocialMedia = this.shareOnSocialMedia.bind(this);
    }  
    shareOnSocialMedia=()=>{

    }
    handleOKClose=()=>{
        const {callback} = this.props;
        callback&&callback();
    }
    render() {
        const {open,causes, username, amount} = this.props;
        return (
        <div>
            <Dialog
            open={open}
            maxWidth = "sm"
            fullWidth = {true}
            onClose={this.handleOKClose}
            aria-labelledby="form-dialog-title"
            >
                <DialogContent >
                    <Typography variant="display3" align="center" gutterBottom>
                        {"Thanks " + username +"!"} 
                    </Typography>
                    <Typography variant="headline" align="center" gutterBottom>
                        {"You just donated $" + amount.toFixed(2) +" each of these charities!"} 
                    </Typography>
                    <div style={styles.gridContainer}>
                        <Grid container spacing={40}>
                            {causes.map((item, id)=>{
                                return (
                                    item.checked&&(<Grid item xs={12} sm={6} key={id}>
                                        <Typography variant="subheading" align="center">
                                        {item.name||"Charity name"}
                                        </Typography>
                                    </Grid>)
                                )
                            })}
                        </Grid>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.shareOnSocialMedia} align="center" variant="contained" className="login-button email-signin-button">
                    Share on social media
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        );
    }
}