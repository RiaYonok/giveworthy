import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import googleLogo from '@assets/images/g-logo.png';
import { GoogleLogin } from 'react-google-login';
import  FacebookLogin  from 'react-facebook-login';
import { loginUser } from '@actions/users';
import { hot } from 'react-hot-loader';
import { Button } from '@material-ui/core';

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

    console.log(googleUser);
    loginUser(profile.U3, authResponse.id_token);
  }
  onFacebookLogin(facebookUser){
    console.log(facebookUser);
  } 
  render() {
    
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
          /*clientId="1051526831495-k97buaru1epuj4h12s1h1pet8rqutirr.apps.googleusercontent.com"*/
          clientId="285836376834-pot80j3ep4anfu110ghvn1tgre9j86c3.apps.googleusercontent.com"
          onSuccess={this.onGoogleSignIn}
          onFailure={this.onGoogleSignIn}
          />
      
        <FacebookLogin
          cssClass="login-button facebook-signin-button"
          appId="194728387860007"
          autoLoad={false}
          fields="name,email,picture"
          textButton = "Sign in with Facebook"
          callback={this.onFacebookLogin}>
        </FacebookLogin>
      
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          - or -
        </Typography>
        
        <Button type="button" variant="contained"  className="login-button email-signin-button">
          Use Email Address
        </Button>
      </div>
    );
  }
}

const mapStateToProps = () => ({});


export default hot(module)(connect(mapStateToProps, {
  loginUser 
})(Login));