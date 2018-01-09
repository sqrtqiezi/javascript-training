import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes';
import {Status} from '../constants';

export default (state = {status: Status.SUCCESS, subjects: []}, action) => {
  switch(action.type) {
    case FETCH_STARTED: {
      return {status: Status.LOADING, subjects: []};
    }
    case FETCH_SUCCESS: {
      return {status: Status.SUCCESS, subjects: [...action.result.subjects]};
    }
    case FETCH_FAILURE: {
      return {status: Status.FAILURE, subjects: []};
    }
    default: {
      return state;
    }
  }
}
