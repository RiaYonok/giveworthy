import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import users from './users';
import errors from './errors';

export const reducers = {
  users,
  errors,
  router: routerReducer
};

export default combineReducers(reducers);