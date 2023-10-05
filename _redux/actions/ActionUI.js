import * as ActionTypes from '../actionsType';

export const toggleTheme = () => async (dispatch) => {
  dispatch({ type: ActionTypes.TOGGLE_THEME });
};
