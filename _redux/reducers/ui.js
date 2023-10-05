import * as ActionType from '../actionsType';

const initialState = {
  loading: false,
  errors: null,
  message: null,
  darkMode: localStorage.getItem('darkMode') === null ? false : JSON.parse(localStorage.getItem('darkMode')),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionType.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case ActionType.TOGGLE_THEME:
      let toggledMode = !state.darkMode;
      localStorage.setItem('darkMode', toggledMode);
      return {
        ...state,
        darkMode: toggledMode,
      };
    default:
      return {
        ...state,
      };
  }
}
