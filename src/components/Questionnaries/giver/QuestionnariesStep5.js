import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import {getActivePageInfo } from '@selectors/questionnaires';
import {setActiveQuestionnaire,
        nextPage,
        prevPage} from '@actions/questionnaires';
import {updateUserInfo} from  '@actions/users';
import { Button } from '@material-ui/core';
import Stepper from '@components/BarStepper';
import { ValidatorForm, InputValidator, TextValidator} from '@components/Validators';
import getCurrentUser from '@selectors/getCurrentUser';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import UserAvatar from 'react-user-avatar';

const styles={
  root:{
      maxWidth:500,
      flexDirection:'row',
      alignItems:'center',
      margin:'50px auto',
      position:"relative"
  },
  form:{
      width:"100%"
  },
  addButton:{
    display: "block",
    margin: "40px auto",
    color:"#ADADAD",
    background:"lightgray",
    width:120,
    height:120,
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
     left:"-15%",
     top:0,
     position:"absolute",
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
    const { currentUser, setActiveQuestionnaire } = props;
    this.state={
        fullName:currentUser.fullName||"",
        givenName:currentUser.givenName||"",
        familyName:currentUser.familyName||"",
        imageURL:currentUser.imageURL||null,
        email:currentUser.email||"",
        note:currentUser.note||""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    setActiveQuestionnaire(5);

  }
  
  handlePhotoChange(event) {
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({imageURL: e.target.result});
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  deletePhoto(e){
    e.preventDefault();
    this.setState({imageURL: null});
  }
  handleSubmit(){
    const { nextPage, 
      updateUserInfo } = this.props;
    
    var fullName = this.state.fullName;
    this.state.familyName = fullName.split(" ")[0];
    this.state.givenName = fullName.replace(this.state.familyName,"").trim();
    const state = this.state;
    Object.keys(state).forEach(key => {
      updateUserInfo(key, state[key]);
    });
   
    //this.props.history.push('/questionnarie-step-2'); 
  }
  handleBack(){
    const { prevPage } = this.props;
    prevPage();
    this.props.history.push('/giver-questionnarie-step-4'); 
  }
  render() {
    const { 
      activePageInfo,
      currentUser
    } = this.props;
    var username = currentUser?currentUser.fullName||"A":"A";
    return (
      <div className="root" style={styles.root}>
        <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              style={styles.form}
              onError={errors => console.log(errors)}>
          <Grid container spacing={40}>
            <Grid item xs={12} sm={3}>
            <input
              accept="image/*"
              className="file-input-button"
              id="contained-button-file"
              type="file"
              onChange={this.handlePhotoChange}
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
            </Grid>
            <Grid item xs={12} sm={1}></Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="title" color="default" className="sub-header-plain" gutterBottom>
              Account details
              </Typography>
              
                <InputValidator
                  fullWidth
                  id="username"
                  name="username"
                  formControlStyle={styles.form}
                  inputLabel="Enter your name"
                  type="text"
                  value={this.state.fullName}
                  onChange={this.handleChange('fullName')}
                />
                <InputValidator
                  fullWidth
                  id="email"
                  name="email"
                  formControlStyle={styles.form}
                  inputLabel="Enter your name"
                  inputLabel="Email Address"
                  type="email"
                  value={this.state.email}
                  validators={['required', 'isEmail']}
                  errorMessages={['User email is required', 'User email is not valid']}
                  onChange={this.handleChange('email')}
                />
                <TextValidator
                  fullWidth
                  id="note"
                  name="note"
                  multiline={true}
                  placeholder = "You'll enter in the reasons why you like to help, maybe a story or a reason behind what drives you to give."
                  ref="note"
                  rows="4"
                  formcontrolstyle={styles.form}
                  value={this.state.note}
                  onChange={this.handleChange('note')}
                />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained"  className="login-button email-signin-button">
          Looks Good
          </Button>
        </ValidatorForm>
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