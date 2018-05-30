import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import 'Scss/components/App.scss';
import configureStore from 'Redux/store';
import Main from './Main';

let initialState = {};
/* istanbul ignore if */
if (module.hot) {
  initialState = window.localStorage.getItem('giveworthy_dev_key') || {};
}

const store = configureStore(initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default hot(module)(App);