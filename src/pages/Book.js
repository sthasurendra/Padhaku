/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core';
import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

import bookImg from '../assests/img/monk.jpg';
import { Card } from '../_elements/card/Card';
import StyledMultiCarousel from '../_elements/StyledMultiCarousel';
import { StyledButtonPrimary } from '../_elements/button/Button';
import BookReview from './BookReview';

import { FaRegHandshake } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { fetchWrapper } from '../_helpers';
import Skeleton from 'react-loading-skeleton';

const shake = keyframes`
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(-5px);
  }
  40% {
    transform: translateY(0px);
  }
  100%{
    transform: translateY(0px);
  }
`;

const CustomBook = styled.div`
  min-height: 100vh;
  background-color: ${(props) =>
    props.theme.theme === 'dark' ? props.theme.bg_secondaryColor : props.theme.titleColor};
  .BookContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .detailsBtn,
    .reviewsBtn {
      border: 2px solid ${(props) => props.theme.bg_secondaryColor};
      height: 100%;
      padding: 0.5em 0.8em;
      font-size: 1rem;
      margin-right: 0.1em;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background: ${(props) => props.theme.bg_secondaryColor};
      border-bottom: none;
      transition: background-color 300ms, color 300ms, border-color 300ms;
      color: ${(props) => props.theme.secondaryColor};
    }
    .not-active {
      :hover {
        background: orange;
        border-color: orange;
        color: #fff;
        cursor: pointer;
      }
    }
    .active {
      background: ${(props) => props.theme.titleColor};
      border-color: ${(props) => props.theme.titleColor};
      color: #fff;
      pointer-events: none;
    }
    .thisBook {
      background-color: ${(props) => props.theme.pageBackground};
      display: grid;
      grid-template-rows: 0.01fr;
      grid-template-columns: 1fr 2fr;
      grid-gap: 1rem;
      grid-template-areas:
        'BookImage'
        'BookDetails';
      padding: 1em;
      margin: 1em 0;
      border-radius: 15px;
      @media screen and (max-width: 705px) {
        grid-gap: 1rem;
        padding: 1em;

        grid-template-columns: 1fr;
        grid-template-rows: 20rem 0.8fr;
      }

      .bookImgDiv {
        min-height: 730px;
        div {
          @media screen and (max-width: 705px) {
            height: 100%;
          }
          img {
            max-width: 100%;
            height: 100%;
            width: 100%;
            object-fit: contain;
          }
        }
      }
      .bookTextDiv {
        overflow-y: auto;
        color: ${(props) => props.theme.primaryColor};
        .detailsDiv {
          width: 90%;
          border: 2px solid ${(props) => props.theme.bg_secondaryColor};
          padding: 0.5em;
          h2 {
            margin-top: 1em;
            color: ${(props) => props.theme.titleColor};
            font-size: 2rem;
          }
          .tagContainer {
            margin: 1em 0;
            .tag {
              padding: 0.1em 0.5em;
              border-radius: 5px;
              margin-right: 0.2em;
              background: ${(props) => props.theme.bg_secondaryColor};
            }
          }
          .price_p {
            color: ${(props) => props.theme.titleColor};
            font-size: 1.5rem;
            font-weight: bold;
          }
          .details {
            font-size: 1.3rem;
            margin: 0.5em 12em 0 0;
            div {
              display: flex;
              justify-content: space-between;
              border-bottom: 2px solid #80808026;
              margin-bottom: 1em;
            }
          }
          hr {
            border: none;
            border-bottom: 2px solid ${(props) => props.theme.bg_secondaryColor};
            margin-top: 1.5em;
            width: 100%;
            text-align: center;
          }
        }

        .reviewDiv {
          width: 90%;
          height: 90%;
          border: 2px solid ${(props) => props.theme.bg_secondaryColor};
          padding: 0.5em;
          h2 {
            margin-top: 1em;
            color: ${(props) => props.theme.titleColor};
            font-size: 2rem;
            margin-bottom: 2em;
          }
          .review {
            color: ${(props) => props.theme.secondaryColor};
            display: flex;
            justify-content: center;
          }
        }

        h3 {
          color: ${(props) => props.theme.titleColor};
          font-size: 28px;
          margin-bottom: 0.2em;
        }
      }
    }
  }
  .RelatedProducts {
    background-color: ${(props) => props.theme.pageBackground};
    grid-area: 'RelatedProducts';
    padding-top: 0.5rem;
    margin-bottom: 1em;
    height: 90%;
    padding: 1em;
    display: flex;

    flex-direction: column;
    border-radius: 15px;
    h3 {
      font-size: 1.5rem;
      color: ${(props) => props.theme.titleColor};
      flex: 1;
    }
    .RelatedProductsDiv {
      display: block;
      width: 100%;
      height: 80%;
      overflow: hidden;
    }
  }
`;

