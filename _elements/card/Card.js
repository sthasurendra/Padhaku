/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

//icons
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import bookImg from '../../assests/img/monk.jpg';
import { fetchWrapper } from '../../_helpers';
import { toast } from 'react-toastify';
import { VscLoading } from 'react-icons/vsc';

const CustomCard = styled.div`
  cursor: pointer;
  position: relative;
  height: 100%;
  max-height: 30rem;
  overflow: hidden;
  border: 2px solid #80808052;
  border-radius: 18px;
  background: ${(props) => props.theme.pageBackground || 'white'};
  color: ${(props) => props.theme.color || 'black'};
  font-family: roboto;
  transition: transform 300ms, background-color 300ms, box-shadow 240ms;
  margin: 0 1em;
  :hover,
  :focus {
    transform: translateY(-3%);
    box-shadow: 0 10px 12px 0px #0000003d;
  }
  :hover .card-stats {
    transform: translateY(-100%);
  }

  .card-image {
    margin-bottom: 0.5em;
    background: white;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    overflow: hidden;
    border-bottom: 2px solid #80808052;
    height: 60%;
    min-height: 285px;
    .image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .card-text {
    padding: 0 0.5em;
    height: 40%;
    h2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      width: 265px;
      word-break: break-word;
      margin-bottom: 0.3em;
      font-size: 28px;
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
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-family: 'Lato', sans-serif;
    }
  }
  .card-stats {
    position: absolute;
    display: flex;
    justify-content: center;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background: ${(props) => props.theme.titleColor};
    width: 100%;
    height: 15%;
    top: 100%;
    transition: transform 350ms;
    transition-timing-function: ease-in-out;
    .stat {
      display: flex;
      flex: 1;
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
    .card-image {
      height: 80%;
    }
    .card-text {
      height: 20%;
      h2 {
        font-size: 20px;
        width: 130px;
      }
      p {
        display: none;
      }
    }
  }
`;

export const Card = ({ book }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeBook = async () => {
    try {
      setIsLoading(true);
      await fetchWrapper.put('users/me/likedProduct', {
        likedProduct: book._id,
      });
      setIsLiked(true);
      toast.success('Book added to Liked books');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <CustomCard
      css={css`
        pointer-events: ${book ? 'auto' : 'none'};
      `}
    >
      <Fragment>
        <div className="card-image">
          <Link to={`/book/${book?._id}`}>
            {book?.images[0] ? <img src={book?.images[0]} alt="f" className="image" /> : <Skeleton height={300} />}
          </Link>
        </div>
        <div className="card-text">
          <Link to={`/book/${book?._id}`}>
            <h2>{book?.book?.title || <Skeleton />}</h2>
          </Link>
          <h4>{book?.price ? <span>Rs. {book?.price}</span> : <Skeleton />}</h4>
          <p>{book?.review || book?.description || <Skeleton count={3} height={25} />}</p>
        </div>
        <div className="card-stats">
          <div className="stat" onClick={handleLikeBook}>
            {isLoading ? (
              <VscLoading className="spin" fontSize="1.5rem" />
            ) : isLiked ? (
              <FiHeart fontSize="1.5rem" fill="white" />
            ) : (
              <FiHeart fontSize="1.5rem" />
            )}
          </div>
          <div className="stat">
            <Link to={`/book/${book?._id}`}>
              <FiEye fontSize="1.5rem" />
            </Link>
          </div>
        </div>
      </Fragment>
    </CustomCard>
  );
};
