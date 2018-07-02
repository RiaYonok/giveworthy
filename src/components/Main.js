import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';

import Header from '@components/Header';
import Routes from '@routes';
import Questionnaire from '@components/Questionnaire';

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Questionnaire questionnaireName="test">
          <div>yo yo yo</div>
        </Questionnaire>
        <Routes />
      </Fragment>
    );
  }
}

export default hot(module)(Main);