import { CALL_API } from '../middleware/api';

export const PAIHANG_FETCH_REQUEST = 'PAIHANG/FETCH_REQUEST';
export const PAIHANG_FETCH_SUCCESS = 'PAIHANG/FETCH_SUCCESS';
export const PAIHANG_FETCH_FAILURE = 'PAIHANG/FETCH_FAILURE';

const fetchPaihang = data => ({
  [CALL_API]: {
    types: [PAIHANG_FETCH_REQUEST, PAIHANG_FETCH_SUCCESS, PAIHANG_FETCH_FAILURE],
    endpoint: '/movie/top250',
    data,
  },
});

export const loadPaihang = () => (dispatch, getState) => {
  const data = { start: getState().paihang.subjects.length };
  dispatch(fetchPaihang(data));
};

export const BEIMEI_FETCH_REQUEST = 'BEIMEI/FETCH_REQUEST';
export const BEIMEI_FETCH_SUCCESS = 'BEIMEI/FETCH_SUCCESS';
export const BEIMEI_FETCH_FAILURE = 'BEIMEI/FETCH_FAILURE';

const fetchBeimei = () => ({
  [CALL_API]: {
    types: [BEIMEI_FETCH_REQUEST, BEIMEI_FETCH_SUCCESS, BEIMEI_FETCH_FAILURE],
    endpoint: '/movie/us_box',
  },
});

export const loadBeimei = () => (dispatch) => {
  dispatch(fetchBeimei());
};

export const SEARCH_FETCH_REQUEST = 'SEARCH/FETCH_REQUEST';
export const SEARCH_FETCH_SUCCESS = 'SEARCH/FETCH_SUCCESS';
export const SEARCH_FETCH_FAILURE = 'SEARCH/FETCH_FAILURE';

const fetchSearch = data => ({
  [CALL_API]: {
    types: [SEARCH_FETCH_REQUEST, SEARCH_FETCH_SUCCESS, SEARCH_FETCH_FAILURE],
    endpoint: '/movie/search',
    data,
  },
});

export const loadSearch = q => (dispatch) => {
  const data = { q };
  dispatch(fetchSearch(data));
};
