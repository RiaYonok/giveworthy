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
import { Button } from '@material-ui/core';
import Stepper from '@components/BarStepper';
import getCurrentUser from '@selectors/getCurrentUser';
import AddIcon from '@material-ui/icons/Add';
import UserAvatar from 'react-user-avatar';
import DeleteIcon from '@material-ui/icons/Delete';

const styles={
    root:{
        maxWidth:500,
        flexDirection:'row',
        alignItems:'center',
        margin:'0 auto',
        position:'relative'
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
    backBtn:{
      fontSize:20,
      fontWeight:400,
      margin: "10px auto",
      color:"#ADADAD",
      textTransform: "initial",
      left:"-10%",
      top:0,
      position:"absolute",
    },
    addButton:{
        display: "block",
        margin: "40px auto",
        color:"#ADADAD",
        background:"lightgray",
        width:120,
        height:120,
    },
    addIconBtn:{
      fontSize: 48,
      margin: "0px auto",
      paddingTop: 35,
      display:"block"
    },
    delIconBtn:{
      position:"absolute",
      left:"90%",
      top:"90%"
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
    this.handleBack = this.handleBack.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    setActiveQuestionnaire(2);
  }
  
  
  handleChange(event) {
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({imageURL: e.target.result});
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  };
  deletePhoto(e){
    e.preventDefault();
    this.setState({imageURL: null});
  }
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
  handleBack(){
    const { prevPage } = this.props;
    prevPage();
    this.props.history.push('/questionnarie-step-1'); 
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
        {!this.state.imageURL?("Hey " + (currentUser.fullName||'') +"!"):"Oh Heyyy!"}
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
        {!this.state.imageURL? "Let's load a photo":("Looking good " +currentUser.fullName +"!")}
        </Typography>
        <input
          accept="image/*"
          className="file-input-button"
          id="contained-button-file"
          type="file"
          onChange={this.handleChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="fab"  component="span" aria-label="AddPhoto" style={styles.addButton} >
            {!this.state.imageURL&&<AddIcon style={styles.addIconBtn}/>}
            {this.state.imageURL&&
              <UserAvatar size="128" name={username} colors={['#BDBDBD']} src={this.state.imageURL} style={{margin:0}} />
            }  
            {this.state.imageURL&&<DeleteIcon style={styles.delIconBtn} onClick={this.deletePhoto}/>}
          </Button>
        </label>
        <Button type="submit" variant="contained"  onClick={this.handleSubmit}  className="login-button email-signin-button">
        Next
        </Button>

        <Button  style={styles.skipBtn} onClick={this.handleSkip}>
        Skip
        </Button>
        <Button  style={styles.backBtn} onClick={this.handleBack}>
          &lt; Back
        </Button>
        <Stepper steps={activePageInfo}/>
      </div>
    );
  }
}



export default hot(module)(connect(mapStateToProps,{
  nextPage, 
  prevPage,
  updateUserInfo,
  setActiveQuestionnaire
})(QuestionnarieComponent));