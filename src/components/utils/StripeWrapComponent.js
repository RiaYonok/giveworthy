import React, { PureComponent, Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from '@material-ui/core';
import { ValidatorForm, InputValidator} from '@components/Validators';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import {CardElement, injectStripe} from 'react-stripe-elements';

const jwt = require('jsonwebtoken');
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
   },
   cardElement: {
     margin: "16px 4px 16px",
     borderBottom:"1px solid rgba(0,0,0,0.42)"
   }
}

export class StripeFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        id:props.userid,
        paymentInfo:{
            // cardnumber:currentUser.paymentInfo?currentUser.paymentInfo.cardnumber:"",
            // expiry:currentUser.paymentInfo?currentUser.paymentInfo.expiry:"",
            // cvc:currentUser.paymentInfo?currentUser.paymentInfo.cvc:"",
            addr1:props.paymentInfo?props.paymentInfo.addr1:"",
            addr2:props.paymentInfo?props.paymentInfo.addr2:"",
            state:props.paymentInfo?props.paymentInfo.state:"",
            // zipcode:currentUser.paymentInfo?currentUser.paymentInfo.zipcode:"",
            name:props.paymentInfo?props.paymentInfo.name:"",
            stripeToken:props.paymentInfo?props.paymentInfo.stripeToken:""

        }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  
  handleChange = prop => event => {
    this.setState({paymentInfo: {
        ...this.state.paymentInfo,
        [prop] : event.target.value
    }});
  };
  
  async handleSubmit(){
    
    let {name} = this.state.paymentInfo;
    let {addr1} = this.state.paymentInfo;
    let {addr2} = this.state.paymentInfo;
    let {state} = this.state.paymentInfo;
    let {token} = await this.props.stripe.createToken({
        name: name,
        address_line1: addr1,
        address_line2: addr2,
        address_state: state
    });
    
    this.state.paymentInfo.stripeToken = token.id;
    const {updateUserInfo, saveUserInfo} = this.props;
    updateUserInfo("paymentInfo", this.state.paymentInfo);    
    saveUserInfo({token:jwt.sign(this.state, process.env.SECRET_KEY)},"giver-questionnarie-step-7");
  }
  
  render() {
    const { 
        error, 
        status
      } = this.props;
    const self = this;    
    return (
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
                <Grid item xs={12} style={styles.cardElement} >
                    <CardElement style={{base: {fontSize: '16px'}}}  />
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
                <Grid item xs={12} sm={12}>
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
                {/* <Grid item xs={12} sm={3}>
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
                </Grid> */}
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
    );
  }
}

export default injectStripe(StripeFormComponent);

