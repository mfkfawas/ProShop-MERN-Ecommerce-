import { UserActionType } from '../actions/userActionType';

export const userLoginReducer = (state = {}, action: any) => {
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
