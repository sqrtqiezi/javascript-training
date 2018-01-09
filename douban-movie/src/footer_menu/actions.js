import {SET_MENU} from './actionTypes';

export const setMenu = menuType => ({
  type: SET_MENU,
  menu: menuType
});