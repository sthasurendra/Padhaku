import * as ActionTypes from '../actionsType';
import { fetchWrapper } from '../../_helpers';

export const getDirectMessages =
  (userId, page = 1) =>
  async (dispatch) => {
    try {
      if (page === 1) {
        dispatch({ type: ActionTypes.CLEAR_MESSAGES });
      }
      const userMessages = await fetchWrapper.get(
        `directMessage/${userId}?page=${page}&limit=${15}&sort=createdAt:asc`,
      );
      dispatch({ type: ActionTypes.SET_ALL_MESSAGES, payload: userMessages });
    } catch (e) {}
  };
