import React, { PureComponent } from 'react';
import logo from 'Images/giveworthy-logo.png';
import avatar from 'Images/if_male_628288.svg';
 
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
              <p>Admin</p>
            </div>
            <div className="standard-option">
              <p>Dashboard</p>
            </div>
            <div className="standard-option">
              <p>About</p>
            </div>
          </nav>
          <div className="avatar-menu-container">
            <div className="avatar-menu">
              <img src={avatar} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;