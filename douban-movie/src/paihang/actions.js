import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes.js';
import fetchJsonp from 'fetch-jsonp';

let nextSeqId = 0;

export const fetchPaihangStarted = () => ({
  type: FETCH_STARTED
});

export const fetchPaihangSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
});

export const fetchPaihangFailure = (error) => ({
  type: FETCH_FAILURE,
  error
});

export const fetchPaihang = (start) => {
  return (dispatch) => {
    const seqId = ++ nextSeqId;

    const dispatchIfValid = (action) => {
      if (seqId === nextSeqId) {
        return dispatch(action);
      }
    }

    const apiUrl = `//api.douban.com/v2/movie/top250?start=${start}`;

    dispatchIfValid(fetchPaihangStarted())

    return fetchJsonp(apiUrl).then((response) => {
      return response.json();
    }).then(function(json) {
      dispatchIfValid(fetchPaihangSuccess(json))
    }).catch((error) => {
      dispatchIfValid(fetchPaihangFailure(error));
    })
  }
}