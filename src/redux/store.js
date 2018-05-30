import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import reducer from './reducers/index';

export const history = createHistory();
export const middleware = applyMiddleware(routerMiddleware(history));

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

  return store;
}
