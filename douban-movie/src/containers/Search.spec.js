jest.mock('fetch-jsonp');

import React from 'react';
import { render, mount } from 'enzyme';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import api from '../middleware/api';
import { Status, MenuTypes } from '../constants';
import Search from './Search';
import { SEARCH_FETCH_REQUEST } from '../actions';

describe('Search container', () => {
  function setUp(menu = MenuTypes.SEARCH) {
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
      search: {
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
        <Search />
      </Provider>
    );
  
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it('should hidden when MenuTypes changed', () => {
    const { store } = setUp(MenuTypes.BEIMEI);

    const wrapper = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
  
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  describe('component mount', () => {
    const { store } = setUp();
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <Search />
        </Provider>
      );
    })

    it('should not execute fetch data when mount', () => {
      const actions = store.getActions();
      expect(actions).toEqual([]);
    })

    it('should not execute fetch data when input is empty', () => {
      wrapper.find('button').at(0).simulate('click');

      const actions = store.getActions();

      expect(actions).toMatchObject([ ])
    })

    it('should handle search button', () => {
      wrapper.find('input').at(0).simulate('change', {
        target: {
          value: 'My Fover Movie'
        }
      });

      wrapper.find('button').at(0).simulate('click');

      const actions = store.getActions();

      expect(actions).toMatchObject([{
        endpoint: '/movie/search',
        data: { q: 'My Fover Movie' },
        type: 'SEARCH/FETCH_REQUEST'
      }])
    })
  })
})