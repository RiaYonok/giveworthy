import { combineReducers } from 'redux';

import users from '@reducers/users';
import errors from '@reducers/errors';

export const reducers = {
  users,
  errors
};

export default combineReducers(reducers);