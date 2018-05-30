import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import users from './users';

export const reducers = {
  users,
  router: routerReducer
};

export default combineReducers(reducers);