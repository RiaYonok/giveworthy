import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';

import reducer from './reducers/index';

import usersSaga from './sagas/users';


const sagaMiddleware = createSagaMiddleware();
export const history = createHistory();
export const middleware = applyMiddleware(
  routerMiddleware(history),
  sagaMiddleware
);

export default function configureStore(initialState) {
  const store = createStore(reducer, middleware);

  /* istanbul ignore if */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      window.localStorage.setItem('giveworthy_dev_key', store.getState());
      const nextReducer = require('./reducers/index');
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(usersSaga);

  return store;
}
