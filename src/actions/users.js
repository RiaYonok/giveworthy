export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const ADD_USERS = 'ADD_USERS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const CHANGE_USER_ROLE = 'CHANGE_USER_ROLE';
export const ADD_USER_AFFILIATED_ORG = 'ADD_USER_AFFILIATED_ORG';
export const REMOVE_USER_AFFILIATED_ORG = 'REMOVE_USER_AFFILIATED_ORG';
export const LOGIN_USER = 'LOGIN_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const CHANGE_USER_INFO = 'CHANGE_USER_INFO';


export const addUsers = payload => ({
  type: ADD_USERS,
  payload
});

export const setCurrentUser = id => ({
  type: SET_CURRENT_USER,
  id
});

export const fetchUsers = () => ({
  type: FETCH_USERS
});

export const fetchUsersSuccess = payload => ({
  type: FETCH_USERS_SUCCESS,
  payload
});

export const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  error
});

export const changeUserRole = (id, role) => ({
  type: CHANGE_USER_ROLE,
  id,
  role
});

export const addUserAffiliatedOrg = (id, affiliatedOrgId) => ({
  type: ADD_USER_AFFILIATED_ORG,
  id,
  affiliatedOrgId
});

export const removeUserAffiliatedOrg = (id, affiliatedOrgId) => ({
  type: REMOVE_USER_AFFILIATED_ORG,
  id,
  affiliatedOrgId
});

export const updateUser = (id, payload) => ({
  type: UPDATE_USER,
  id,
  payload
});

export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS
});

export const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  error
});

export const loginUser = (email, token) => ({
  type: LOGIN_USER,
  email,
  token
});

export const signupUser = (email, password) => ({
  type: SIGNUP_USER,
  email,
  password
});

export const updateUserInfo = (id, key, value) => ({
  type: CHANGE_USER_INFO,
  id,
  key,
  value
});