import styled, { keyframes } from 'styled-components';

export const Section = styled.section`
  display: ${props => (props.active ? 'block' : 'none')};
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 45px);
  overflow: scroll;
  padding-left: 10px;
  padding-right: 10px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MenuItem = styled.a`
  display: inline-block;
  width: 33.3333%;

  cursor: pointer;
  color: ${props => (props.active ? 'red' : '#666')};
  outline: none;

  span {
    display: block;
  }
`;

export const FooterMenu = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;

  box-sizing: border-box;
  padding-top: .8em;
  width: 100%;
  height: 45px;
  border-top: 1px solid #ccc;

  text-align: center;
  font-size: .8em;
  background-color: #ffffff;
`;

export const SearchBox = styled.div`
  color: #333;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  position: relative;

  input {
    width: calc(100% - 50px);
  }
`;

export const TextInput = styled.input.attrs({
  type: 'text',
})`
  box-sizing: border-box;
  margin: 0;
  padding: 8px;
  background-color: #eee;
  border: none;
  border-radius: 2px;
  box-shadow: none;
  outline: none;
`;

export const Button = styled.button`
  position: absolute;
  right: 0;
  padding: 8px 10px;
  background: #FF5722;
  color: #fff;
  border-radius: 2px;
  cursor: pointer;
  outline: none;
`;

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
