import * as ActionTypes from '../actionsType';
import { fetchWrapper } from '../../_helpers';
import { toast } from 'react-toastify';

export const loginUser = (user, history) => async (dispatch) => {
  try {
    const response = await fetchWrapper.post('auth/login', user);
    dispatch(setUser(response.data.user));
    if (response.data.user) {
      history.push('/');
    }
  } catch (e) {
    console.log(e);
    toast.error(e.message);
  }
};

export const putUserProfile = (user) => async (dispatch) => {
  try {
    dispatch(putUser(user));
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};

export const getUserData = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const user = await fetchWrapper.get(`users/me`);
    dispatch(setUser(user.data));
    dispatch(stopLoading());
  } catch (error) {
    dispatch(stopLoading());
    dispatch(setLoggedOut());
  }
};

export const getAllUsers = (text) => async (dispatch) => {
  try {
    const users = await fetchWrapper.get(`users${text ? `?firstName=${text}` : ''}`);
    const dm = await fetchWrapper.get('directMessage');
    dispatch(setAllUser(users));
    dispatch(setAllRecentUser(dm));
    console.log(dm);
  } catch (e) {}
};

export const logoutUser = () => async (dispatch) => {
  try {
    await fetchWrapper.post(`auth/logout`);
    window.location.reload(false);
  } catch (e) {}
};

export const setUser = (user) => ({
  type: ActionTypes.SET_USER,
  payload: user,
});
export const putUser = (user) => ({
  type: ActionTypes.PUT_USER,
  payload: user,
});

const setAllUser = (user) => ({
  type: ActionTypes.SET_ALL_USER,
  payload: user,
});

const setAllRecentUser = (chat) => ({
  type: ActionTypes.SET_RECENT_CHAT,
  payload: chat,
});

const startLoading = () => ({
  type: ActionTypes.START_LOADING,
});
const stopLoading = () => ({
  type: ActionTypes.STOP_LOADING,
});
const setLoggedOut = () => ({
  type: ActionTypes.SET_LOGGED_OUT,
});
