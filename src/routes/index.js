import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import Dashboard from '@components/Dashboard';
import Login from '@components/auth/Login';
import LoginWithEmail from '@components/auth/LoginWithEmail';
import Home from '@components/Home';
import Main from '@components/Main';
import AuthenticatedRoute from '@routes/AuthenticatedRoute';
import Signup from '@components/auth/Signup';
import QuestionnariesStep1 from '@components/Questionnaries/giver/QuestionnariesStep1';
import QuestionnariesStep2 from '@components/Questionnaries/giver/QuestionnariesStep2';
import QuestionnariesStep3 from '@components/Questionnaries/giver/QuestionnariesStep3';
import QuestionnariesStep4 from '@components/Questionnaries/giver/QuestionnariesStep4';
import QuestionnariesStep5 from '@components/Questionnaries/giver/QuestionnariesStep5';
import ChooseAccountType from '@components/ChooseAccountType';
class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path='/login' component={Login} />
        <Route exact path='/loginwithemail' component={LoginWithEmail} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/' component={Home} />
        
        <Switch>
          {/* <Redirect from='/' to='/dashboard' exact /> */}
          <AuthenticatedRoute exact path='/dashboard' component={Dashboard} />
          <AuthenticatedRoute exact path='/choose-account-type' component={ChooseAccountType} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-1' component={QuestionnariesStep1} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-2' component={QuestionnariesStep2} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-3' component={QuestionnariesStep3} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-4' component={QuestionnariesStep4} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-5' component={QuestionnariesStep5} />
        </Switch>
      </div>
    );
  }
}

export default Routes;