import { createStore } from 'redux';
import reducer from './reducers/index';

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState);

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
