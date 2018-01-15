import React from 'react';
import { render, mount } from 'enzyme';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import api from '../middleware/api';
import { Status, MenuTypes } from '../constants';
import Paihang from './Paihang';
import { PAIHANG_FETCH_REQUEST } from '../actions';

describe('Paihang container', () => {
  function setUp(menu = MenuTypes.PAIHANG, status = Status.SUCCESS) {
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
      paihang: {
        status,
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
        <Paihang />
      </Provider>
    );
  
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it('should hidden when MenuTypes changed', () => {
    const { store } = setUp(MenuTypes.BEIMEI);

    const wrapper = render(
      <Provider store={store}>
        <Paihang />
      </Provider>
    );
  
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should execute fetch data', () => {
    const { store } = setUp();

    const wrapper = mount(
      <Provider store={store}>
        <Paihang />
      </Provider>
    );

    wrapper.find('section').simulate('scroll');

    const actions = store.getActions();

    expect(actions).toMatchObject([
      { type: PAIHANG_FETCH_REQUEST },  // mount action
      { type: PAIHANG_FETCH_REQUEST }   // scroll action
    ]);
  });

  it('should not execute fetch data when loading status', () => {
    const { store } = setUp(MenuTypes.PAIHANG, Status.LOADING);

    const wrapper = mount(
      <Provider store={store}>
        <Paihang />
      </Provider>
    );

    wrapper.find('section').simulate('scroll');

    const actions = store.getActions();

    expect(actions).toMatchObject([
      { type: PAIHANG_FETCH_REQUEST }  // mount action
    ]);
  })
})