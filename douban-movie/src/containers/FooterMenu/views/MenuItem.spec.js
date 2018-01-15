import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

import MenuItem from './MenuItem';
import { MenuTypes } from '../../../constants';
import { setMenu } from '../actions';

describe('MenuItem component', () => {
  const setUp = () => {
    const mockStore = configureStore();
    const store = mockStore({ menu: MenuTypes.PAIHANG });

    return { store };
  }

  it('render correctly', () => {
    const { store } = setUp();

    const wrapper = render(<Provider store={store}>
      <MenuItem menu={MenuTypes.PAIHANG} />
    </Provider>);
    expect(toJson(wrapper)).toMatchSnapshot();

    const wrapperHidden = render(<Provider store={store}>
      <MenuItem menu={MenuTypes.BEIMEI} />
    </Provider>);
    expect(toJson(wrapperHidden)).toMatchSnapshot();
  })

  it('should handle click event', () => {
    const { store } = setUp();

    const wrapper = mount(<Provider store={store}>
      <MenuItem menu={MenuTypes.PAIHANG} />
    </Provider>);

    wrapper.simulate('click');
    const actions = store.getActions();
    const expectedPayload = setMenu(MenuTypes.PAIHANG);

    expect(actions).toEqual([expectedPayload]);
  })
})
