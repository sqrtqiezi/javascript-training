import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE } from './actionTypes';
import { Status } from '../constants';
import { movieFormat } from '../functions';

export default (state = { status: Status.SUCCESS, subjects: [] }, action) => {
  switch (action.type) {
    case FETCH_STARTED: {
      return { status: Status.LOADING, subjects: [] };
    }
    case FETCH_SUCCESS: {
      const subjects = action.result.subjects.map(item => movieFormat(item));
      return { status: Status.SUCCESS, subjects: [...subjects] };
    }
    case FETCH_FAILURE: {
      return { status: Status.FAILURE, subjects: [] };
    }
    default: {
      return state;
    }
  }
};
