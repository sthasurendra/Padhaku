import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  min-height: 5vh;
  color: white;
  background-color: ${(props) => props.theme.titleColor};
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    display: flex;
    justify-content: center;
    li + li {
      margin-left: 0.8em;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="container">
        <ul>
          <li>Condition of Use</li>
          <li>Privacy Notice</li>
          <li>Interest-Based Ads</li>
          <li>&copy; 2021 Padhaku</li>
        </ul>
      </div>
    </StyledFooter>
  );
};
export default Footer;
