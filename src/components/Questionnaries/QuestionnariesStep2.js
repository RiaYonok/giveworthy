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
import  {Link}  from  'react-router-dom';
import Stepper from '@components/BarStepper';
import { ValidatorForm, InputValidator} from '@components/Validators';
import getCurrentUser from '@selectors/getCurrentUser';

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
    this.state={
        imageURL:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    const {setActiveQuestionnaire} = props;
    setActiveQuestionnaire(2);
  }
  
  
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
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
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Hey {currentUser.fullName}
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Let's load a photo
        </Typography>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            style={styles.form}
            onError={errors => console.log(errors)}
        >
             
            <InputValidator
                fullWidth
                id="username"
                name="username"
                ref="username"
                formControlStyle={styles.form}
                inputLabel="Enter your name"
                type="text"
                value={this.state.fullName}
                validators={['required', 'minStringLength:2','maxStringLength:50']}
                errorMessages={['Your name is required', 'Your name\'s length must be more than 2.', 'Your name\'s length must be less than 30.']}
                onChange={this.handleChange('fullName')}
            />
        
            <Button type="submit" variant="contained"  className="login-button email-signin-button">
            Next
            </Button>
        </ValidatorForm>
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