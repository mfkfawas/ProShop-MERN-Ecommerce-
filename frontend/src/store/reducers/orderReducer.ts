import { OrderActionType } from '../actions/orderActionType';
import { OrderActionTypes } from '../type';

export const orderCreateReducer = (state: any = {}, action: OrderActionTypes) => {
  switch (action.type) {
    case OrderActionType.ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      };
    case OrderActionType.ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OrderActionType.ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state: any = { loading: true, orderItems: [], shippingAddress: {} },
  action: OrderActionTypes
) => {
  switch (action.type) {
    case OrderActionType.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case OrderActionType.ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state: any = {}, action: OrderActionTypes) => {
  switch (action.type) {
    case OrderActionType.ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case OrderActionType.ORDER_PAY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OrderActionType.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (
  state: any = { orders: [] },
  action: OrderActionTypes
) => {
  switch (action.type) {
    case OrderActionType.ORDER_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.ORDER_LIST_MY_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case OrderActionType.ORDER_LIST_MY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OrderActionType.ORDER_LIST_MY_RESET:
      return { ...state, orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (
  state: any = { orders: [] },
  action: OrderActionTypes
) => {
  switch (action.type) {
    case OrderActionType.ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case OrderActionType.ORDER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
