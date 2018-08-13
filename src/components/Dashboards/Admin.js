import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core/styles';
import { createSelector } from 'reselect';
import getCurrentUser from '@selectors/getCurrentUser';
const styles= theme => ({
    graySection:{
        background:"#DDD",
        border:"1px solid #BDBDBD",
        textAlign:"left",
        margin:"0 auto",
        paddingBottom:theme.spacing.unit * 5,
        paddingTop:theme.spacing.unit * 7,
        paddingLeft:theme.spacing.unit*2,
        paddingRight:theme.spacing.unit*2,
        minHeight:300,
        maxWidth:1024
    },
})
export class AdminDashboard extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
        causes:[]
    }
    this.renderCharityList = this.renderCharityList.bind(this);
  }
  renderCharityList(){
    return (
        <div></div>
    )
  }
  render() {
    const {classes,user} = this.props;
    return (
      <div className="main-container">
        <div className={classes.graySection}>
        </div>
      </div>
    );
  }
}
const mapStateToProps =createSelector(
  getCurrentUser,
  (user) => ({
    user
  })
);

export default hot(module)(connect(mapStateToProps)(withStyles(styles)(AdminDashboard)));