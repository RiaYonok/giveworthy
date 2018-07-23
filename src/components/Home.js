import React, { PureComponent } from 'react';

import { hot } from 'react-hot-loader';



export class Home extends PureComponent {
  render() {
    
    return (
      <div className="main-container">
        <h1>Welcome</h1>
      </div>
    );
  }
}

export default hot(module)(Home);