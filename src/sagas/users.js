import 'babel-polyfill';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { Map } from 'immutable';
import { get } from 'lodash';
import msg from '@assets/i18n/en';
import { login, signup, savecause } from '@api';
import User from '@models/User';
import Cause from '@models/Cause';
const jwt = require('jsonwebtoken');

import {
  LOGIN_USER,
  SIGNUP_USER,
  addUsers,
  setCurrentUser
} from '@actions/users';

import {
  SAVE_CAUSE,
  addCause,
  updateCause
} from '@actions/cause';

import {
  setError,
  dismissError
} from '@actions/errors';
import {setStatus, dismissStatus} from '@actions/status.js';

import getLocation from '@selectors/getLocation';


function* sagaLogin(action) {
  try {
    yield put(
      setStatus()
    );
    const res = yield call(login, action.email, action.token);
    if (res.msg==msg.SUCCESS){
      const user = jwt.decode(res.access_token);
      if (user){
        yield put(
          addUsers(Map({
            [user.id]: User.fromJS(user)
          }))
        );
    
        yield put(
          setCurrentUser(user.id)
        );
        if (res.newUser){
          yield put(push('/choose-account-type'));
        }else{
          const location = yield select(getLocation);
          if (get(location, ['state', 'from', 'pathname']))
            yield put(push(get(location, ['state', 'from', 'pathname'])));
          else
            yield put(push('/dashboard'));
        }
        

        yield put(dismissError());
      }else{
        yield put(
          setError(res.desc)
        );
      }
    }else{
      yield put(
        setError(res.desc)
      );
    }
    yield put(
      dismissStatus()
    );

  } catch (err) {
    console.error(err);
    yield put(
      setError(msg.LOGIN_NETWORK_ERROR)
    );
  }
}
// saga action for signup

function* sagaSignup(action){

  try {
    yield put(
      setStatus()
    );
    const res = yield call(signup, action.email, action.token);
    
    if (res.msg==msg.SUCCESS){
      const user = jwt.decode(res.access_token);
      if (user){
        yield put(
          addUsers(Map({
            [user.id]: User.fromJS(user)
          }))
        );
    
        yield put(
          setCurrentUser(user.id)
        );
        yield put(push('/choose-account-type'));
        yield put(dismissError());
      }else{
        yield put(
          setError(res.desc)
        );
      }
    }else{
      yield put(
        setError(res.desc)
      );
    }
    yield put(
      dismissStatus()
    );

  } catch (err) {
    console.error(err);
    yield put(
      setError('Oops! Something went wrong during login.')
    );
  }
}

function* sagaSaveCause(action) {
  try {
    yield put(
      setStatus()
    );
    const res = yield call(savecause, action.payload);
    
    if (res.msg!=msg.SUCCESS){
      yield put(
        setError(res.desc)
      );
    }else{
      if(res.newCause){
        action.payload.id = res.id;
        yield put(
          addCause(Cause.fromJS(action.payload))
        );
        
        yield put(push('/charity-questionnarie-step-1'));
      }
    }
    yield put(
      dismissStatus()
    );

  } catch (err) {
    console.error(err);
    yield put(
      setError('Oops! Something went wrong during login.')
    );
  }
}
export default function* usersSaga() {
  yield takeLatest(LOGIN_USER, sagaLogin);
  yield takeLatest(SIGNUP_USER, sagaSignup);
  yield takeLatest(SAVE_CAUSE, sagaSaveCause);
}


export {
  sagaLogin,
  sagaSignup,
  sagaSaveCause
};