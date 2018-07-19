import 'babel-polyfill';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { Map } from 'immutable';
import { get } from 'lodash';
import msg from '@assets/i18n/en';
import { login } from '@api';
import User from '@models/User';
const jwt = require('jsonwebtoken');

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
import getCurrentUser from '@selectors/getCurrentUser';

function* sagaLogin(action) {
  try {
    const res = yield call(login, action.email, action.token);
    console.log(res);
    if (res.msg==msg.SUCCESS){
      const user = jwt.decode(res.access_token);
      console.log(user);
      if (user){
        yield put(
          addUsers(Map({
            [user._id]: User.fromJS(user)
          }))
        );
    
        yield put(
          setCurrentUser(user._id)
        );
        if (res.newUser){
          yield put(push('/questionnarie-step-1'));
        }else{
          const location = yield select(getLocation);
          if (get(location, ['state', 'from', 'pathname']))
            yield put(push(get(location, ['state', 'from', 'pathname'])));
          else
            yield put(push('/dashboard'));
        }
        

        yield put(dismissError());
      }
    }
    

  } catch (err) {
    console.error(err);
    yield put(
      setError('Oops! Something went wrong during login.')
    );
  }
}
// saga action for signup

function* signup(action){

  try {
    //const user = yield call(signup, action.email, action.password);
    const payload = {
      id:"4394u59840",
      email : action.email,
      password : action.password
    }
    const user = new User(payload);

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