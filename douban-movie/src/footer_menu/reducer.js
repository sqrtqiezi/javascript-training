import {SET_MENU} from './actionTypes.js';
import {MenuTypes} from '../constants.js'

export default (state = MenuTypes.SEARCH, action) => {
  switch(action.type) {
    case SET_MENU: {
      return action.menu;
    }
    default:
      return state;
  }
}