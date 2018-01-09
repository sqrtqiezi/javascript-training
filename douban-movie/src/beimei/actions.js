import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes.js';
import fetchJsonp from 'fetch-jsonp';

let nextSeqId = 0;

export const fetchBeimeiStarted = () => ({
  type: FETCH_STARTED
});

export const fetchBeimeiSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
});

export const fetchBeimeiFailure = (error) => ({
  type: FETCH_FAILURE,
  error
});

export const fetchBeimei = (start) => {
  console.log('fetching')
  return (dispatch) => {
    const seqId = ++ nextSeqId;

    const dispatchIfValid = (action) => {
      if (seqId === nextSeqId) {
        return dispatch(action);
      }
    }

    const apiUrl = `//api.douban.com/v2/movie/us_box`;

    dispatchIfValid(fetchBeimeiStarted())

    return fetchJsonp(apiUrl).then((response) => {
      return response.json();
    }).then(function(json) {
      dispatchIfValid(fetchBeimeiSuccess(json))
    }).catch((error) => {
      dispatchIfValid(fetchBeimeiFailure(error));
    })
  }
}