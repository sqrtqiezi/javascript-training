import React from 'react';
import PropTypes from 'prop-types';
import {LOADING, SUCCESS, FAILURE} from '../status';

const Loading = ({status}) => {
  switch(status) {
    case LOADING: {
      return (
        <div className="loading">
          <span className="iconfont icon-loading"></span>
        </div>
      )
    }
    case FAILURE: {
      return (
        <div className="loading">
          <span className="error">加载异常</span>
        </div>
      )
    }
    case SUCCESS: {
      return '';
    }
    default: {
      throw new Error('unexpected status ' + status);
    }
  }
}

Loading.protoTypes = {
  status: PropTypes.string.isRequired
}

export default Loading;