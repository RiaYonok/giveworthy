import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import googleLogo from 'Images/g-logo.png';
import { GoogleLogin } from 'react-google-login';
import { loginUser } from 'Redux/actions/users';

export class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.onGoogleSignIn = this.onGoogleSignIn.bind(this);
  }

  onGoogleSignIn(googleUser) {
    const { loginUser } = this.props;

    const profile = googleUser.getBasicProfile();
    const authResponse = googleUser.getAuthResponse();

    console.log(googleUser);
    loginUser(profile.U3, authResponse.id_token);
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

const mapStateToProps = () => ({});


export default connect(mapStateToProps, {
  loginUser 
})(Login);