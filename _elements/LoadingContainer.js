import React from 'react';
import styled from 'styled-components';

const StyledLoadingContainer = styled.div`
  position: absolute;
  background: white;
  z-index: 9999;
  font-size: 1.2rem;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    margin-bottom: 1rem;
  }
`;

export const LoadingContainer = (props) => (
    <StyledLoadingContainer >
      <img src="/images/ball-triangle.svg" alt="loader" />
      <p>{props.text}</p>
    </StyledLoadingContainer>
);
