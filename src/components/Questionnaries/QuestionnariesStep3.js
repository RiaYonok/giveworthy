import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';

import {getActivePageInfo } from '@selectors/questionnaires';

import {setActiveQuestionnaire,
        nextPage} from '@actions/questionnaires';
import {updateUserInfo} from  '@actions/users';
import { Button } from '@material-ui/core';

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
    const { currentUser,setActiveQuestionnaire } = props;
    this.state={
        zipcode:currentUser.zipcode||""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);

    setActiveQuestionnaire(3);

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
    this.props.history.push('/questionnarie-step-4'); 
  }
  handleSkip(){
    const { nextPage} = this.props;
    nextPage(this.props.history);
    this.props.history.push('/questionnarie-step-4'); 
  }
  render() {
    const { 
      activePageInfo
    } = this.props;
    
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Keep it local
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Let us know your hood and well connect you to local needs
        </Typography>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            style={styles.form}
            onError={errors => console.log(errors)}
        >
             
            <InputValidator
                fullWidth
                id="zipcode"
                name="zipcode"
                ref="zipcode"
                formControlStyle={styles.form}
                inputLabel="Enter zipcode"
                type="text"
                value={this.state.zipcode}
                validators={['required']}
                errorMessages={['Zipcode is required']}
                onChange={this.handleChange('zipcode')}
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