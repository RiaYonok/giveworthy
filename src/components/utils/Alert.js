import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
    constructor(props) {
        super(props);
        const {open} = props;
        this.state={
            open: open||false
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = (b) => {
        const {callback} = props;
        this.setState({ open: false });
        callback(b);
    };

    render() {
        const {title, description} = this.props;
        return (
        <div>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose(false)} color="primary">
                    Disagree
                    </Button>
                    <Button onClick={this.handleClose(true)} color="primary" autoFocus>
                    Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        );
    }
}

export default AlertDialog;