const Book = () => {
  const { id } = useParams();
  const [view, setView] = useState('details');
  const [book, setBook] = useState();
  const [showingImg, setShowingImg] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [isRelatedBooksLoading, setIsRelatedBooksLoading] = useState(false);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetchWrapper.get(`userBook/${id}`);
        setBook(response.data);
        setShowingImg(response.data.images[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const fetchRelatedBooks = async () => {
      try {
        setIsRelatedBooksLoading(true);
        let genre = book.book.genre[0];
        let response = await fetchWrapper.get(`userBook/category/${genre}`);
        let results = response.results;
        let books = results.reduce((accumulator, currentValue) => {
          let userBook = currentValue.userbook.map((book) => {
            return {
              ...book,
              book: {
                title: currentValue.title,
              },
            };
          });
          return [...accumulator, ...userBook];
        }, []);

        setRelatedBooks(books);
        setIsRelatedBooksLoading(false);
      } catch (err) {
        setIsRelatedBooksLoading(false);
        console.log(err);
      }
    };
    if (book?.book) {
      fetchRelatedBooks();
    }
  }, [book]);

  const changeView = (selectedView) => {
    setView(selectedView);
  };

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  function saveInput() {
    console.log('Saving data');
  }
  const processChange = debounce(() => saveInput());

  return (
    <CustomBook>
      <div className="container">
        <div className="BookContent">
          <div className="thisBook">
            <div className="bookImgDiv">
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
                `}
              >
                {showingImg ? (
                  <Fragment>
                    <div
                      css={css`
                        height: 560px;
                        margin-bottom: 1rem;
                        border: 3px solid #e3e3e3;
                        width: 100%;
                      `}
                    >
                      <img src={showingImg} alt="book" />
                    </div>
                    <div
                      css={css`
                        height: 100px;
                        display: flex;
                      `}
                    >
                      {book?.images.map((imgsrc) => (
                        <div
                          key={imgsrc}
                          css={css`
                            margin: 0 0.5rem;
                            cursor: pointer;
                          `}
                          onClick={() => setShowingImg(imgsrc)}
                        >
                          <img
                            css={css`
                              max-width: 100px;
                            `}
                            src={imgsrc}
                            alt="book"
                          />
                        </div>
                      ))}
                    </div>
                  </Fragment>
                ) : (
                  <Skeleton height={415} width={325} />
                )}
              </div>
            </div>
            <div className="bookTextDiv">
              <div>
                <button
                  className={`detailsBtn ${view === 'details' ? 'active' : 'not-active'}`}
                  onClick={() => changeView('details')}
                >
                  Details
                </button>
                <button
                  className={`reviewsBtn ${view === 'reviews' ? 'active' : 'not-active'}`}
                  onClick={() => changeView('reviews')}
                >
                  Reviews
                </button>
              </div>
              {view === 'details' ? (
                <div className="detailsDiv">
                  <div>
                    <h2>{book?.book?.title || <Skeleton width={320} height={35} />}</h2>
                    <div className="tagContainer">
                      {book?.book?.genre?.map((genre) => (
                        <span key={genre} className="tag">
                          {genre}
                        </span>
                      ))}
                    </div>
                    <p className="price_p">
                      {book?.price ? <span>Rs. {book?.price}</span> : <Skeleton width={210} height={30} />}
                    </p>
                    <div className="details">
                      {book?.book?.author ? (
                        <div>
                          {' '}
                          <p>Author:</p> <p>{book?.book?.author}</p>
                        </div>
                      ) : (
                        <Skeleton height={30} />
                      )}
                      {book?.book?.publication ? (
                        <div>
                          <p>Publication:</p> <p>{book?.book?.publication}</p>
                        </div>
                      ) : (
                        <Skeleton height={30} />
                      )}
                      {book?.condition ? (
                        <div>
                          <p>Condition:</p> <p>{book?.condition}</p>
                        </div>
                      ) : (
                        <Skeleton height={30} />
                      )}
                    </div>
                    <div
                      css={css`
                        margin-top: 1rem;
                        button:hover .handshake {
                          animation-name: ${shake};
                          animation-timing-function: ease-in-out;
                          animation-fill-mode: backwards;
                        }
                      `}
                    >
                      {console.log(book, 'book')}
                      {book?.condition ? (
                        <StyledButtonPrimary
                          css={css`
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          `}
                          onClick={processChange}
                        >
                          <Link to={`/chat/${book.user}`}>
                            <span
                              className="handshake"
                              css={css`
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin-right: 0.5rem;
                                animation-duration: 800ms;
                                animation-iteration-count: infinite;
                                animation-direction: alternate;
                                transform-origin: bottom;
                              `}
                            >
                              <FaRegHandshake fontSize="30" />
                            </span>
                            Connect with Seller
                          </Link>
                        </StyledButtonPrimary>
                      ) : (
                        <div css={css``}>
                          <Skeleton width={150} height={45} />
                        </div>
                      )}
                    </div>
                    <hr />
                  </div>
                  <div>
                    <h3>
                      {book?.description || book?.review ? (
                        'Description'
                      ) : (
                        <div>
                          <Skeleton width={300} height={45} />
                        </div>
                      )}
                    </h3>
                    <div>
                      {book?.description || book?.review || (
                        <div>
                          <Skeleton count={5} height={30} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="reviewDiv">
                  <BookReview bookId={book?.book?._id} />
                </div>
              )}
            </div>
          </div>
          <div className="RelatedProducts">
            <h3>Related Books</h3>
            <div className="RelatedProductsDiv">
              <StyledMultiCarousel>
                {isRelatedBooksLoading ? (
                  [...Array(4)].map((book, idx) => <Card key={idx} />)
                ) : relatedBooks.length > 0 ? (
                  relatedBooks.map((book) => <Card key={book._id} book={book} />)
                ) : (
                  <Fragment>
                    <span>No related Books</span>
                  </Fragment>
                )}
              </StyledMultiCarousel>
            </div>
          </div>
        </div>
      </div>
    </CustomBook>
  );
};
export default Book;
