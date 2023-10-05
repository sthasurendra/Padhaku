
import styled from 'styled-components';

const H1 = styled.h1`
  color: ${(props) => props.color? props.color : props.theme.titleColor};
  font-size: 3rem;
  margin-bottom: 0.6em;
  font-weight: bolder;
`;

export default H1;
