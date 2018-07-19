import React, { PureComponent } from 'react';
import {List} from "immutable";
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';

import {getActivePageInfo } from '@selectors/questionnaires';

import {setActiveQuestionnaire,
        nextPage,
        prevPage} from '@actions/questionnaires';
import {updateCause} from  '@actions/cause';
import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Stepper from '@components/BarStepper';
import getCause from '@selectors/getCause';

const styles={
    root:{
        maxWidth:500,
        flexDirection:'row',
        alignItems:'center',
        margin:'0 auto',
        position:"relative"
    },
    form:{
      width:300, 
      margin:'30px auto',
      display:'block'
    },
    formControl:{
      width:200, 
      margin:'0px auto',
      display:'block'
    },
    backBtn:{
      fontSize:20,
      fontWeight:400,
      margin: "10px auto",
      color:"#ADADAD",
      textTransform: "initial",
      left:"-20%",
      top:0,
      position:"absolute",
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
  getCause,
  ( activePageInfo, cause) => ({
    activePageInfo,
    cause
  })
);

export class QuestionnarieComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { cause, setActiveQuestionnaire } = props;
    this.state={
      primaryVideoLink:cause.primaryVideoLink||""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.handleBack = this.handleBack.bind(this);
    setActiveQuestionnaire(3);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.checked });
  };
  
  handleSubmit(){
    const { nextPage, 
      updateCause } = this.props;
    const state = this.state;
   
    nextPage();
    this.props.history.push('/charity-questionnarie-step-4'); 
  }
  handleBack(){
    const { prevPage } = this.props;
    prevPage();
    this.props.history.push('/charity-questionnarie-step-2'); 
  }
  handleSkip(){
    const { nextPage} = this.props;
    nextPage();
    this.props.history.push('/charity-questionnarie-step-4'); 
  }
  render() {
    const { 
      activePageInfo
    } = this.props;
    
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Add a video message
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Video message about the cause and thanking donors
        </Typography>

          
          <Button type="submit" variant="contained" onClick={this.handleSubmit} className="login-button email-signin-button">
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
  updateCause,
  setActiveQuestionnaire
})(QuestionnarieComponent));