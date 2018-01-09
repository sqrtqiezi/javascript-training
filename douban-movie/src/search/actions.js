import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes.js';
import fetchJsonp from 'fetch-jsonp';

let nextSeqId = 0;

export const fetchSearchStarted = () => ({
  type: FETCH_STARTED
});

export const fetchSearchSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
});

export const fetchSearchFailure = (error) => ({
  type: FETCH_FAILURE,
  error
});

export const fetchSearch = (q) => {
  return (dispatch) => {
    const seqId = ++ nextSeqId;

    const dispatchIfValid = (action) => {
      if (seqId === nextSeqId) {
        return dispatch(action);
      }
    }

    const apiUrl = `//api.douban.com/v2/movie/search?q=${q}`;

    dispatchIfValid(fetchSearchStarted())

    return fetchJsonp(apiUrl).then((response) => {
      return response.json();
    }).then(function(json) {
      dispatchIfValid(fetchSearchSuccess(json))
    }).catch((error) => {
      dispatchIfValid(fetchSearchFailure(error));
    })
  }
}