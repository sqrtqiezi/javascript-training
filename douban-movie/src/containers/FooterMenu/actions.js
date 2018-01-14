import { SET_MENU } from './actionTypes';

/* eslint-disable import/prefer-default-export */
export const setMenu = menuType => ({
  type: SET_MENU,
  menu: menuType,
});
