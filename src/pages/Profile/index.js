import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';

import { ProfileCSS } from './styles';

import ProfilePicComponent from '../../_elements/ProfilePicComponent';
import { StyledButtonPrimary } from '../../_elements/button/Button';

import IntroContainer from './IntroContainer';
import ActivitiesContainer from './ActivitiesContainer';
import { fetchWrapper } from '../../_helpers';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const Profile = ({}) => {
  let { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        let response = await fetchWrapper.get(`users/${id}`);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  return (
    <ProfileCSS>
      <div className="headerDiv container">
        <div className="backgroundDiv"></div>
        <div className="introDiv">
          <div className="picContainer">
            <ProfilePicComponent className="bigPP" image={user?.imageUrl} />
          </div>
          <div className="btnContainer">
            <StyledButtonPrimary>
              <Link to={`/chat/${user?._id}`}>Connect</Link>
            </StyledButtonPrimary>
          </div>
          {user?.firstName ? (
            <h1 className="name_h1">{`${user?.firstName} ${user?.lastName}`} </h1>
          ) : (
            <h1 className="name_h1">
              <Skeleton height={40} width={200} />
            </h1>
          )}
          <div className="infoContainer">
            <div className="connectionContainer">
              <b>12</b> Connections
            </div>
          </div>
        </div>
      </div>
      <div className="bodyDiv container">
        <div className="infoDiv">
          <IntroContainer user={user} id={id} />
        </div>
        <div className="activityDiv">
          <ActivitiesContainer user={user} />
        </div>
      </div>
    </ProfileCSS>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps)(Profile);
