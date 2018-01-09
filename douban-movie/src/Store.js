import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'

import {reducer as menuReducer} from './footer_menu';
import {reducer as moviesReducer} from './movies';

const win = window;

const reducer = combineReducers({
  menu: menuReducer,
  movies: moviesReducer
});

const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(reducer, {}, storeEnhancers);
