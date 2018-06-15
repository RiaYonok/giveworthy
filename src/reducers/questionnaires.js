import { Map } from 'immutable';

import {
  SET_ACTIVE_QUESTIONNAIRE,
  CLOSE_ACTIVE_QUESTIONNAIRE,
  NEXT_PAGE,
  PREV_PAGE,
  SET_FIELD
} from '@actions/questionnaires';

export const initialState = Map({
  activeQuestionnaire: null,
  activePageNumber: 1,
  fields: Map()
});

export default function(state = initialState, action) {
  switch (action.type) {
  case SET_ACTIVE_QUESTIONNAIRE:
    return state
      .set('activeQuestionnaire', action.name)
      .set('fields', action.fields)
      .set('activePageNumber', 1);

  case CLOSE_ACTIVE_QUESTIONNAIRE:
    return state.set('activeQuestionnaire', null);

  case NEXT_PAGE:
    return state.update('activePageNumber', num => num + 1);

  case PREV_PAGE:
    return state.update('activePageNumber', num => num - 1);

  case SET_FIELD:
    return state.update('fields', fields => fields.set(action.key, action.value));

  default:
    return state;  
  }
}