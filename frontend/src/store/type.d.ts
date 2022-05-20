import { ActionType } from './actions/productActionType';
import { CartActionType } from './actions/cartActionType';
import { UserActionType } from './actions/userActionType';
import { OrderActionType } from './actions/orderActionType';

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

interface UserDetailsReset {
  type: UserActionType.USER_DETAILS_RESET;
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

interface UserListRequest {
  type: UserActionType.USER_LIST_REQUEST;
}

interface UserListSuccess {
  type: UserActionType.USER_LIST_SUCCESS;
  payload: any;
}
interface UserListFail {
  type: UserActionType.USER_LIST_FAIL;
  payload: any;
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
  | UserDetailsReset
  | UserUpdateProfileRequest
  | UserUpdateProfileSuccess
  | UserUpdateProfileFail
  | UserUpdateProfileReset
  | UserListRequest
  | UserListSuccess
  | UserListFail;

interface OrderCreateRequest {
  type: OrderActionType.ORDER_CREATE_REQUEST;
}
interface OrderCreateSuccess {
  type: OrderActionType.ORDER_CREATE_SUCCESS;
  payload: any;
}

interface OrderCreateFail {
  type: OrderActionType.ORDER_CREATE_FAIL;
  payload: any;
}

interface OrderCreateReset {
  type: OrderActionType.ORDER_CREATE_RESET;
}

interface OrderDetailsRequest {
  type: OrderActionType.ORDER_DETAILS_REQUEST;
}
interface OrderDetailsSuccess {
  type: OrderActionType.ORDER_DETAILS_SUCCESS;
  payload: any;
}

interface OrderDetailsFail {
  type: OrderActionType.ORDER_DETAILS_FAIL;
  payload: any;
}

interface OrderPayRequest {
  type: OrderActionType.ORDER_PAY_REQUEST;
}
interface OrderPaySuccess {
  type: OrderActionType.ORDER_PAY_SUCCESS;
  payload: boolean;
}

interface OrderPayFail {
  type: OrderActionType.ORDER_PAY_FAIL;
  payload: any;
}

interface OrderPayReset {
  type: OrderActionType.ORDER_PAY_RESET;
}

interface OrderListMyRequest {
  type: OrderActionType.ORDER_LIST_MY_REQUEST;
}
interface OrderListMySuccess {
  type: OrderActionType.ORDER_LIST_MY_SUCCESS;
  payload: any;
}

interface OrderListMyFail {
  type: OrderActionType.ORDER_LIST_MY_FAIL;
  payload: any;
}

interface OrderListMyReset {
  type: OrderActionType.ORDER_LIST_MY_RESET;
}

export type OrderActionTypes =
  | OrderCreateRequest
  | OrderCreateSuccess
  | OrderCreateFail
  | OrderCreateReset
  | OrderDetailsRequest
  | OrderDetailsSuccess
  | OrderDetailsFail
  | OrderPayRequest
  | OrderPaySuccess
  | OrderPayFail
  | OrderPayReset
  | OrderListMyRequest
  | OrderListMySuccess
  | OrderListMyFail
  | OrderListMyReset;
