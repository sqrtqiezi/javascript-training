import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Fade from './Fade';

describe('Fade component', () => {
  it('render correctly', () => {
    const wrapper = render(
      <Fade>
        <div>子组件</div>
      </Fade>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  })
})
