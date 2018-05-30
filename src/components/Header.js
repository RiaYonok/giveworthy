import React, { PureComponent } from 'react';
import logo from 'Images/Test-Logo.svg';
 
class Header extends PureComponent {
  render() {
    return (
      <div className="header-container">
        <div className="header">
          <div className="logo">
            <img src={logo} />
          </div>
          <nav className="main-navbar">
            <div className="standard-option">
            <p>About</p>
            </div>
            <div className="standard-option">
              <p>Other</p>
            </div>
            <div className="standard-option">
              <p>Login</p>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;