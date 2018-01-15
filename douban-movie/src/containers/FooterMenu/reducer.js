import { SET_MENU } from './actions';
import { MenuTypes } from '../../constants';

export default (state = MenuTypes.PAIHANG, action) => {
  switch (action.type) {
    case SET_MENU: {
      return action.menu;
    }
    default:
      return state;
  }
};
