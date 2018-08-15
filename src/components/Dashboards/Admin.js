import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core/styles';
import { createSelector } from 'reselect';
import getCurrentUser from '@selectors/getCurrentUser';
import UserAvatar from 'react-user-avatar';
import avatar from '@assets/images/if_male_628288.svg';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { Button, Hidden } from '@material-ui/core';
import {getCausesForAcception} from '@api';
import msg from '@assets/i18n/en';
const moment = require('moment');
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
    postDesc:{
      fontSize:20,
      fontWeight:'400',
      color:"#757575"
    },
    button:{
      color:"#757575",
      marginLeft:5,
      marginRight:5,
    }
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
    const {classes} = this.props;
    return (
        <List>
          {this.state.causes.map((item, id)=>{
            var name = (item.name&&item.name.length>0)?item.name:"Charity Name";
            var postedDateStr = moment(item.created_at||item.updated_at).format("H:mm:ss MM/DD/YYYY");
              return(
                <ListItem
                  key={id}
                  role={undefined}
                  dense
                  button
                  //onClick={this.handleToggle(value)}
                  className={classes.listItem}
                >
                  <UserAvatar 
                      size="48" 
                      name={name} 
                      src={item.imageURL} 
                      colors={['#BDBDBD']} 
                    />
                  <ListItemText primary={name} className={classes.postDesc}  secondary={`Posted at ${postedDateStr}`}/>
                  <ListItemSecondaryAction>
                    <Hidden xsDown>
                      <Button variant="outlined" className={classes.button}>Approve</Button>
                      <Button variant="outlined" className={classes.button}>Deny</Button>
                    </Hidden>
                    <Hidden  only={['sm', 'lg','xl','md']}>
                      <IconButton aria-label="approve">
                        <DoneIcon/>
                      </IconButton>
                      <IconButton aria-label="deny">
                        <ClearIcon/>
                      </IconButton>
                    </Hidden>
                  </ListItemSecondaryAction>
                </ListItem>
                
              )
            })}
        </List>
    )
  }
  componentDidMount(){
    const causes = getCausesForAcception();
    const self = this;
    causes.then(function(res){
      if (res.msg == msg.SUCCESS){
        res.causes.forEach((item)=>{
          item.checked = true;
        });
        self.setState({causes:res.causes});
      }
    })
  }
  render() {
    const {classes,user} = this.props;
    return (
      <div className="main-container">
        <div className={classes.graySection}>
          {this.renderCharityList()}
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