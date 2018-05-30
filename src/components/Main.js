import React, { PureComponent } from 'react';

import Header from './Header';
import Routes from 'Routes/index';

class Main extends PureComponent {
  render() {
    return (
      <div className="main-container">
        <Header />
        <Routes />
      </div>
    );
  }
}

export default Main;