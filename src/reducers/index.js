import { combineReducers } from 'redux';

import users from '@reducers/users';
import errors from '@reducers/errors';
import questionnaires from '@reducers/questionnaires';
import status from '@reducers/status';
export const reducers = {
  users,
  errors,
  questionnaires,
  status
};

export default combineReducers(reducers);