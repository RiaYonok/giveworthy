import { Map } from 'immutable';

import {
  SET_ACTIVE_QUESTIONNAIRE,
  CLOSE_ACTIVE_QUESTIONNAIRE,
  NEXT_PAGE,
  PREV_PAGE,
  SET_FIELD
} from '@actions/questionnaires';

export const NUMBERS_OF_QUESTIONS = 5;
var ActivePageInfo = [];

for (var i=0;i<NUMBERS_OF_QUESTIONS;i++) ActivePageInfo.push(false);

export const initialState = Map({
  activeQuestionnaire: null,
  activePageNumber: 1,
  fields: Map(),
  activePageInfo:ActivePageInfo
});

export default function(state = initialState, action) {
  var arr = state.get('activePageInfo'),
      av = state.get('activePageNumber');

  switch (action.type) {
    case SET_ACTIVE_QUESTIONNAIRE:
      arr[0] = true;
      return state
        .set('activeQuestionnaire', action.name)
        .set('fields', action.fields)
        .set('activePageInfo', arr)
        .set('activePageNumber', 1);

    case CLOSE_ACTIVE_QUESTIONNAIRE:
      return state.set('activeQuestionnaire', null);

    case NEXT_PAGE:
      if (av<NUMBERS_OF_QUESTIONS){
        arr[av] = false;
        arr[av+1] = true;
      }
      return state.update('activePageNumber', num => num + 1)
                  .set('activePageInfo', arr);

    case PREV_PAGE:
      if (av > 0){
        arr[av] = false;
        arr[av-1] = true;
      }
      return state.update('activePageNumber', num => num - 1)
                  .set('activePageInfo', arr);

    case SET_FIELD:
      return state.update('fields', fields => fields.set(action.key, action.value));
    
    default:
      return state;  
  }
}