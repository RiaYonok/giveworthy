import { combineReducers } from 'redux';

import users from '@reducers/users';
import errors from '@reducers/errors';
import questionnaires from '@reducers/questionnaires';

export const reducers = {
  users,
  errors,
  questionnaires
};

export default combineReducers(reducers);