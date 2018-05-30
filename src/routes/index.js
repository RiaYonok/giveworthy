import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Home from 'Components/Home';
import Login from 'Components/auth/Login';
import AuthenticatedRoute from 'Routes/AuthenticatedRoute';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route path='/login' component={Login} />
        <AuthenticatedRoute exact path='/' component={Home} />
      </div>
    );
  }
}

export default Routes;