import axios from 'axios';
import { Dispatch } from 'redux';
import { UserActionType } from './userActionType';
import { OrderActionType } from './orderActionType';
import { UserActionTypes, OrderActionTypes } from '../type';

export const login =
  (email: string, password: string) => async (dispatch: Dispatch<UserActionTypes>) => {
    try {
      dispatch({
        type: UserActionType.USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/users/login',
        { email, password },
        config
      );

      dispatch({
        type: UserActionType.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: UserActionType.USER_LOGIN_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const logout =
  () => async (dispatch: Dispatch<UserActionTypes | OrderActionTypes>) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: UserActionType.USER_LOGOUT });
    dispatch({ type: UserActionType.USER_DETAILS_RESET });
    dispatch({ type: OrderActionType.ORDER_LIST_MY_RESET });
    dispatch({ type: UserActionType.USER_LIST_RESET });
  };

export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch<UserActionTypes>) => {
    try {
      dispatch({
        type: UserActionType.USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/users',
        { name, email, password },
        config
      );

      dispatch({
        type: UserActionType.USER_REGISTER_SUCCESS,
        payload: data,
      });

      // Right After Registering User, We will automatically login the user
      dispatch({
        type: UserActionType.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: UserActionType.USER_REGISTER_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const getUserDetails =
  (id: any) => async (dispatch: Dispatch<UserActionTypes>, getState: any) => {
    try {
      dispatch({
        type: UserActionType.USER_DETAILS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/v1/users/${id}`, config);

      dispatch({
        type: UserActionType.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionType.USER_DETAILS_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  currentPassword: string;
}

export const updateUserProfile =
  (user: UserProfile) => async (dispatch: Dispatch<UserActionTypes>, getState: any) => {
    const { name, email, password, currentPassword } = user;

    try {
      dispatch({
        type: UserActionType.USER_UPDATE_PROFILE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.patch(
        `/api/v1/users/profile`,
        { name, email },
        config
      );

      const newPassword = password.trim().length > 0 ? password : null;

      if (newPassword) {
        await axios.patch(
          `/api/v1/users/updateMyPassword`,
          { currentPassword, password },
          config
        );
      }

      dispatch({
        type: UserActionType.USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: UserActionType.USER_LOGIN_SUCCESS,
        payload: data,
      });

      dispatch({
        type: UserActionType.USER_DETAILS_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: UserActionType.USER_UPDATE_PROFILE_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const listUsers =
  () => async (dispatch: Dispatch<UserActionTypes>, getState: any) => {
    try {
      dispatch({
        type: UserActionType.USER_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/v1/users`, config);

      dispatch({
        type: UserActionType.USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionType.USER_LIST_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const deleteUser =
  (id: any) => async (dispatch: Dispatch<UserActionTypes>, getState: any) => {
    try {
      dispatch({
        type: UserActionType.USER_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/v1/users/${id}`, config);

      dispatch({
        type: UserActionType.USER_DELETE_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionType.USER_DELETE_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const updateUser =
  (user: any) => async (dispatch: Dispatch<UserActionTypes>, getState: any) => {
    try {
      dispatch({
        type: UserActionType.USER_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.patch(`/api/v1/users/${user._id}`, user, config);

      dispatch({
        type: UserActionType.USER_UPDATE_SUCCESS,
      });

      dispatch({
        type: UserActionType.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionType.USER_UPDATE_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };
