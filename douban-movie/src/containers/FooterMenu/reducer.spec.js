import { reducer } from './index';
import { setMenu } from './actions';
import { MenuTypes } from '../../constants';

describe('FooterMenu reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(MenuTypes.PAIHANG);
  })

  it('should handle set_menu', () => {
    expect(reducer(undefined, setMenu(MenuTypes.BEIMEI))).toEqual(MenuTypes.BEIMEI);
  })
})
