import * as ActionTypes from '../actionsType';

const initialState = {
  isLoading: true,
  threads: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_ALL_THREADS:
      return {
        ...state,
        threads: [...action.payload],
      };

    case ActionTypes.SET_NEW_THREADS:
      return {
        ...state,
        threads: [action.payload, ...state.threads],
      };

    default:
      return state;
  }
}
