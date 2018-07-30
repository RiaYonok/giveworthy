import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import {updateUserInfo, saveUserInfo} from  '@actions/users';
import { Button, TextField, MenuItem } from '@material-ui/core';
import { ValidatorForm} from '@components/Validators';
import getCurrentUser from '@selectors/getCurrentUser';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputRange from 'react-input-range';

const jwt = require('jsonwebtoken');
import {
    dismissError
  } from '@actions/errors';
  import {
    dismissStatus
  } from '@actions/status';
const styles={
    root:{
        maxWidth:500,
        flexDirection:'row',
        alignItems:'center',
        margin:'50px auto',
        position:"relative",
    },
    form:{
        width:300, 
        margin:'0px auto',
        marginTop:10,
        display:'block',
        textAlign:"center"
    },
    menu: {
        width: 200,
        textAlign:'center'
    }
}

export const mapStateToProps = createSelector(
  getCurrentUser,
  ( currentUser) => ({
    currentUser
  })
);

export class QuestionnarieComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { currentUser, dismissError,dismissStatus } = props;
    this.state={
        id:currentUser.id,
        donationAmount:currentUser.donationAmount||1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    
    dismissError();
    dismissStatus();
    this.ideologies=["liberal", "moderate","conservative"];
  }
  
  handleChange = prop => event => {
    this.setState({[prop] : event.target.value});
  };
  handleSubmit(){
    const {updateUserInfo, saveUserInfo} = this.props;
    updateUserInfo("donationAmount", this.state.donationAmount);
    saveUserInfo({token:jwt.sign({id:this.state.id, donationAmount:this.state.donationAmount}, process.env.SECRET_KEY)},"giver-questionnarie-step-9");
  }
  handleBack(){
    this.props.history.push('/giver-questionnarie-step-8'); 
  }
  render() {
    const { 
        error, 
        status
      } = this.props;
    const self = this;
    const menuItem =[
      {value:1, label:"1.00"},
      {value:15, label:"15.00"},
      {value:30, label:"30.00"},
      {value:50, label:"50.00"},
      {value:100, label:"100.00"},
      {value:0, label:"Custom"},
      {value:-1, label:"Philanthropist of % Income"}
    ]
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          How much are you able to give per month?
        </Typography>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            style={{...styles.form, marginTop:20, }}
            onError={errors => console.log(errors)}
        >
            <TextField
                id="select-donAmount"
                style={{width:'100%'}}
                InputProps={{style:{ fontSize:"22px"}}}
                select
                value={this.state.donationAmount}
                onChange={this.handleChange("donationAmount")}
                SelectProps={{
                    MenuProps: {
                        style: styles.menu,
                    },
                }}
                margin="normal"
                >
                {menuItem.map(option => {
                    return (<MenuItem key={option.value} value={option.value} style={{textAlign:'center'}} >
                    {option.label}   
                    </MenuItem>)
                })}
            
            </TextField>
            
            <FormHelperText 
                className = "helper-text"
                error={error?true:false}>
                {error||""}
            </FormHelperText>
            <Button type="submit" variant="contained"  className="login-button email-signin-button">
            {status?<CircularProgress size={20}/>:'See charities'}
            </Button>
        </ValidatorForm>
        
        <Button  className="backBtn" onClick={this.handleBack}>
          &lt; Back
        </Button>
      </div>
    );
  }
}



export default hot(module)(connect(mapStateToProps,{
  updateUserInfo,
  saveUserInfo, 
  dismissError,
  dismissStatus
})(QuestionnarieComponent));