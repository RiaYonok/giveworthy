import React, { PureComponent } from 'react';
import googleLogo from 'Images/g-logo.png';
import { GoogleLogin } from 'react-google-login';

class Login extends PureComponent {
  onGoogleSignIn(googleUser) {
    console.log(googleUser.getBasicProfile());
    console.log(googleUser.getAuthResponse());
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
        </div>
      </div>
    );
  }
}

export default Login;