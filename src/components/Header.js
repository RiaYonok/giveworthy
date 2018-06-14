import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import logo from '@assets/images/giveworthy-logo.png';
import avatar from '@assets/images/if_male_628288.svg';
import getCurrentUser from '@selectors/getCurrentUser';
 
export class Header extends PureComponent {
  render() {
    const { currentUser } = this.props;

    return (
      <div className="header-container">
        <div className="header">
          <div className="logo">
            <img src={logo} />
          </div>
          <nav className="main-navbar">
          {currentUser.role > 0 &&
            <div className="standard-option admin">
              <p>Admin</p>
            </div>
          }
            <div className="standard-option">
              <p>Dashboard</p>
            </div>
            <div className="standard-option">
              <p>Discover</p>
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

export const mapStateToProps = createSelector(
  getCurrentUser,
  (currentUser) => ({
    currentUser
  })
);

export default connect(mapStateToProps)(Header);