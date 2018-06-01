import React, { Component } from 'react';

import Header from './Header';
import Routes from 'Routes/index';

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