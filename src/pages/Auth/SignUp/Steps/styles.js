import styled from 'styled-components';
import { GenreContainer } from '../../../../components/HomeAllCategorySection';

export const SignUpStep0CSS = styled.div`
  width: 100%;
  .closeBtnDiv {
    display: flex;
    justify-content: flex-end;
    .closeBtn {
      cursor: pointer;
      transition: color 200ms, transform 200ms;
      :hover {
        color: ${(props) => props.theme.titleColor};
        transform: scale(1.2);
      }
    }
  }
  .heading {
    color: ${(props) => props.theme.titleColor};
    font-size: 2.5rem;
  }
  .sub_heading {
    color: #333;
    font-size: 1.2rem;
  }
`;

export const SignUpStep1CSS = styled(SignUpStep0CSS)`
  display: flex;
  flex-direction: column;
  .profilePicContainer {
    flex: 2;
    min-height: 235px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 2em;
    .emailDiv {
      font-size: 1.2rem;
    }
  }
  .heading {
    font-size: 1.6rem;
  }
  .welcomInfo {
    flex: 3;
    .nameDiv {
      font-size: 2rem;
      font-family: 'Roboto', 'sans-serif';
      margin: 0.6em;
    }
    .greeting {
      font-size: 1.4rem;
    }
    .instruction {
      margin: 1em auto;
      width: 70%;
      font-size: 1rem;
    }
  }
`;

export const SignUpStep2CSS = styled(SignUpStep0CSS)``;

export const SignUpStep3CSS = styled(SignUpStep0CSS)`
  padding: 2em;
  background: #f0f0f0;
  border-radius: 20px;
`;
export const SignUpGenreContainer = styled(GenreContainer)`
  margin: 1em;
`;

export const NamesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const FormContainer = styled.div`
  margin: 3em 0;
`;

export const Hr = styled.hr`
  color: #333;
  border: 1px solid #d0d0d0;
  width: 70%;
  margin: 1em auto 2em auto;
`;
