import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';

import {getActivePageInfo } from '@selectors/questionnaires';

import {setActiveQuestionnaire,
        nextPage, 
        prevPage } from '@actions/questionnaires';
import {updateUserInfo} from  '@actions/users';
import { Button, Avatar } from '@material-ui/core';

import Stepper from '@components/BarStepper';
import { ValidatorForm, InputValidator} from '@components/Validators';
import getCurrentUser from '@selectors/getCurrentUser';
import AddIcon from '@material-ui/icons/Add';
import UserAvatar from 'react-user-avatar';
import defaultAvatarIcon from '@assets/images/if_male_628288.svg';

const styles={
    root:{
        maxWidth:500,
        flexDirection:'row',
        alignItems:'center',
        margin:'0 auto'
    },
    form:{
        width:300, 
        margin:'30px auto',
        display:'block'
    },
    skipBtn:{
      textAlign:'center',
      fontSize:16,
      margin: "40px auto",
      display: "block",
      color:"#ADADAD",
      textTransform: "initial"
   },
   addButton:{
      display: "block",
      margin: "40px auto",
      color:"#ADADAD",
      background:"lightgray",
      width:120,
      height:120,
   }
}

export const mapStateToProps = createSelector(
  getActivePageInfo,
  getCurrentUser,
  ( activePageInfo, currentUser) => ({
    activePageInfo,
    currentUser
  })
);

export class QuestionnarieComponent extends PureComponent {
  constructor(props) {
    super(props);
    const {currentUser, setActiveQuestionnaire} = props;
    this.state={
        imageURL:currentUser.imageURL
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    
    setActiveQuestionnaire(2);
  }
  
  
  handleChange() {
    this.setState({
      imageURL: defaultAvatarIcon
    })

  };
  
  handleSubmit(){
    const { nextPage, 
      updateUserInfo } = this.props;
    const state = this.state;

    Object.keys(state).forEach(key => {
      updateUserInfo(key, state[key]);
    });
    nextPage();
    this.props.history.push('/questionnarie-step-3'); 
  }
  handleSkip(){
    const { nextPage} = this.props;
    nextPage();
    this.props.history.push('/questionnarie-step-3'); 
  }
  render() {
    const { 
      activePageInfo,
      currentUser
    } = this.props;
    //console.log(currentUser);
    var username = currentUser?currentUser.fullName||"A":"A";
    
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Hey {currentUser.fullName}
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Let's load a photo
        </Typography>
        
        <Button variant="fab" color="primary" aria-label="AddPhoto" style={styles.addButton}  onClick={this.handleChange}>
          {!this.state.imageURL&&<AddIcon />}
          {this.state.imageURL&&<UserAvatar size="128" name={username} colors={['#BDBDBD']} src={this.state.imageURL} style={{margin:0}} />}  
        </Button>

        <Button type="submit" variant="contained"  className="login-button email-signin-button">
        Next
        </Button>

        <Button  style={styles.skipBtn} onClick={this.handleSkip}>
        Skip
        </Button>
        <Stepper steps={activePageInfo}/>
      </div>
    );
  }
}



export default hot(module)(connect(mapStateToProps,{
  nextPage, 
  updateUserInfo,
  setActiveQuestionnaire
})(QuestionnarieComponent));