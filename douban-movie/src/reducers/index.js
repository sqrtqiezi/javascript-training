import { Status } from '../constants';
import { movieFormat } from '../functions';
import {
  PAIHANG_FETCH_REQUEST, PAIHANG_FETCH_SUCCESS, PAIHANG_FETCH_FAILURE,
  BEIMEI_FETCH_REQUEST, BEIMEI_FETCH_SUCCESS, BEIMEI_FETCH_FAILURE,
  SEARCH_FETCH_REQUEST, SEARCH_FETCH_SUCCESS, SEARCH_FETCH_FAILURE } from '../actions';

const moviesReducer = (
  FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE,
  isAppend = true,
  defaultStatus = Status.LOADING,
  formator = subjects => subjects.map(movieFormat),
) => (state = { status: defaultStatus, subjects: [] }, action) => {
  switch (action.type) {
    case FETCH_REQUEST: {
      return {
        ...state,
        status: Status.LOADING,
      };
    }
    case FETCH_SUCCESS: {
      const subjects = formator(action.response.subjects);
      return {
        status: Status.SUCCESS,
        subjects: isAppend ? [...state.subjects, ...subjects] : subjects,
      };
    }
    case FETCH_FAILURE: {
      return {
        ...state,
        status: Status.FAILURE,
      };
    }
    default: {
      return state;
    }
  }
};

/* eslint-disable import/prefer-default-export */
export const paihang =
  moviesReducer(PAIHANG_FETCH_REQUEST, PAIHANG_FETCH_SUCCESS, PAIHANG_FETCH_FAILURE);

export const beimei =
  moviesReducer(
    BEIMEI_FETCH_REQUEST, BEIMEI_FETCH_SUCCESS, BEIMEI_FETCH_FAILURE,
    false,
    Status.Loading,
    subjects => subjects.map(item => movieFormat(item.subject)),
  );

export const search =
  moviesReducer(
    SEARCH_FETCH_REQUEST, SEARCH_FETCH_SUCCESS, SEARCH_FETCH_FAILURE,
    false,
    Status.SUCCESS,
  );
