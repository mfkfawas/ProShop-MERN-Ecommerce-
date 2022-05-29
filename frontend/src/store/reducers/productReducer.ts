import { ActionType } from '../actions/productActionType';
import { ProductActionType, ProductTypeObj } from '../type';

export const productListReducer = (
  state: ProductTypeObj[] = [],
  action: ProductActionType
) => {
  switch (action.type) {
    case ActionType.PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] };
    case ActionType.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case ActionType.PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// This is for TS

export const productDetailsReducer = (state = {}, action: ProductActionType) => {
  switch (action.type) {
    case ActionType.PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case ActionType.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case ActionType.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.PRODUCT_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action: ProductActionType) => {
  switch (action.type) {
    case ActionType.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case ActionType.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ActionType.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action: ProductActionType) => {
  switch (action.type) {
    case ActionType.PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case ActionType.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case ActionType.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (
  state = { product: {} },
  action: ProductActionType
) => {
  switch (action.type) {
    case ActionType.PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case ActionType.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case ActionType.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
