import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes.js';
import fetchJsonp from 'fetch-jsonp';

let nextSeqId = 0;

export const fetchMoviesStarted = () => ({
  type: FETCH_STARTED
});

export const fetchMoviesSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
});

export const fetchMoviesFailure = (error) => ({
  type: FETCH_FAILURE,
  error
});

export const fetchMovies = (start) => {
  return (dispatch) => {
    const seqId = ++ nextSeqId;

    const dispatchIfValid = (action) => {
      if (seqId === nextSeqId) {
        return dispatch(action);
      }
    }
    
    const apiUrl = `//api.douban.com/v2/movie/top250?start=${start}`;

    dispatchIfValid(fetchMoviesStarted())

    return fetchJsonp(apiUrl).then((response) => {
      return response.json();
    }).then(function(json) {
      dispatchIfValid(fetchMoviesSuccess(json))
    }).catch((error) => {
      dispatchIfValid(fetchMoviesFailure(error));
    })
  }
}