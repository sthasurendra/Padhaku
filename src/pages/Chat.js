//core imports
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import SendBtn from '../components/chat/SendBtn';

import { getAllUsers } from '../_redux/actions/ActionUser';
import { getDirectMessages } from '../_redux/actions/ActionMessages';

import { fetchWrapper } from '../_helpers';
import { WebSocketContext } from '../_redux/actions/ActionSocket';
import Messages from '../components/chat/Messages';
import { CustomScrollerContainer } from '../_elements/container';

const ChatStyle = styled.div`
  .costume-col-chat {
    height: calc(100vh - 55px) !important;
    overflow: hidden;
    &.top {
      flex: 25%;
      background-color: ${(props) => (props.theme.theme === 'light' ? props.theme.bg_secondaryColor : '#242526')};
      color: ${(props) => props.theme.primaryColor};
      overflow-y: auto;
    }
  }
  background-color: ${(props) => props.theme.pageBackground || 'white'};

  .inner_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${(props) => (props.theme.theme === 'light' ? props.theme.pageBackground : '#18191a')};

    height: 100%;
    width: 100%;

    @media only screen and (max-width: 767px) {
      width: 100%;
      height: 100%;
    }
  }

  .outer_outer_container {
    background-color: ${(props) => (props.theme.theme === 'light' ? props.theme.bg_secondaryColor : '#242526')};
    color: ${(props) => props.theme.primaryColor};
    flex: 75%;
  }
  .outer_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 55px - 3.5rem);

    background-color: ${(props) => (props.theme.theme === 'light' ? props.theme.bg_secondaryColor : '#242526')};
    color: ${(props) => props.theme.primaryColor};
    @media only screen and (max-width: 767px) {
      margin: 5rem 0rem 5rem 0rem;
      height: calc(100vh - 55px - 3.5rem);
    }
  }

  .message-inputarea {
    display: flex;
    padding: 3px;
    margin: 10px;
    border-radius: 12px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: #50aeb0;
    height: 3rem;
    background-color: ${(props) => (props.theme.theme === 'light' ? props.theme.bg_secondaryColor : '#242526')};
    color: ${(props) => props.theme.primaryColor};
  }

  .message-input {
    flex: 1;
    padding: 2px 5px;
    height: 100%;
    width: auto;
    border-radius: 15px;
    border: none;
    display: hidden;

    font-size: 1.2rem;
    background-color: ${(props) => (props.theme.theme === 'light' ? props.theme.bg_secondaryColor : '#242526')};
    color: ${(props) => props.theme.primaryColor};
  }

  .message-input:focus,
  .message-input:active {
    outline: none;
    border: none;
    color: black;
    font-size: 1rem;
  }

  .message-input-items {
    margin: 0 2px;
    color: #2eb165;
  }
  .send-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .emoji-position {
    position: relative;
  }

  .fa:hover {
    color: #50aeb0;
    cursor: pointer;
  }

  .messages {
    display: flex;
    flex-direction: column-reverse;
    height: calc(100% - 4rem);

    background-color: ${(props) => (props.theme.theme === 'light' ? props.theme.bg_secondaryColor : '#242526')};
    color: ${(props) => props.theme.primaryColor};
  }

  .m-c {
    display: flex;
    overflow-y: auto;
    margin-bottom: 0.2rem;
    flex-direction: column-reverse;
  }

  .m-c::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #3e4042;
    border-radius: 10px;
    visibility: hidden;
  }

  .m-c::-webkit-scrollbar {
    width: 8px;
    background-color: #3e4042;
    visibility: hidden;
  }

  .m-c::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid #fff;
    background-image: -webkit-linear-gradient(bottom, #0c0d0d 0%, #3e4042 50%, #0c0d0d 100%);
    visibility: hidden;
  }

  .messages:hover > .m-c::-webkit-scrollbar-track,
  .messages:hover > .m-c::-webkit-scrollbar,
  .messages:hover > .m-c::-webkit-scrollbar-thumb {
    visibility: visible;
  }

  .messageContainer {
    display: flex;
    justify-content: flex-end;
    padding: 0 1rem;
    margin: 0.4rem;
  }

  .messageBox {
    display: block;
    max-width: 80%;
  }
  .chatMessages {
    padding: 0 1rem;
  }

  .messageText {
    position: relative;
    border-radius: 10px;
    padding: 0.3em 0.5em;
    font-size: 1.2rem;
    width: 100%;
    margin: 0;
    letter-spacing: 0;
    word-wrap: break-word;
  }

  .messageText img {
    vertical-align: middle;
  }

  .justifyStart {
    justify-content: flex-start;
  }

  .justifyEnd {
    justify-content: flex-end;
  }

  .colorWhite {
    color: white !important;
  }

  .backgroundBlue {
    background: #0099ff;
  }

  .backgroundLight {
    background: #373737;
  }
  .message-link {
    color: blue;
  }

  .profile-image {
    width: 50px;
    height: 50px;
    border-radius: 40px;
  }

  .settings-tray {
    background-color: ${(props) => props.theme.pageBackground};
    color: ${(props) => props.theme.primaryColor};
    padding: 10px 15px;
    height: 3.5rem;
    display: flex;
    align-items: center;
  }
  .settings-tray .no-gutters {
    padding: 0;
  }

  .search-box {
    padding: 10px 13px;
    text-align: center;
  }

  .search-box input,
  .search-box input:focus {
    border: none;
    outline: none;
    border-radius: 30px;
    background-color: #3e4042;
    width: 100%;
    padding: 0.2rem 0.6rem;
    height: 2rem;
    background-color: ${(props) => props.theme.pageBackground};
    color: ${(props) => props.theme.primaryColor};
    font-size: 1.2rem;
  }

  .search-box input::placeholder {
    color: #ccc;
    font-weight: 300;
    margin-left: 20px;
  }

  .friend-drawer {
    padding: ${(props) => console.log(props)};
    padding: 10px 15px;
    display: flex;
    font-size: 0.8rem;
    border-radius: 12px;
    vertical-align: baseline;
    background-color: ${(props) => props.theme.pageBackground};
    color: ${(props) => props.theme.primaryColor};
    margin: 0.5rem;
    transition: 0.3s ease;
  }
  .friend-drawer--grey {
    background-color: ${(props) => (props.theme.theme === 'light' ? props.theme.pageBackground : '#242526')};
  }
  .friend-drawer .text {
    margin-left: 12px;
    width: 70%;
  }
  .friend-drawer .text h6 {
    margin-top: 6px;
    margin-bottom: 0;
  }
  .friend-drawer .text p {
    margin: 0;
  }
  .friend-drawer .time {
    color: grey;
  }
  .friend-drawer:hover {
    background-color: ${(props) => (props.theme.theme === 'light' ? props.theme.pageBackground : '#18191a')};
    color: ${(props) => props.theme.primaryColor};
    cursor: pointer;
  }
  .friend-drawer:hover p,
  .friend-drawer:hover h6,
  .friend-drawer:hover .time {
    color: ${(props) => props.theme.primaryColor};
  }

  .userDetails {
    background-color: ${(props) => (props.theme.theme === 'light' ? props.theme.pageBackground : '#18191a')};
    color: ${(props) => props.theme.primaryColor};
    a {
      color: ${(props) => props.theme.titleColor} !important;
    }
  }

  .startConvo {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    height: 100%;

    background-color: ${(props) => (props.theme.theme === 'light' ? props.theme.bg_secondaryColor : '#242526')};
    color: ${(props) => props.theme.primaryColor};
  }
`;

