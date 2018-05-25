import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import 'Scss/components/App.scss';
import configureStore from 'Redux/store';

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
        <div className="app">Hello, world!</div>
      </Provider>
    );
  }
}

export default hot(module)(App);