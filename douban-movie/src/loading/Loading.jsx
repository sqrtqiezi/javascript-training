import React from 'react';
import PropTypes from 'prop-types';
import { Status } from '../constants';
import { Loading as StyledLoading, LoadingIcon, ErrorMessage } from '../style';

/* eslint-disable react/prop-types */
const Loading = ({ status }) => {
  switch (status) {
    case Status.LOADING: {
      return (
        <StyledLoading>
          <LoadingIcon />
        </StyledLoading>
      );
    }
    case Status.FAILURE: {
      return (
        <StyledLoading>
          <ErrorMessage>加载异常</ErrorMessage>
        </StyledLoading>
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
