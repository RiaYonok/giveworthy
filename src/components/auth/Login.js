import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import googleLogo from '@assets/images/g-logo.png';
import { GoogleLogin } from 'react-google-login';
import  FacebookLogin  from 'react-facebook-login';
import { loginUser } from '@actions/users';
import { hot } from 'react-hot-loader';

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
    //console.log(facebookUser);
  } 
  render() {
    return (
      <div className="login-container">
        <div className="login-buttons">
          <GoogleLogin 
            className="login-button login-google"
            clientId="1051526831495-k97buaru1epuj4h12s1h1pet8rqutirr.apps.googleusercontent.com"
            onSuccess={this.onGoogleSignIn}
            onFailure={this.onGoogleSignIn}>
            <div className="login-icon">
              <img src={googleLogo} />
            </div>
            Sign in with Google
          </GoogleLogin>
          <FacebookLogin
            appId="194728387860007"
            autoLoad={true}
            fields="name,email,picture"
            textButton = "Sign in with Facebook"
            callback={this.onFacebookLogin}>
          </FacebookLogin>
        </div>
        <div className="login-buttons">
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});


export default hot(module)(connect(mapStateToProps, {
  loginUser 
})(Login));