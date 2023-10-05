import React, { Fragment, useEffect, useState } from 'react';
import { StyledTag } from '../../../_elements/elements';
import { fetchWrapper } from '../../../_helpers';
import ProfileBookDiv from '../ProfileBookDiv';

import { IntroDiv, BookDiv, MiniBook } from './styles';

const IntroContainer = ({ user, id,  }) => {
  const [userBooks, setUserBooks] = useState([]);
  const [userLikedBooks, setUserLikedBooks] = useState([]);
  const [isUserBookLoading, setIsUserBookLoading] = useState(false);
  const [isUserLikedBookLoading, setIsUserLikedBookLoading] = useState(false);

  useEffect(() => {
    const getUserBook = async () => {
      try {
        setIsUserBookLoading(true);
        let response = await fetchWrapper.get(`userBook?user=${id}`);
        console.log(response, 'Userbook');
        setUserBooks(response.data);
        setIsUserBookLoading(false);
      } catch (err) {
        setIsUserBookLoading(false);
        console.log(err);
      }
    };
    
    getUserBook();
  }, []);

  return (
    <Fragment>
      <IntroDiv>
        <div className="IntroHead">Intro</div>
        <div className="IntroBody">
          <div>
            Favorite Genre:
            {user?.interest?.map((genre) => (
              <StyledTag key={`${genre}`}>{genre}</StyledTag>
            ))}
          </div>
          <div className="joinedDiv">
            Joined on <b>March 2021</b>
          </div>
        </div>
      </IntroDiv>
      <ProfileBookDiv title="My Books" books={userBooks} isLoading={isUserBookLoading} />
      <ProfileBookDiv title="Liked Books" books={user?.likedProduct} isLoading={isUserLikedBookLoading} />
      
    </Fragment>
  );
};

export default IntroContainer;
