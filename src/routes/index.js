import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';

import Home from 'Components/Home';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path='/' exact={true} component={Home} />
      </div>
    );
  }
}

export default Routes;