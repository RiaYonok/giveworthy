import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import 'Scss/components/App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">Hello, world!</div>
    );
  }
}

export default hot(module)(App);