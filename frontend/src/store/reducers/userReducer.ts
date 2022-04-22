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

interface UserDetailsState {
  user:
    | {
        name: string;
        email: string;
        isAdmin: boolean;
        token: string;
      }
    | {};
}

const UserDetailsInitialState: UserDetailsState = {
  user: {},
};

export const userDetailsReducer = (
  state = UserDetailsInitialState,
  action: UserActionTypes
) => {
  switch (action.type) {
    case UserActionType.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case UserActionType.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case UserActionType.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action: UserActionTypes) => {
  switch (action.type) {
    case UserActionType.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case UserActionType.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case UserActionType.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case UserActionType.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
