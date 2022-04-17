import { UserActionType } from '../actions/userActionType';
import { UserActionTypes } from '../type';

export const userLoginReducer = (state = {}, action: UserActionTypes) => {
  switch (action.type) {
    case UserActionType.USER_LOGIN_REQUEST:
      return { loading: true };
    case UserActionType.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case UserActionType.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case UserActionType.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action: UserActionTypes) => {
  switch (action.type) {
    case UserActionType.USER_REGISTER_REQUEST:
      return { loading: true };
    case UserActionType.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case UserActionType.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
