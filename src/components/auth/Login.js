import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import  {Link}  from  'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import  FacebookLogin  from 'react-facebook-login';
import { loginUser } from '@actions/users';
import { hot } from 'react-hot-loader';
import { Button } from '@material-ui/core';
import config from '@assets/config';
import getCurrentUser from '@selectors/getCurrentUser';
import { createSelector } from 'reselect';

export class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.onGoogleSignIn = this.onGoogleSignIn.bind(this);
    this.onFacebookLogin = this.onFacebookLogin.bind(this);
  }
  
  onGoogleSignIn(googleUser) {
    const { loginUser } = this.props;
    
    const profile = googleUser.getBasicProfile();
    const authResponse = googleUser.getAuthResponse();
    console.log("profile:", profile);

    loginUser(profile.U3, authResponse.id_token);
    console.log(this.props);
  }
  onFacebookLogin(facebookUser){
    console.log(facebookUser);
  } 
  render() {

    var googleID = process.env.NODE_ENV=='development'?config.GOOGLE_CLIENT_ID_LOCAL:config.GOOGLE_CLIENT_ID_DO;
    return (
      <div className="root">
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Good to have you
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          how to do you want to create your account
        </Typography>
        
        <GoogleLogin 
          className="login-button gplus-signin-button"
          buttonText = "Sign in with Google+"
          clientId={googleID}
          onSuccess={this.onGoogleSignIn}
          onFailure={this.onGoogleSignIn}
          />
      
        <FacebookLogin
          cssClass="login-button facebook-signin-button"
          appId={config.FACEBOOK_APP_ID}
          autoLoad={false}
          fields="name,email,picture"
          textButton = "Sign in with Facebook"
          callback={this.onFacebookLogin}>
        </FacebookLogin>
      
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          - or -
        </Typography>
        <Link to="/loginwithemail" className="link-button">
          <Button type="button" variant="contained"  className="login-button email-signin-button">
            Use Email Address
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps =()=> ({});

export default hot(module)(connect(mapStateToProps, {
  loginUser 
})(Login));