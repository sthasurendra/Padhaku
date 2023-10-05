import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import bookImg from '../../../assests/img/monk.jpg';

export const IntroDiv = styled.div`
  border-radius: 10px;
  background-color: ${(props) => props.theme.pageBackground};
  color: ${(props) => props.theme.primaryColor};
  width: 100%;
  .IntroHead {
    padding: 0.5em;
    font-size: 1.5rem;
    border-bottom: 2px solid #dddddd;
  }
  .IntroBody {
    padding: 0.5em;
    b {
      color: ${(props) => props.theme.titleColor};
    }
    .mb-1 {
      margin-bottom: 1rem;
    }
    .joinedDiv {
      margin-top: 2rem;
    }
  }
`;

export const BookDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1em;
  justify-content: center;
  width: 100%;
  background-color: ${(props) => props.theme.pageBackground};
  color: ${(props) => props.theme.primaryColor};
  border-radius: 10px;
  .header {
    width: 100%;
    color: ${(props) => props.theme.titleColor};
    padding: 0.5em;
    font-size: 1.5rem;
    border-bottom: 2px solid #dddddd;
  }
  .body {
    padding: 0.5em;
  }
  .footer {
    width: 100%;
    padding: 0.8rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 2px solid;
    cursor: pointer;
  }
`;

export const MiniBookStyled = styled.div`
  margin: 0.5rem;
  width: 10rem;
  height: 18rem;
  display: flex;
  flex-direction: column;
  transition: transform 250ms;

  background-color: ${(props) => props.theme.bg_secondaryColor};
  color: ${(props) => props.theme.primaryColor};
  :hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  .image_div {
    width: 100%;
    height: 14rem;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 100%;
    }
  }
  .title_div {
    color: ${(props) => props.theme.titleColor};
    height: 4rem;
    overflow: hidden;
    font-size: 1.1rem;
    font-weight: bold;
  }
`;

export const MiniBook = ({ book }) => {
  return (
    <MiniBookStyled>
      <Link to={`/book/${book._id}`}>
        <div className="image_div">
          <img src={book.images[0]} alt={book.book.title} />
        </div>
        <div className="title_div">{book.book.title}</div>
      </Link>
    </MiniBookStyled>
  );
};
