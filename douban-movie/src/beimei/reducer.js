import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes';
import {Status} from '../constants';

export default (state = {status: Status.LOADING, subjects: []}, action) => {
  switch(action.type) {
    case FETCH_STARTED: {
      return {...state, status: Status.LOADING};
    }
    case FETCH_SUCCESS: {
      const subjects = action.result.subjects.map(item => item.subject);
      return {...state, status: Status.SUCCESS, subjects: [...state.subjects, ...subjects]};
    }
    case FETCH_FAILURE: {
      return {...state, status: Status.FAILURE};
    }
    default: {
      return state;
    }
  }
}
