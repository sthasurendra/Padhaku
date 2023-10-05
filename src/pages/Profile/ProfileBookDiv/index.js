/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import { BookDiv, MiniBook } from '../IntroContainer/styles';

function ProfileBookDiv({ title, isLoading, books }) {
  return (
    <BookDiv>
      <div className="header">{title}</div>
      <div className="body">
        <BookDiv>
          {isLoading ? (
            [...Array(6)].map((element, idx) => (
              <div
                key={idx}
                css={css`
                  margin-right: 0.5rem;
                  margin-bottom: 1rem;
                `}
              >
                <Skeleton height={180} width={150} />
                <Skeleton height={40} />
              </div>
            ))
          ) : books?.length ? (
            <Fragment>
              {books?.map((book) => (
                <MiniBook key={book._id} book={book} />
              ))}
            </Fragment>
          ) : (
            <div>No books yet</div>
          )}
        </BookDiv>
      </div>
    </BookDiv>
  );
}

export default ProfileBookDiv;
