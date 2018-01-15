import React from 'react';
import { render } from 'enzyme';
import Loading from './Loading';
import { Status } from '../constants';

function setUp(status) {
  const component = render(<Loading status={status} />);
  return {
    component: component,
    text: component.text(),
    loadingIcon: component.find('.iconfont.icon-loading')
  }
}

describe('Loading component', () => {
  it('should display loading icon', () => {
    const { loadingIcon } = setUp(Status.LOADING);
    expect(loadingIcon.length).toBe(1);
  })

  it('should display error message', () => {
    const { text } = setUp(Status.FAILURE);
    expect(text).toBe('加载异常');
  })

  it('should not display when success', () => {
    const { loadingIcon, text } = setUp(Status.SUCCESS);
    expect(loadingIcon.length).toBe(0);
    expect(text).toBe('');
  })

  it('should throw an error', () => {
    try {
      setUp('Unknow Status');
    } catch(error) {
      expect(error.message).toBe('unexpected status Unknow Status')
    }
  })
})
