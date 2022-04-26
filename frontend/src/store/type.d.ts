import { ActionType } from './actions/productActionType';
import { CartActionType } from './actions/cartActionType';
import { UserActionType } from './actions/userActionType';

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

interface CartSaveShippingAddress {
  type: CartActionType.CART_SAVE_SHIPPING_ADDRESS;
  payload: any;
}

interface CartSavePaymentMethod {
  type: CartActionType.CART_SAVE_PAYMENT_METHOD;
  payload: any;
}

export type CartActionTypes =
  | CartAddItem
  | CartRemoveItem
  | CartSaveShippingAddress
  | CartSavePaymentMethod;

interface UserLoginRequest {
  type: UserActionType.USER_LOGIN_REQUEST;
}

interface UserLoginSuccess {
  type: UserActionType.USER_LOGIN_SUCCESS;
  payload: any;
}
interface UserLoginFail {
  type: UserActionType.USER_LOGIN_FAIL;
  payload: any;
}
interface UserLogout {
  type: UserActionType.USER_LOGOUT;
}

interface UserRegisterRequest {
  type: UserActionType.USER_REGISTER_REQUEST;
}

interface UserRegisterSuccess {
  type: UserActionType.USER_REGISTER_SUCCESS;
  payload: any;
}
interface UserRegisterFail {
  type: UserActionType.USER_REGISTER_FAIL;
  payload: any;
}

interface UserDetailsRequest {
  type: UserActionType.USER_DETAILS_REQUEST;
}

interface UserDetailsSuccess {
  type: UserActionType.USER_DETAILS_SUCCESS;
  payload: any;
}
interface UserDetailsFail {
  type: UserActionType.USER_DETAILS_FAIL;
  payload: any;
}

interface UserUpdateProfileRequest {
  type: UserActionType.USER_UPDATE_PROFILE_REQUEST;
}

interface UserUpdateProfileSuccess {
  type: UserActionType.USER_UPDATE_PROFILE_SUCCESS;
  payload: any;
}
interface UserUpdateProfileFail {
  type: UserActionType.USER_UPDATE_PROFILE_FAIL;
  payload: any;
}

interface UserUpdateProfileReset {
  type: UserActionType.USER_UPDATE_PROFILE_RESET;
}

export type UserActionTypes =
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFail
  | UserLogout
  | UserRegisterRequest
  | UserRegisterSuccess
  | UserRegisterFail
  | UserDetailsRequest
  | UserDetailsSuccess
  | UserDetailsFail
  | UserUpdateProfileRequest
  | UserUpdateProfileSuccess
  | UserUpdateProfileFail
  | UserUpdateProfileReset;
