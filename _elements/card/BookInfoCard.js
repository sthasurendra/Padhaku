import React from 'react';
import styled from 'styled-components';
import bookImg from '../../assests/img/monk.jpg';
//icons
import { FiEye } from 'react-icons/fi';

const CustomCard = styled.div`
  cursor: pointer;
  position: relative;
  height: 100%;
  max-height: 30rem;
  overflow: hidden;
  display: grid;
  grid-template-columns: inherit;
  grid-template-rows: 4fr 2fr 1fr;
  grid-template-areas: 'image' 'text' 'stats';
  border: 2px solid #80808052;
  border-radius: 18px;
  background: ${(props) => props.theme.pageBackground || 'white'};
  color: ${(props) => props.theme.color || 'black'};
  font-family: roboto;
  transition: transform 300ms, box-shadow 240ms;
  :hover,
  :focus {
    transform: translateY(-3%);
    box-shadow: 0 10px 12px 0px #0000003d;
  }
  :hover .card-stats {
    transform: translateY(-100%);
  }

  .card-image {
    grid-area: image;
    margin-bottom: 0.5em;
    background: white;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    overflow: hidden;
    border-bottom: 2px solid #80808052;

    .image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .card-text {
    grid-area: text;
    padding: 0 0.5em;
    h2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      width: 100%;
      word-break: break-word;
      margin-bottom: 0.3em;
      font-size: 1.6rem;
      color: ${(props) => props.theme.titleColor};
    }
    h4 {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      margin-bottom: 0.3em;
      color: #e67930;
    }
    p {
      color: ${(props) => props.theme.secondaryColor};
      font-size: 15px;
      font-weight: 300;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-family: 'Lato', sans-serif;
    }
  }
  .card-stats {
    position: absolute;
    grid-area: stats;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background: ${(props) => props.theme.titleColor};
    width: 100%;
    height: 100%;
    top: 100%;
    transition: transform 350ms;
    transition-timing-function: ease-in-out;
    .stat {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: white;
      padding: 10px;
      cursor: pointer;
      transition: filter 300ms, background-color 300ms;
      :hover {
        filter: brightness(1.2);
        font-weight: bolder;
        background: ${(props) => props.theme.titleColor};
      }
      svg {
        transition: transform 200ms;
      }
      :hover svg {
        transform: scale(1.5);
      }
    }
    .border {
      border: 2px solid #ffffff70;
      border-top: none;
      border-bottom: none;
    }
  }

  @media screen and (max-width: 705px) {
    height: 23rem;
    grid-template-rows: 16rem 0 3rem;
    .card-text {
      h2 {
        font-size: 20px;
        width: 130px;
      }
      p {
        display: none;
      }
    }
    .card-stats {
      top: 230%;
      height: 100%;
    }
  }
`;
const BookInfoCard = ({ author, title, publication, description, onClickHandler }) => {
  return (
    <CustomCard onClick={onClickHandler}>
      <div className="card-image">
          <img src={bookImg} alt="f" className="image" />
      </div>
      <div className="card-text">
          <h2>{title}</h2>

        <h4>{author}</h4>
        <h4>{publication}</h4>
        <p>{description}</p>
      </div>
      <div className="card-stats">
        <div className="stat">
          <FiEye fontSize="1.5rem" />
        </div>
      </div>
    </CustomCard>
  );
};

export default BookInfoCard;