const Chat = ({ getAllUsers, allUsers, match, getDirectMessages, currUser, recentUsers }) => {
  const [text, setText] = useState('');
  const [targetUser, setTargetUser] = useState(null);
  const [message, setMessage] = useState('');

  const { userId } = match.params;
  const ws = useContext(WebSocketContext);

  useEffect(() => {
    getAllUsers(text);
  }, [text]);

  useEffect(() => {
    if (userId) {
      (async () => {
        const response = await fetchWrapper.get(`users/${userId}`);
        setTargetUser(response.data);
        getDirectMessages(userId, 1);
      })();
    }
  }, [userId]);

  const sendMessage = (e, message) => {
    e.preventDefault();
    if (message) {
      ws.sendMessage(message, userId);
      setMessage('');
    }
  };

  return (
    <ChatStyle style={{ display: 'flex' }}>
      <CustomScrollerContainer className="costume-col-chat top">
        <div>
          <div className="settings-tray ">
            <h2>Chat</h2>
          </div>
          <div className="search-box">
            <input placeholder="Search here" type="text" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          {recentUsers.map((user) => (
            <Link to={`/chat/${user.user._id}`} key={user.user._id}>
              <div className="friend-drawer">
                <img className="profile-image" src={user.user.imageUrl} alt="" />
                <div className="text">
                  <h2>{`${user.user.firstName} ${user.user.lastName}`}</h2>
                  <p className="">{user.data}</p>
                </div>
                {/* <span className="time">13:21</span> */}
              </div>
            </Link>
          ))}
          {console.log(recentUsers)}
          {allUsers
            .filter((user) => user._id !== currUser._id)
            .filter((user) => recentUsers.findIndex((recent) => recent.user._id === user._id) === -1)
            .map((user) => (
              <Link to={`/chat/${user._id}`} key={user._id}>
                <div className="friend-drawer">
                  <img className="profile-image" src={user.imageUrl} alt="" />
                  <div className="text">
                    <h2>{`${user.firstName} ${user.lastName}`}</h2>
                    <p className="">Start A Conversation!</p>
                  </div>
                  {/* <span className="time">13:21</span> */}
                </div>
              </Link>
            ))}
        </div>
      </CustomScrollerContainer>
      <div
        className="costume-col-chat"
        style={{
          backgroundColor: '#242526',
          color: 'white',

          flex: '75%',
        }}
      >
        {targetUser ? (
          <div>
            <div>
              <div className="settings-tray">
                <h2>
                  {targetUser.firstName} {targetUser.lastName}
                </h2>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className="outer_outer_container">
                <div className="outer_container">
                  <div className="inner_container">
                    <Messages userId={targetUser._id} />
                    <div className="message-inputarea position-relative">
                      <input
                        className="message-input message-input-items"
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event, message) : null)}
                      />

                      <div className="send-btn message-input-items">
                        <SendBtn onClick={(event) => sendMessage(event, message)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="userDetails" style={{ flex: '25%' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src={targetUser.imageUrl} alt="avatar" style={{ height: '5rem', width: '5rem' }} />
                  <h2>
                    {targetUser.firstName} {targetUser.lastName}
                  </h2>
                  <Link to={`/profile/${targetUser._id}`}>View Profile</Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="startConvo">
            <p>Click on a user to start a conversation</p>
          </div>
        )}
      </div>
    </ChatStyle>
  );
};

const mapStateToProps = (state) => ({
  allUsers: state.user.allUsers,
  currUser: state.user.user,
  recentUsers: state.user.recentUsers,
});

export default connect(mapStateToProps, { getAllUsers, getDirectMessages })(Chat);
