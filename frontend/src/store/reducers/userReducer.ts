import { ActionType } from '../actions/userActionType';

export const userLoginReducer = (state = {}, action: any) => {
  switch (action.type) {
    case ActionType.USER_LOGIN_REQUEST:
      return { loading: true };
    case ActionType.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case ActionType.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
