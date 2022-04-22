import axios from 'axios';
import { Dispatch } from 'redux';
import { UserActionType } from './userActionType';
import { UserActionTypes } from '../type';

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

export const logout = () => async (dispatch: Dispatch<UserActionTypes>) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: UserActionType.USER_LOGOUT });
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
  (id: string) => async (dispatch: Dispatch<UserActionTypes>, getState: any) => {
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
