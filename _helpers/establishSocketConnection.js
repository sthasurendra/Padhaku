import * as io from 'socket.io-client';

let userSocket;
export const establishSocketConnection = () => {
  const ENDPOINT = process.env.REACT_APP_CHAT_API;
  try {
    let userSocket = io.connect(ENDPOINT, { withCredentials: true });
    return userSocket;
  } catch (e) {
    return userSocket;
  }
};
