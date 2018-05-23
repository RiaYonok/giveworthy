import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import 'Scss/components/App.scss';
import store from 'Redux/store';

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