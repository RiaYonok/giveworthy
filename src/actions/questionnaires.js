export const SET_ACTIVE_QUESTIONNAIRE = 'SET_ACTIVE_QUESTIONNAIRE';
export const CLOSE_ACTIVE_QUESTIONNAIRE = 'CLOSE_ACTIVE_QUESTIONNAIRE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const PREV_PAGE = 'PREV_PAGE';
export const SET_FIELD = 'SET_FIELD';

export const setActiveQuestionnaire = (name, fields) => ({
  type: SET_ACTIVE_QUESTIONNAIRE,
  name,
  fields
});

export const closeActiveQuestionnaire = () => ({
  type: CLOSE_ACTIVE_QUESTIONNAIRE
});

export const nextPage = () => ({
  type: NEXT_PAGE
});

export const prevPage = () => ({
  type: PREV_PAGE
});

export const setField = (key, value) => ({
  type: SET_FIELD,
  key,
  value
});