import { ActionType } from '../actions/productActionType';
import { CartActionType } from '../actions/cartActionType';

// types of our state
interface ProductTypeObj {
  _id?: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

interface ProductType {
  product: ProductTypeObj;
}

interface RatingType {
  value: number;
  text: string;
  color?: string;
}

// types of our actions
interface ProductListRequest {
  type: ActionType.PRODUCT_LIST_REQUEST;
  payload?: any;
}

interface ProductListSuccess {
  type: ActionType.PRODUCT_LIST_SUCCESS;
  payload: {
    products: ProductTypeObj[];
    // pages?: number;
    // page?: number;
  };
}

interface ProductListFail {
  type: ActionType.PRODUCT_LIST_FAIL;
  payload: any;
}

interface ProductDetailsRequest {
  type: ActionType.PRODUCT_DETAILS_REQUEST;
  payload?: any;
}

interface ProductDetailsSuccess {
  type: ActionType.PRODUCT_DETAILS_SUCCESS;
  payload: ProductTypeObj;
}

interface ProductDetailsFail {
  type: ActionType.PRODUCT_DETAILS_FAIL;
  payload: any;
}

export type ProductActionType =
  | ProductListRequest
  | ProductListSuccess
  | ProductListFail
  | ProductDetailsRequest
  | ProductDetailsSuccess
  | ProductDetailsFail;

export interface CartItemType {
  cartItems:
    | {
        product: string;
        name: string;
        image: string;
        price: number;
        countInStock: number;
        qty: number;
      }[]
    | [];
}

interface CartAddItem {
  type: CartActionType.CART_ADD_ITEM;
  payload: any;
}

interface CartRemoveItem {
  type: CartActionType.CART_REMOVE_ITEM;
  payload: any;
}

export type CartActionTypes = CartAddItem | CartRemoveItem;
