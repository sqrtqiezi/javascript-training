import React from 'react';
import { render, mount } from 'enzyme';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import api from '../middleware/api';
import { Status, MenuTypes } from '../constants';
import Beimei from './Beimei';
import { BEIMEI_FETCH_REQUEST } from '../actions';

describe('Beimei container', () => {
  function setUp(menu = MenuTypes.BEIMEI) {

    const middlewares = [thunk, api];
    const mockStore = configureStore(middlewares);
    const movie = {
      id: '1',
      href: 'http://movie.douban.com/123',
      cover: 'http://image.douban.com/123',
      title: '电影1',
      score: 10,
      collect: 20,
      year: '1985',
      type: 'type1',
      director: '导演',
      casts: '演员1 演员2',
    };
    const store = mockStore({
      beimei: {
        status: Status.SUCCESS,
        subjects: [movie]
      },
      menu,
    });

    return {
      store,
    }
  }

  it('render correctly', () => {
    const { store } = setUp();

    const wrapper = render(
      <Provider store={store}>
        <Beimei />
      </Provider>
    );
  
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should hidden when MenuTypes changed', () => {
    const { store } = setUp(MenuTypes.PAIHANG);

    const wrapper = render(
      <Provider store={store}>
        <Beimei />
      </Provider>
    );
  
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should execute fetch data', () => {
    const { store } = setUp();

    const wrapper = mount(
      <Provider store={store}>
        <Beimei />
      </Provider>
    );

    const actions = store.getActions();

    expect(actions).toMatchObject([{
      type: BEIMEI_FETCH_REQUEST
    }]);
  });
})