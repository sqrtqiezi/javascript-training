import fetchJsonp from 'fetch-jsonp';
import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE } from './actionTypes';

let nextSeqId = 0;

export const fetchPaihangStarted = () => ({
  type: FETCH_STARTED,
});

export const fetchPaihangSuccess = result => ({
  type: FETCH_SUCCESS,
  result,
});

export const fetchPaihangFailure = error => ({
  type: FETCH_FAILURE,
  error,
});

export const fetchPaihang = start => (dispatch) => {
  nextSeqId += 1;
  const seqId = nextSeqId;

  const dispatchIfValid = action =>
    (seqId === nextSeqId ? dispatch(action) : undefined);

  const apiUrl = `//api.douban.com/v2/movie/top250?start=${start}`;

  dispatchIfValid(fetchPaihangStarted());

  return fetchJsonp(apiUrl)
    .then(response => response.json())
    .then(json => dispatchIfValid(fetchPaihangSuccess(json)))
    .catch(error => dispatchIfValid(fetchPaihangFailure(error)));
};
