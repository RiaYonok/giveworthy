import 'babel-polyfill';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Map } from 'immutable';
import { get } from 'lodash';

import { login } from 'Api/index';
import User from 'Redux/records/User';
import {
  LOGIN_USER,

  addUsers,
  setCurrentUser
} from '../actions/users';

import {
  setError
} from '../actions/errors';

import getLocation from '../selectors/getLocation';

function* sagaLogin(action) {
  console.log('uihuihgoiuhiuoghiuohguiohg')
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
      yield put(push('/'));

  } catch (err) {
    console.error(err);
    yield put(
      setError('Oops! Something went wrong during login.')
    );
  }
}

export default function* usersSaga() {
  console.log('made it here');
  yield takeLatest(LOGIN_USER, sagaLogin);
}

export {
  sagaLogin
};