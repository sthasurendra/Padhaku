import styled from 'styled-components';

export const NavDropDownToggle = styled.p`
  color: ${props => props.theme.titleColor};
  width: 35px;
  height: 35px;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: filter 300ms, background-color 300ms, color 300ms;
  &:hover {
    filter: brightness(1.2);
    background-color: ${props => props.theme.titleColor};
    color: white;
  }
`;
