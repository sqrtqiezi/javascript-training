import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducer as menuReducer } from './footer_menu';
import { reducer as paihangReducer } from './paihang';
import { reducer as beimeiReducer } from './beimei';
import { reducer as searchReducer } from './search';

/* eslint-disable no-undef */
const win = window;

const reducer = combineReducers({
  menu: menuReducer,
  paihang: paihangReducer,
  beimei: beimeiReducer,
  search: searchReducer
});

const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  win && win.devToolsExtension ? win.devToolsExtension() : f => f
);

export default createStore(reducer, {}, storeEnhancers);
