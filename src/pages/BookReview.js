/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CustomRater } from '../_elements';
import { StyledButtonPrimary } from '../_elements/button/Button';
import { fetchWrapper } from '../_helpers';

function BookReview({ bookId, currUser, isLoggedIn }) {
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [canReview, setCanReview] = useState(true);

  const getReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetchWrapper.get(`book/${bookId}/review`);
      setReviewList(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const handleSendReview = async () => {
    try {
      const response = await fetchWrapper.post(`book/${bookId}/review`, {
        review: review,
        rating: rating,
      });
      setReviewList([
        ...reviewList,
        {
          review: review,
          rating: rating,
          user: {
            firstName: currUser.firstName,
            lastName: currUser.lastName,
            _id: currUser._id,
          },
        },
      ]);
      setReview('');
      setRating(0);
      setCanReview(false);
    } catch (err) {
      if (err.error.code === 11000) {
        toast.error('You can only review once');
        setReview('');
        setRating(0);
        setCanReview(false);
      }
    }
  };
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
      `}
    >
      <h3>Review</h3>
      <div
        css={css`
          height: 100%;
        `}
      >
        <div
          css={css`
            height: 75%;
            overflow-y: auto;
          `}
        >
          {isLoading ? (
            <div
              css={css`
                text-align: center;
              `}
            >
              {' '}
              <VscLoading fontSize={32} className="spin" />{' '}
            </div>
          ) : (
            <Fragment>
              {reviewList.length ? (
                <Fragment>
                  {reviewList.map((review) => (
                    <div
                      key={review.review + review.rating}
                      css={css`
                        padding: 0.5rem;
                        border: 3px solid #e7e7e7;
                        border-radius: 15px;
                        margin-bottom: 1rem;
                      `}
                    >
                      <span
                        css={css`
                          pointer-events: none;
                        `}
                      >
                        <CustomRater label="Rating:" initialRating={review.rating} />
                      </span>
                      {review.review}
                      <div
                        css={css`
                          display: flex;
                          opacity: 1;
                          z-index: 22;
                          visibility: visible;
                          justify-content: flex-end;
                          cursor: pointer;
                          a {
                            color: black !important;
                          }
                        `}
                      >
                        <Link to={`/profile/${review.user._id}`}>
                          <span>
                            by:{' '}
                            <b>
                              {review.user.firstName} {review.user.lastName}
                            </b>
                          </span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </Fragment>
              ) : (
                <div
                  css={css`
                    text-align: center;
                    font-size: 2rem;
                    color: gray;
                  `}
                >
                  No Reviews Yet
                </div>
              )}
            </Fragment>
          )}
        </div>
        {isLoggedIn && canReview && (
          <div
            className="inputReviewAndRating"
            css={css`
              height: 25%;

              border-top: 2px solid #f0f0f0;
            `}
          >
            <CustomRater
              label="Your Rating:"
              initialRating={rating}
              onChangeHandler={(value) => {
                setRating(value);
              }}
            />
            <div
              className="inputReview"
              css={css`
                display: flex;
                input {
                  width: 80%;
                  font-size: 1.4rem;
                  padding: 0.5rem;
                }
                button {
                  width: 20%;
                  font-size: 1.4rem;
                }
              `}
            >
              <input name="review" onChange={(e) => setReview(e.target.value)} value={review} />
              <StyledButtonPrimary onClick={handleSendReview}>Send</StyledButtonPrimary>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  currUser: state.user.user,
});

export default connect(mapStateToProps, null)(BookReview);
