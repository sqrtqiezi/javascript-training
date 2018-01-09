import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import {reducer as menuReducer} from './footer_menu';

const win = window;

const reducer = combineReducers({
  menu: menuReducer
});

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(reducer, {}, storeEnhancers);
