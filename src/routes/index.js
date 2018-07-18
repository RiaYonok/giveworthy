import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import Dashboard from '@components/Dashboard';
import Login from '@components/auth/Login';
import LoginWithEmail from '@components/auth/LoginWithEmail';
import Home from '@components/Home';
import Main from '@components/Main';
import AuthenticatedRoute from '@routes/AuthenticatedRoute';
import Signup from '@components/auth/Signup';
import QuestionnariesStep1 from '@components/Questionnaries/QuestionnariesStep1';
import QuestionnariesStep2 from '@components/Questionnaries/QuestionnariesStep2';
import QuestionnariesStep3 from '@components/Questionnaries/QuestionnariesStep3';
import QuestionnariesStep4 from '@components/Questionnaries/QuestionnariesStep4';
import QuestionnariesStep5 from '@components/Questionnaries/QuestionnariesStep5';
class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path='/login' component={Login} />
        <Route exact path='/loginwithemail' component={LoginWithEmail} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/' component={Home} />
        <Route exact path='/questionnarie-step-1' component={QuestionnariesStep1} />
        <Route exact path='/questionnarie-step-2' component={QuestionnariesStep2} />
        <Route exact path='/questionnarie-step-3' component={QuestionnariesStep3} />
        <Route exact path='/questionnarie-step-4' component={QuestionnariesStep4} />
        <Route exact path='/questionnarie-step-5' component={QuestionnariesStep5} />
        <Switch>
          {/* <Redirect from='/' to='/dashboard' exact /> */}
          <AuthenticatedRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default Routes;