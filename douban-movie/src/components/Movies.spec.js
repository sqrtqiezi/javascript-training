import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';

import Movies from './Movies';

describe('Movies component', () => {
  it('render correctly', () => {
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

    const wrapper = render(
      <Movies subjects={[ movie ]} />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  })
})