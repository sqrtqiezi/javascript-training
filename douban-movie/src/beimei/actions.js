import fetchJsonp from 'fetch-jsonp';
import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE } from './actionTypes';

let nextSeqId = 0;

export const fetchBeimeiStarted = () => ({
  type: FETCH_STARTED,
});

export const fetchBeimeiSuccess = result => ({
  type: FETCH_SUCCESS,
  result,
});

export const fetchBeimeiFailure = error => ({
  type: FETCH_FAILURE,
  error,
});

export const fetchBeimei = () => (dispatch) => {
  nextSeqId += 1;
  const seqId = nextSeqId;

  const dispatchIfValid = action =>
    (seqId === nextSeqId ? dispatch(action) : undefined);

  const apiUrl = '//api.douban.com/v2/movie/us_box';

  dispatchIfValid(fetchBeimeiStarted());

  return fetchJsonp(apiUrl)
    .then(response => response.json())
    .then(json => dispatchIfValid(fetchBeimeiSuccess(json)))
    .catch(error => dispatchIfValid(fetchBeimeiFailure(error)));
};
