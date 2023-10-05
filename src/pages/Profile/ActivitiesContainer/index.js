/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import { ActivitiesDiv } from './styles';
import { fetchWrapper } from '../../../_helpers';
import { MiniProfilePicComponent } from '../../../_elements/ProfilePicComponent';
import Skeleton from 'react-loading-skeleton';

const ActivitiesContainer = ({ user }) => {
  const [userBook, setUserBooks] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  useEffect(() => {
    const getUserBook = async () => {
      try {
        setIsLoading(true);
        let response = await fetchWrapper.get(`userBook?user=${user._id}`);
        setUserBooks(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    if (user._id) {
      getUserBook();
    }
  }, [user._id]);

  return (
    <ActivitiesDiv>
      <div className="headingDiv">Activities</div>
      <div className="activitiesDiv">
        {isLoading ? (
          [...Array(10)].map((element, index) => (
            <div key={index} className="activityBar">
              <div className="loadingUser">
                <span
                  css={css`
                    margin-right: 1rem;
                  `}
                >
                  <Skeleton circle={true} height={75} width={75} />
                </span>
                <Skeleton height={45} width={590} />
              </div>
            </div>
          ))
        ) : (
          <div>
            {userBook.map((book) => (
              <div className="activityBar">
                <div className="userBox">
                  <span className="userPicName">
                    <MiniProfilePicComponent name={`${user.firstName} ${user.lastName}`} avatar={user.imageUrl} />
                    <b>
                      {user.firstName} {user.lastName}
                    </b>{' '}
                  </span>
                  <span className="actionSpan">added</span> <b className="action">{book.book.title}</b>
                </div>
                <div className="bookImgDiv">
                  {book.images.map((img) => (
                    <img key={img} src={img} alt={book.book.title} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ActivitiesDiv>
  );
};

export default ActivitiesContainer;
