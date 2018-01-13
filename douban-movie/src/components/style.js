import styled, { keyframes } from 'styled-components';

export const Loading = styled.div`
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const rotate360 = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg);  }
`;

export const LoadingIcon = styled.span.attrs({
  className: 'iconfont icon-loading',
})`
  display: inline-block;
  animation: ${rotate360} 1s linear infinite;
`;

export const ErrorMessage = styled.div`
  color: red;
`;
