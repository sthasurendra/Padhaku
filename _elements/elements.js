import styled from 'styled-components';

export const StyledTag = styled.div`
  display: inline-block;
  padding: 0.2em 0.4em;

  background-color: ${(props) => props.theme.pageBackground};
  color: ${(props) => props.theme.primaryColor};
  border: 0.1px solid #666;
  border-radius: 4px;
  margin: 0 0.2em;
`;
