import * as ActionTypes from '../actionsType';

import { fetchWrapper } from '../../_helpers';

export const getAllThreads = (filterString) => async (dispatch) => {
  try {
    const response = await fetchWrapper.get(`threads/?${filterString}`);
    dispatch({ type: ActionTypes.SET_ALL_THREADS, payload: response.data });
  } catch (e) {}
};

export const postAThread = (thread) => async (dispatch) => {
  try {
    const response = await fetchWrapper.post('threads/', thread);
    dispatch({ type: ActionTypes.SET_NEW_THREADS, payload: response.data });
  } catch (e) {}
};

export const commentOnThread = (threadId, comment) => async (dispatch) => {
  try {
    const response = await fetchWrapper.post(`threads/${threadId}/comment`, comment);
    console.log(response);
    return response;
    // dispatch({ type: ActionTypes.SET_NEW_THREADS, payload: response.data });
  } catch (e) {
    return 0;
  }
};

export const likeOnThread = (threadId) => async (dispatch) => {
  try {
    const response = await fetchWrapper.post(`threads/${threadId}/like`);
    console.log(response);
    return 1;
    // dispatch({ type: ActionTypes.SET_NEW_THREADS, payload: response.data });
  } catch (e) {
    return 0;
  }
};

export const unlikeOnThread = (threadId) => async (dispatch) => {
  try {
    const response = await fetchWrapper.post(`threads/${threadId}/unlike`);
    console.log(response);
    return 1;
    // dispatch({ type: ActionTypes.SET_NEW_THREADS, payload: response.data });
  } catch (e) {
    return 0;
  }
};
