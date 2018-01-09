import {createStore, combineReducers} from 'redux';

import {reducer as menuReducer} from './footer_menu';

const reducer = combineReducers({
  menu: menuReducer
});

export default createStore(reducer);