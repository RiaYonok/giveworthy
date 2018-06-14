import React, { Component } from 'react';

import Header from '@components/Header';
import Routes from '@routes';

class Main extends Component {
  render() {
    return (
      <div className="main-container">
        <Header />
        <div className="content-container">
          <Routes />
        </div>
      </div>
    );
  }
}

export default Main;