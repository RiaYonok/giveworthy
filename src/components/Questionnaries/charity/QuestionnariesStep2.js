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

    var tags = cause.get("tags");
    var tagsString = tags?tags.join(","):"";
    this.state={
      "environmental":tagsString.indexOf("environmental")>-1,
      "social":tagsString.indexOf("social")>-1,
      "educational":tagsString.indexOf("education")>-1,
      "etc":tagsString.indexOf("etc")>-1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.handleBack = this.handleBack.bind(this);
    setActiveQuestionnaire(2);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.checked });
  };
  
  handleSubmit(){
    const { nextPage, 
      updateCause } = this.props;
    const state = this.state;
    var tags = [];
    Object.keys(state).forEach(key => {
      if (state[key])
        tags.push(key);
    });
    updateCause("tags", List(tags));
    nextPage();
    this.props.history.push('/charity-questionnarie-step-3'); 
  }
  handleBack(){
    const { prevPage } = this.props;
    prevPage();
    this.props.history.push('/charity-questionnarie-step-1'); 
  }
  handleSkip(){
    const { nextPage} = this.props;
    nextPage();
    this.props.history.push('/charity-questionnarie-step-3'); 
  }
  render() {
    const { 
      activePageInfo
    } = this.props;
    
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          What Causes do you related to?
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          
        </Typography>

          <FormControl 
            style={styles.formControl}
           component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.environmental}
                    onChange={this.handleChange('environmental')}
                    value="environmental"
                  />
                }
                label="Environmental"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.social}
                    onChange={this.handleChange('social')}
                    value="social"
                  />
                }
                label="Social"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.educational}
                    onChange={this.handleChange('educational')}
                    value="educational"
                  />
                }
                label="Educational"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.etc}
                    onChange={this.handleChange('etc')}
                    value="etc"
                  />
                }
                label="Etc..."
              />
            </FormGroup>
          </FormControl>
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