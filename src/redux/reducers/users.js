import { Map, List } from 'immutable';
import User from 'Models/User';
import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  ADD_USERS,
  CHANGE_USER_ROLE,
  ADD_USER_AFFILIATED_ORG
} from 'Redux/actions/users';
import { SET_CURRENT_USER } from '../actions/users';

export const initialState = Map({
  users: Map(),
  isLoading: false,
  current: new User
});

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_USERS:
      return state.set('isLoading', true);

    case FETCH_USERS_SUCCESS:
    case FETCH_USERS_FAILURE:
      return state.set('isLoading', false);

    case ADD_USERS:
      return state.updateIn(['users'], users => users.merge(action.payload));

    case CHANGE_USER_ROLE:
      try {
        return state.updateIn(['users', action.id], user => user.set('role', action.role));
      } catch (err) {
        console.error(err);

        return state;
      }

    case ADD_USER_AFFILIATED_ORG:
      try {
        return state
          .getIn(['users', action.id, 'affiliatedOrgs'], List())
          .includes(action.affiliatedOrgId) ?
            state :
            state.updateIn(['users', action.id, 'affiliatedOrgs'], affiliatedOrgs => affiliatedOrgs.concat(action.affiliatedOrgId));
      } catch (err) {
        console.error(err);

        return state;
      }

    case SET_CURRENT_USER:
      return state.set('current', state.getIn(['users', action.id], new User));

    default:
      return state;
  }
}