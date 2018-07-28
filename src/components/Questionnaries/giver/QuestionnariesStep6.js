import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import {updateUserInfo, saveUserInfo} from  '@actions/users';
import { Button, Input } from '@material-ui/core';
import { ValidatorForm, InputValidator} from '@components/Validators';
import getCurrentUser from '@selectors/getCurrentUser';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import CreditCardInput from 'react-credit-card-input';

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
        position:"relative"
    },
    form:{
        width:450, 
        margin:'0px auto',
        marginTop:10,
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
      left:"-15%",
      top:0,
      position:"absolute",
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
        paymentInfo:{
            cardnumber:currentUser.paymentInfo?currentUser.paymentInfo.cardnumber:"",
            expiry:currentUser.paymentInfo?currentUser.paymentInfo.expiry:"",
            cvc:currentUser.paymentInfo?currentUser.paymentInfo.cvc:"",
            addr1:currentUser.paymentInfo?currentUser.paymentInfo.addr1:"",
            addr2:currentUser.paymentInfo?currentUser.paymentInfo.addr2:"",
            state:currentUser.paymentInfo?currentUser.paymentInfo.state:"",
            zipcode:currentUser.paymentInfo?currentUser.paymentInfo.zipcode:"",
            name:currentUser.paymentInfo?currentUser.paymentInfo.name:"",
        }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.handleBack = this.handleBack.bind(this);
    dismissError();
    dismissStatus();
  }
  
  
  handleChange = prop => event => {
    this.setState({paymentInfo: {
        ...this.state.paymentInfo,
        [prop] : event.target.value
    }});
  };
  
  handleSubmit(){
    const {updateUserInfo, saveUserInfo} = this.props;
    updateUserInfo("paymentInfo", this.state.paymentInfo);
    saveUserInfo({token:jwt.sign(this.state, process.env.SECRET_KEY)},"giver-questionnarie-step-7");
  }
  handleSkip(){
    
    this.props.history.push('/giver-questionnarie-step-7'); 
  }
  handleBack(){
    this.props.history.push('/giver-questionnarie-step-5'); 
  }
  render() {
    const { 
        error, 
        status
      } = this.props;
    const self = this;
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Payment Info
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Add your payment info bellow
        </Typography>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            style={{...styles.form, marginTop:20, }}
            onError={errors => console.log(errors)}
        >
            <Grid container spacing={8} >
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <Button variant="contained">Paypal</Button>
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <Button variant="contained">Apple Pay</Button>
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <Button variant="contained">etc...</Button>
                </Grid>
                <Grid item xs={12}>
                    {/* <InputValidator
                        fullWidth
                        id="cardnumber"
                        name="cardnumber"
                        formControlStyle={{width:"100%"}}
                        ref="cardnumber"
                        inputLabel="Card Number"
                        type="text"
                        value={this.state.paymentInfo.cardnumber}
                        validators={['required']}
                        errorMessages={['Your card number is required']}
                        onChange={this.handleChange('cardnumber')}
                    /> */}
                    <CreditCardInput
                        containerStyle={{background:'none', width:"100%", margin:"20px 0 10px 0"}}
                        fieldStyle ={{background:'none', borderBottom:"1px solid rgba(0,0,0,0.42)"}}
                        inputStyle ={{background:'none'}}
                        cardNumberInputProps={{ value: this.state.paymentInfo.cardnumber, onChange:this.handleChange('cardnumber')}}
                        cardExpiryInputProps={{ value: this.state.paymentInfo.expiry, onChange:this.handleChange('expiry') }}
                        cardCVCInputProps={{ value: this.state.paymentInfo.cvc, onChange:this.handleChange('cvc') }}
                    />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <InputValidator
                        id="address"
                        name="address"
                        ref="address"
                        formControlStyle={{width:"100%"}}
                        inputLabel="Address"
                        type="text"
                        value={this.state.paymentInfo.addr1}
                        validators={['required']}
                        errorMessages={['Address is required']}
                        onChange={this.handleChange('addr1')}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <InputValidator
                        id="state"
                        name="state"
                        ref="state"
                        formControlStyle={{width:"100%"}}
                        inputLabel="State"
                        type="text"
                        value={this.state.paymentInfo.state}
                        validators={['required']}
                        errorMessages={['State is required']}
                        onChange={this.handleChange('state')}
                    />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <InputValidator
                        id="address2"
                        name="address2"
                        ref="address2"
                        formControlStyle={{width:"100%"}}
                        inputLabel="Address #2"
                        type="text"
                        value={this.state.paymentInfo.addr2}
                        onChange={this.handleChange('addr2')}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <InputValidator
                        id="zipcode"
                        name="zipcode"
                        ref="zipcode"
                        formControlStyle={{width:"100%"}}
                        inputLabel="Zipcode"
                        type="text"
                        value={this.state.paymentInfo.zipcode}
                        validators={['required']}
                        errorMessages={['Zipcode is required']}
                        onChange={this.handleChange('zipcode')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputValidator
                        fullWidth
                        id="name"
                        name="name"
                        ref="name"
                        formControlStyle={{width:"100%"}}
                        inputLabel="First/Last name"
                        type="text"
                        value={this.state.paymentInfo.name}
                        validators={['required', 'minStringLength:2','maxStringLength:50']}
                        errorMessages={['Your name is required', 'Your name\'s length must be more than 2.', 'Your name\'s length must be less than 30.']}
                        onChange={this.handleChange('name')}
                    />
                </Grid>
            </Grid> 
            
        
            <Button type="submit" variant="contained"  className="login-button email-signin-button">
            {status?<CircularProgress size={20}/>:'Next'}
            </Button>
            <FormHelperText 
                className = "helper-text"
                error={error?true:false}>
                {error||""}
            </FormHelperText>
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