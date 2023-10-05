import * as ActionTypes from '../actionsType';

export default function (
  state = {
    messages: [],
    totalMessages: 0,
    isLoading: true,
  },
  action,
) {
  switch (action.type) {
    case ActionTypes.SET_ALL_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, ...action.payload.results],
        totalMessages: action.payload.totalResults,
        isLoading: false,
      };

    case ActionTypes.SET_SOCKET_MESSAGE:
      const tempMessage = [...state.messages];
      let message = {
        ...action.payload,
        type: 'message',
      };
      return {
        ...state,
        messages: [...tempMessage, message],
        totalMessages: state.totalMessages + 1,
      };
    case ActionTypes.CLEAR_MESSAGES:
      return { ...state, messages: [], totalMessages: 0 };
    default:
      return state;
  }
}
