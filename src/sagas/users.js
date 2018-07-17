import 'babel-polyfill';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { Map } from 'immutable';
import { get } from 'lodash';

import { login } from '@api';
import User from '@models/User';

import {
  LOGIN_USER,
  SIGNUP_USER,
  addUsers,
  setCurrentUser
} from '@actions/users';

import {
  setError,
  dismissError
} from '@actions/errors';

import getLocation from '@selectors/getLocation';

function* sagaLogin(action) {
  try {
    const user = yield call(login, action.email, action.token);

    yield put(
      addUsers(Map({
        [user.id]: User.fromJS(user)
      }))
    );

    yield put(
      setCurrentUser(user.id)
    );

    const location = yield select(getLocation);

    if (get(location, ['state', 'from', 'pathname']))
      yield put(push(get(location, ['state', 'from', 'pathname'])));
    else
      yield put(push('/dashboard'));

    yield put(dismissError());

  } catch (err) {
    console.error(err);
    yield put(
      setError('Oops! Something went wrong during login.')
    );
  }
}
// saga action for signup

function* signup(action){
  console.log(action);
  try {
    //const user = yield call(signup, action.email, action.password);
    const payload = {
      id:"4394u59840",
      email : action.email,
      password : action.password
    }
    const user = new User(payload);
    console.log(user);
   
    
    yield put(
      addUsers(Map({
        [user.id]: User.fromJS(user)
      }))
    );

    yield put(
      setCurrentUser(user.id)
    );

    const location = yield select(getLocation);

    if (get(location, ['state', 'from', 'pathname']))
       yield put(push(get(location, ['state', 'from', 'pathname'])));
     else
       yield put(push('/questionnarie-step-1'));

    yield put(dismissError());

  } catch (err) {
    console.error(err);
    yield put(
      setError('Oops! Something went wrong during login.')
    );
  }
}
export default function* usersSaga() {
  yield takeLatest(LOGIN_USER, sagaLogin);
  yield takeLatest(SIGNUP_USER, signup);
}


export {
  sagaLogin,
  signup
};