import fetchJsonp from 'fetch-jsonp';

const API_ROOT = '//api.douban.com/v2/';

const callApi = (endpoint, data) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  const params = [];
  if (data) {
    Object.keys(data).forEach(key => params.push(`${key}=${data[key]}`));
  }
  return fetchJsonp(`${fullUrl}?${params.join('&')}`)
    .then(response => response.json());
};

export const CALL_API = Symbol('Call Api');

export default store => next => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, callAPI.data).then(
    response => next(actionWith({
      response,
      type: successType,
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened',
    })),
  );
};
