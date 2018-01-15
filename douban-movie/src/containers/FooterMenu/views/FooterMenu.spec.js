import React from 'react';
import configureStore from 'redux-mock-store';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';

import FooterMenu from './FooterMenu';
import { MenuTypes } from '../../../constants';

describe('FooterMenu component', () => {
  it('render correctly', () => {
    const mockStore = configureStore();
    const store = mockStore({ menu: MenuTypes.BEIMEI });

    const wrapper = render(
      <Provider store={store}>
        <FooterMenu />
      </Provider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  })
})
