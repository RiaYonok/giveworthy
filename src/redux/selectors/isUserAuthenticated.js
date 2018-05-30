import { createSelector } from 'reselect';

import getCurrentUser from './getCurrentUser';

export default createSelector(
  getCurrentUser,
  current => !!current && !!current.get('jwt')
);