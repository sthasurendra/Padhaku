import React, { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { establishSocketConnection } from '../../_helpers';

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  let socket;
  let ws;

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const sendMessage = (message, userId) => {
    socket.emit('message', { message, userId }, (error, data) => {
      if (error) {
        console.log(error);
      } else {
      }
    });
  };

  if (!socket && isLoggedIn) {
    socket = establishSocketConnection();
    if (socket) {
      socket.on('activity', (activity) => {});
      socket.on('message', (message) => dispatch({ type: 'SET_SOCKET_MESSAGE', payload: message }));
    }
    ws = {
      socket,
      sendMessage,
    };
  }

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};
