import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import Routes from '@routes';


class Main extends Component {
  render() {
    return (
      <Fragment>
        {/* <Questionnaire questionnaireName="test">
          <div>yo yo yo</div>
        </Questionnaire> */}
        <div style={{marginTop:60}}>
          <Routes />
        </div>
      </Fragment>
    );
    
  }
}

export default hot(module)(Main);