import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes.js';
import * as Status from './status.js';

export default (state = {status: Status.LOADING, subjects: []}, action) => {
  switch(action.type) {
    case FETCH_STARTED: {
      return {...state, status: Status.LOADING};
    }
    case FETCH_SUCCESS: {
      return {...state, status: Status.SUCCESS, subjects: [...state.subjects, ...action.result.subjects]};
    }
    case FETCH_FAILURE: {
      return {...state, status: Status.FAILURE};
    }
    default: {
      return state;
    }
  }
}
