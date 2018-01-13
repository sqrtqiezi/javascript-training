import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducer as menuReducer } from './containers/footer_menu';
import { paihang, beimei, search } from './reducers';
import api from './middleware/api';

const win = global;

const reducer = combineReducers({
  menu: menuReducer,
  paihang,
  beimei,
  search,
});

const middlewares = [thunk, api];
if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  win && win.devToolsExtension ? win.devToolsExtension() : f => f,
);

export default createStore(reducer, {}, storeEnhancers);
