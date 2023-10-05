import * as ActionTypes from '../actionsType';

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  user: null,
  allUsers: [],
  totalUsers: 0,
  recentUsers: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case ActionTypes.PUT_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        isLoggedIn: true,
      };

    case ActionTypes.SET_ALL_USER:
      return {
        ...state,
        allUsers: action.payload.data,
        totalUsers: action.payload.totalResults,
      };
    case ActionTypes.SET_RECENT_CHAT:
      return {
        ...state,
        recentUsers: action.payload.results,
      };

    case ActionTypes.START_LOADING:
      return { ...state, isLoading: true };

    case ActionTypes.STOP_LOADING:
      return { ...state, isLoading: false };
    case ActionTypes.SET_LOGGED_OUT:
      return { ...state, isLoggedIn: false };

    default:
      return state;
  }
}
