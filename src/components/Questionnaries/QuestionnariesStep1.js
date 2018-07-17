import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';

import {getActivePageInfo } from '@selectors/questionnaires';

import {nextPage, 
        prevPage } from '@actions/questionnaires';
import { Button } from '@material-ui/core';
import  {Link}  from  'react-router-dom';
import Stepper from '@components/BarStepper';
import { ValidatorForm, InputValidator} from '@components/Validators';


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
    }
}

export const mapStateToProps = createSelector(
  getActivePageInfo,
  ( activePageInfo) => ({
    activePageInfo
  })
);

export class Signup extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
        username:"",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleMouseDownPassword (event){
    event.preventDefault();
  };
  handleSubmit(){
      
  }
  render() {
    const { 
      activePageInfo,
      nextPage
    } = this.props;
    var steps=activePageInfo;
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Hi,
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Let us know who are you
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
                value={this.state.username}
                validators={['required', 'minStringLength:2','maxStringLength:50']}
                errorMessages={['Your name is required', 'Your name\'s length must be more than 2.', 'Your name\'s length must be less than 30.']}
                onChange={this.handleChange('username')}
            />
        
            <Button type="submit" variant="contained"  className="login-button email-signin-button">
            Next
            </Button>
        </ValidatorForm>
        <Stepper steps={activePageInfo}/>
      </div>
    );
  }
}



export default hot(module)(connect(mapStateToProps,{
  nextPage, 
})(Signup));