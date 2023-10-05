/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { memo, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdNotifications } from 'react-icons/md';
import DropdownItem from '../DropDown/DropdownItem';
import DropdownMenu from '../DropDown/DropdownMenu';
import NavItem from '../DropDown/NavItem';
import { connect } from 'react-redux';
import { toggleTheme } from '../../_redux/actions/ActionUI';
import { logoutUser } from '../../_redux/actions/ActionUser';
import { NavLink, Link } from 'react-router-dom';

import { StyledButtonPrimary, StyledButtonSecondary } from '../../_elements/button/Button';
import { MiniProfilePicComponent } from '../../_elements/ProfilePicComponent';

import {
  FaBook,
  FaHome,
  FaLayerGroup,
  FaCaretDown,
  FaFacebookMessenger,
  FaHeartbeat,
  FaCommentDots,
} from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { fetchWrapper } from '../../_helpers';

const HeaderContainer = styled.header`
  position: sticky;
  z-index: 9999;
  top: 0;
  height: 55px;
  /* background-color: #242526; */
  background-color: ${(props) => props.theme.pageBackground};
  border-bottom: 0.1px solid #a0a0a063;
  color: #a0a0a063;
  transition: background-color 300ms;
  .notification .costume-nav-item {
    > div {
      height: 70vh;
      overflow-y: auto;
      ::-webkit-scrollbar {
        width: 0.6rem;
        border-radius: 50px;
      }
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }
      ::-webkit-scrollbar-thumb {
        background-color: #fa6838;
        border-radius: 50px;
      }
    }
  }
  .header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    .logo-section {
      color: ${(props) => props.theme.titleColor};
    }
    .page-section {
      height: inherit;
      a {
        color: #a0a0a063;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        :hover {
          color: white;
        }
      }

      ul {
        height: inherit;
        list-style: none;
        display: flex;

        li {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 0.2em;
          cursor: pointer;
          transition: background-color 300ms, color 300ms;
          &:hover {
            background-color: ${(props) => props.theme.titleColor};
            color: white;
          }
        }
        span {
          margin: 0 1.2em;
        }
        .active {
          border-radius: 0;
          border-bottom: 3px solid ${(props) => props.theme.titleColor};
          z-index: 1;
          color: ${(props) => props.theme.titleColor};
          transition: background-color 300ms, color 300ms;
          :hover {
            border-radius: 0;
            background-color: ${(props) => props.theme.titleColor};
            color: white;
            border-bottom-color: #a0a0a063;
          }
        }
      }
    }

    .toggleThemeMode input {
      cursor: pointer;
      height: 1.2rem;
      width: 1.2rem;
    }
    .setting-section {
      height: inherit;
      ul {
        height: inherit;
        list-style: none;
        display: flex;
        align-items: center;
        li {
          height: inherit;
          width: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          margin: 0 0.3rem;

          .profileBtn {
            margin: 0 0.5rem;
            padding: 0.2rem 0.5rem;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            min-width: 100px;
            align-items: center;
            border-radius: 1000px;
            :hover {
              background: ${(props) => props.theme.bg_secondaryColor};
            }

            span {
              color: ${(props) => props.theme.primaryColor};
              font-weight: 400;
              font-family: 'Roboto', sans-serif;
              margin: 0 0.4em;
            }
          }
        }
      }
    }
    .navscroll {
      height: 70vh;
      overflow-y: auto;
    }
    .tooltip {
      position: relative;
    }
    .tooltip:hover:after {
      position: absolute;
      top: 115%;
      left: 50%;
      transform: translate(-50%, 0);
      background: #d1cfcf;
      text-align: center;
      border-radius: 8px;
      color: #000;
      content: attr(data-tooltip);
      font-size: 12px;
      padding: 6px 10px;
      width: auto;
      z-index: 100;
    }
  }
`;
const LoginSignupDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  button {
    border-radius: 30px;
    :hover {
      box-shadow: none;
    }
  }
