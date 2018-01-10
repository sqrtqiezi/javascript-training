import styled from 'styled-components';

export const Section = styled.section`
  display: ${props => props.active ? 'block' : 'none'};
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 45px);
  overflow: scroll;
  padding-left: 10px;
  padding-right: 10px;
  ::-webkit-scrollbar {
    display:none
  }
`;