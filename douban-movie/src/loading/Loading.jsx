import React from 'react';
import PropTypes from 'prop-types';
import { Status } from '../constants';
import './style.css';

/* eslint-disable react/prop-types */
const Loading = ({ status }) => {
  switch (status) {
    case Status.LOADING: {
      return (
        <div className="loading">
          <span className="iconfont icon-loading" />
        </div>
      );
    }
    case Status.FAILURE: {
      return (
        <div className="loading">
          <span className="error">加载异常</span>
        </div>
      );
    }
    case Status.SUCCESS: {
      return '';
    }
    default: {
      throw new Error(`unexpected status ${status}`);
    }
  }
};

Loading.protoTypes = {
  status: PropTypes.string.isRequired,
};

export default Loading;
