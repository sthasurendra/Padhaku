import styled from 'styled-components';
import Background from './book_lib.jpg';

export const ViewDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &.signUpBackground {
    background-image: url(${Background});
    background-size: cover;
  }
`;

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  padding: 2em;

  padding: 2em 3em;
  max-width: 550px;
  min-height: 70vh;
  background: white;
  border-radius: 20px;
  text-align: center;
  z-index: 2;

  &.signuppage3Container {
    max-width: 850px;
    max-height: 800px;
  }
  form {
    flex: 8;
    position: relative;
  }
  .infoContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ButtonContainerCSS = styled.div`
  flex: 1;
  margin: 1em;
  display: flex;
  justify-content: space-around;

  max-height: 50px;
`;
