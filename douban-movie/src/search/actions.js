import fetchJsonp from 'fetch-jsonp';
import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE } from './actionTypes';

let nextSeqId = 0;

export const fetchSearchStarted = () => ({
  type: FETCH_STARTED
});

export const fetchSearchSuccess = result => ({
  type: FETCH_SUCCESS,
  result
});

export const fetchSearchFailure = error => ({
  type: FETCH_FAILURE,
  error
});

export const fetchSearch = q => dispatch => {
  nextSeqId += 1;
  const seqId = nextSeqId;

  const dispatchIfValid = action =>
    seqId === nextSeqId ? dispatch(action) : undefined;

  const apiUrl = `//api.douban.com/v2/movie/search?q=${q}`;

  dispatchIfValid(fetchSearchStarted());

  return fetchJsonp(apiUrl)
    .then(response => response.json())
    .then(json => dispatchIfValid(fetchSearchSuccess(json)))
    .catch(error => {
      dispatchIfValid(fetchSearchFailure(error));
    });
};
