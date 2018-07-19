export const ADD_CAUSE= 'ADD_CAUSE';
export const DEL_CAUSE = 'DEL_CAUSE';
export const UPDATE_CAUSE = 'UPDATE_CAUSE';
export const SAVE_CAUSE = 'SAVE_CAUSE';

export const addCause = (payload) => ({
  type: ADD_CAUSE,
  payload
});

export const delCause = () => ({
  type: DEL_CAUSE
});
export const updateCause = (key, value) => ({
    type: UPDATE_CAUSE,
    key,
    value
});
export const saveCause = (payload) => ({
    type: SAVE_CAUSE,
    payload
});