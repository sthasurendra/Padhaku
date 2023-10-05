import { createStore, combineReducers, applyMiddleware } from 'redux';

import UI from './reducers/ui';
import User from './reducers/user';
import Thread from './reducers/thread';
import Message from './reducers/message';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
  let middleware = process.env.NODE_ENV === 'development' ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);

  const appReducer = combineReducers({
    ui: UI,
    user: User,
    thread: Thread,
    message: Message,
  });

  const rootReducer = (state, action) => {
    // if (action.type === 'SET_LOGGEDOUT') {
    //   state = undefined;
    // }

    return appReducer(state, action);
  };

  const store = createStore(rootReducer, middleware);
  return store;
};
