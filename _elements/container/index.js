import styled from 'styled-components';

export const CustomScrollerContainer = styled.div`
  ::-webkit-scrollbar {
    width: 0.6rem;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  ::-webkit-scrollbar-thumb {
    background-color: #fa6838;
    border-radius: 50px;
  }
`;

export const Mast = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgb(0 0 0 / 28%);
`;
