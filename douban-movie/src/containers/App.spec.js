import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import App from './App';

describe('App container', () => {
  it('render correctly', () => {
    const wrapper = shallow(<App />);
  
    expect(toJson(wrapper)).toMatchSnapshot();
  })
})