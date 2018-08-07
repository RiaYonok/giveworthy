import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  footer:{
    padding:"50px 30px 30px 40px",
    background:"#e8e8e8",
    position:"fixed",
    bottom:0,
    height:50,
    width:"100%"
  }
})


export class Footer extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className="root">
        <div className={classes.footer}>
        </div>
      </div>
    );
  }
}

export default hot(module)(withStyles(styles)(Footer));