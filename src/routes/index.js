import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import Dashboard from 'Components/Dashboard';
import Login from 'Components/auth/Login';
import AuthenticatedRoute from 'Routes/AuthenticatedRoute';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path='/login' component={Login} />
        <Switch>
          <Redirect from='/' to='/dashboard' exact />
          <AuthenticatedRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default Routes;