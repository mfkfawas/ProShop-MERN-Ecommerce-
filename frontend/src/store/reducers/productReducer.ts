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
const productInitialState: ProductTypeObj = {
  _id: 'string',
  name: 'string',
  image: 'string',
  description: 'string',
  brand: 'string',
  category: 'string',
  price: 5,
  countInStock: 5,
  rating: 5,
  numReviews: 5,
};

export const productDetailsReducer = (
  state: ProductTypeObj = productInitialState,
  action: ProductActionType
) => {
  switch (action.type) {
    case ActionType.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ActionType.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case ActionType.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
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
