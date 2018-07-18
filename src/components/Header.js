import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import  {Link}  from  'react-router-dom';
import { createSelector } from 'reselect';
import logo from '@assets/images/giveworthy-logo.png';
import avatar from '@assets/images/if_male_628288.svg';
import getCurrentUser from '@selectors/getCurrentUser';
import { hot } from 'react-hot-loader';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import UserAvatar from 'react-user-avatar';

export class Header extends PureComponent {
  
  render() {
    const { currentUser } = this.props;
    
    return (
      <div className="root">
        <AppBar position="static" color="default">
          <Toolbar >

            <Typography variant="title" color="primary" className="flex" >
              <Link to="/" className="link-button"><img src={logo} /></Link>
            </Typography>
            <div>
              <Link to="/about" className="link-button">
                <Button>About</Button>
              </Link>
              <Link to="/other"  className="link-button">
                <Button>Other...</Button>
              </Link>
              {currentUser&&!currentUser.id&&(
              <Link to="/login"  className="link-button">
                <Button>Login </Button>
              </Link>)}
              {currentUser&&currentUser.id&&(
              <UserAvatar size="48" name="Robin San" src={currentUser.imageURL} colors={['#ccc', '#fafafa', '#ccaabb']} style={{display:'inline-flex'}}/>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
/*
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
*/

export const mapStateToProps = createSelector(
  getCurrentUser,
  (currentUser) => ({
    currentUser
  })
);

export default hot(module)(connect(mapStateToProps)(Header));