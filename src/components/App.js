import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';

//import '@assets/scss/components/App.scss';
import configureStore, {history} from '@store';
import Main from '@components/Main';
import Header from '@components/Header';

let initialState = {};
/* istanbul ignore if */
//if (module.hot) {
  initialState = window.localStorage.getItem('giveworthy_dev_key') || {};
//}

const store = configureStore(initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider>
            <Header />
            <Main />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default hot(module)(App);