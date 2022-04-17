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