`;

const Header = ({ user = {}, darkMode, toggleTheme, logoutUser }) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    (async () => {
      if (user.user) {
        try {
          const response = await fetchWrapper.get(`users/me/notification?recipient=${user.user._id}`);
          setNotifications(response.data);
        } catch (e) {}
      }
    })();
  }, []);
  return (
    <HeaderContainer>
      <div className="header">
        <div className="logo-section">
          <FaBook size="24" />
        </div>

        <div className="page-section">
          <ul>
            <li className="tooltip" data-tooltip="Home">
              <NavLink exact to="/" activeClassName="active">
                <span>
                  <FaHome size="24" />
                </span>
              </NavLink>
            </li>
            <li className="tooltip" data-tooltip="Forum">
              <NavLink exact to="/forum">
                <span>
                  <FaLayerGroup size="24" />
                </span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="setting-section">
          {user.isLoggedIn ? (
            <ul>
              <li className="tooltip" data-tooltip="Chat">
                <Link to={`/chat`}>
                  <NavItem icon={<FaFacebookMessenger size="20" />} navId="profile"></NavItem>
                </Link>
              </li>
              <li className="tooltip notification" data-tooltip="Notification">
                <NavItem icon={<MdNotifications size="20" />} navId="notification">
                  <DropdownMenu className="navscroll">
                    {notifications.map((not) => (
                      <Link to={`/forum/${not.thread}`}>
                        <DropdownItem
                          key={not._id}
                          leftIcon={not.type === 'like' ? <FaHeartbeat /> : <FaCommentDots />}
                        >
                          <div>
                            <h6
                              css={css`
                                margin: 5px 0;
                                letter-spacing: 1px;
                              `}
                            >
                              <span>
                                {not.sender.firstName || 'Padhaku'} {not.sender.lastName || 'Padhaku'} 
                                {not.type === 'like' ? 'liked' : 'commented on'} your question
                              </span>
                            </h6>
                            <p
                              css={css`
                                margin: 5px 0;
                                font-size: 14px;
                                font-weight: normal;
                              `}
                            >
                              {not.createdAt}
                            </p>
                          </div>
                        </DropdownItem>
                      </Link>
                    ))}
                    <hr />
                  </DropdownMenu>
                </NavItem>
              </li>
              <li>
                <div
                  css={css`
                    display: none;
                    @media screen and (min-width: 900px) {
                      display: block;
                    }
                  `}
                >
                  <Link to={`/profile/${user.user?._id || '123'}`}>
                    <span className="profileBtn">
                      <MiniProfilePicComponent
                        name={`${user.user?.firstName} ${user.user?.lastName}`}
                        avatar={user.user?.imageUrl}
                      />{' '}
                      <span>{user.user?.firstName || 'Padhaku'}</span>
                    </span>
                  </Link>
                </div>
              </li>
              <li className="tooltip" data-tooltip="Options">
                <NavItem icon={<FaCaretDown size="20" />} navId="profile">
                  <DropdownMenu>
                    <Link to={`/profile/${user.user?._id || '123'}`}>
                      <DropdownItem
                        leftIcon={
                          <MiniProfilePicComponent
                            name={`${user.user?.firstName} ${user.user?.lastName}`}
                            avatar={user.user?.imageUrl}
                          />
                        }
                      >
                        <div>
                          <h6
                            css={css`
                              margin: 5px 0;
                              letter-spacing: 1px;
                            `}
                          >
                            <span>
                              {user.user?.firstName || 'Padhaku'} {user.user?.lastName || 'Padhaku'}
                            </span>
                          </h6>
                          <p
                            css={css`
                              margin: 5px 0;
                              font-size: 14px;
                              font-weight: normal;
                            `}
                          >
                            See your profile
                          </p>
                        </div>
                      </DropdownItem>
                    </Link>
                    <hr />

                    <DropdownItem leftIcon={<Fragment>{darkMode ? <FiMoon /> : <FiSun />}</Fragment>}>
                      <div onClick={toggleTheme}>
                        Night Mode :
                        <span
                          css={css`
                            margin-left: 2rem;
                          `}
                        >
                          {darkMode ? <span>On</span> : <span>Off</span>}
                        </span>
                      </div>
                    </DropdownItem>
                    <DropdownItem leftIcon={<FaCaretDown />}>
                      <div onClick={() => logoutUser()}>Logout</div>
                    </DropdownItem>
                  </DropdownMenu>
                </NavItem>
              </li>
            </ul>
          ) : (
            <LoginSignupDiv>
              <Link to="/login">
                <StyledButtonSecondary>Log in</StyledButtonSecondary>
              </Link>
              <Link to="/signup">
                <StyledButtonPrimary>Sign up</StyledButtonPrimary>
              </Link>
            </LoginSignupDiv>
          )}
        </div>
      </div>
    </HeaderContainer>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.ui.darkMode,
  user: state.user,
});
export default connect(mapStateToProps, { toggleTheme, logoutUser })(memo(Header));
