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
    pages?: number;
    currentPage?: number;
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

interface ProductDetailsReset {
  type: ActionType.PRODUCT_DETAILS_RESET;
}

interface ProductDeleteRequest {
  type: ActionType.PRODUCT_DELETE_REQUEST;
}

interface ProductDeleteSuccess {
  type: ActionType.PRODUCT_DELETE_SUCCESS;
}

interface ProductDeleteFail {
  type: ActionType.PRODUCT_DELETE_FAIL;
  payload: any;
}

interface ProductCreateRequest {
  type: ActionType.PRODUCT_CREATE_REQUEST;
}

interface ProductCreateSuccess {
  type: ActionType.PRODUCT_CREATE_SUCCESS;
  payload: any;
}

interface ProductCreateFail {
  type: ActionType.PRODUCT_CREATE_FAIL;
  payload: any;
}

interface ProductCreateReset {
  type: ActionType.PRODUCT_CREATE_RESET;
  payload: any;
}

interface ProductUpdateRequest {
  type: ActionType.PRODUCT_UPDATE_REQUEST;
}

interface ProductUpdateSuccess {
  type: ActionType.PRODUCT_UPDATE_SUCCESS;
  payload: any;
}

interface ProductUpdateFail {
  type: ActionType.PRODUCT_UPDATE_FAIL;
  payload: any;
}

interface ProductUpdateReset {
  type: ActionType.PRODUCT_UPDATE_RESET;
}

interface ProductCreateReviewRequest {
  type: ActionType.PRODUCT_CREATE_REVIEW_REQUEST;
}

interface ProductCreateReviewSuccess {
  type: ActionType.PRODUCT_CREATE_REVIEW_SUCCESS;
}

interface ProductCreateReviewFail {
  type: ActionType.PRODUCT_CREATE_REVIEW_FAIL;
  payload: any;
}

interface ProductCreateReviewReset {
  type: ActionType.PRODUCT_CREATE_REVIEW_RESET;
}

interface ProductTopRequest {
  type: ActionType.PRODUCT_TOP_REQUEST;
  payload?: any;
}

interface ProductTopSuccess {
  type: ActionType.PRODUCT_TOP_SUCCESS;
  payload: {
    products: ProductTypeObj[];
    pages?: number;
    currentPage?: number;
  };
}

interface ProductTopFail {
  type: ActionType.PRODUCT_TOP_FAIL;
  payload: any;
}

export type ProductActionType =
  | ProductListRequest
  | ProductListSuccess
  | ProductListFail
  | ProductDetailsRequest
  | ProductDetailsSuccess
  | ProductDetailsFail
  | ProductDetailsReset
  | ProductDeleteRequest
  | ProductDeleteSuccess
  | ProductDeleteFail
  | ProductCreateRequest
  | ProductCreateSuccess
  | ProductCreateFail
  | ProductCreateReset
  | ProductUpdateRequest
  | ProductUpdateSuccess
  | ProductUpdateFail
  | ProductUpdateReset
  | ProductCreateReviewRequest
  | ProductCreateReviewSuccess
  | ProductCreateReviewFail
  | ProductCreateReviewReset
  | ProductTopRequest
  | ProductTopSuccess
  | ProductTopFail;

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

interface UserListReset {
  type: UserActionType.USER_LIST_RESET;
}

interface UserDeleteRequest {
  type: UserActionType.USER_DELETE_REQUEST;
}

interface UserDeleteSuccess {
  type: UserActionType.USER_DELETE_SUCCESS;
  payload?: any;
}
interface UserDeleteFail {
  type: UserActionType.USER_DELETE_FAIL;
  payload: any;
}

interface UserUpdateRequest {
  type: UserActionType.USER_UPDATE_REQUEST;
}

interface UserUpdateSuccess {
  type: UserActionType.USER_UPDATE_SUCCESS;
  payload?: any;
}
interface UserUpdateFail {
  type: UserActionType.USER_UPDATE_FAIL;
  payload: any;
}

interface UserUpdateReset {
  type: UserActionType.USER_UPDATE_RESET;
}

// prettier-ignore
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
  | UserListFail
  | UserListReset
  | UserDeleteRequest
  | UserDeleteSuccess
  | UserDeleteFail | UserUpdateRequest | UserUpdateSuccess | UserUpdateFail | UserUpdateReset;

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

interface OrderListRequest {
  type: OrderActionType.ORDER_LIST_REQUEST;
}
interface OrderListSuccess {
  type: OrderActionType.ORDER_LIST_SUCCESS;
  payload: any;
}

interface OrderListFail {
  type: OrderActionType.ORDER_LIST_FAIL;
  payload: any;
}

interface OrderDeliverRequest {
  type: OrderActionType.ORDER_DELIVER_REQUEST;
}
interface OrderDeliverSuccess {
  type: OrderActionType.ORDER_DELIVER_SUCCESS;
  payload: any;
}

interface OrderDeliverFail {
  type: OrderActionType.ORDER_DELIVER_FAIL;
  payload: any;
}

interface OrderDeliverReset {
  type: OrderActionType.ORDER_DELIVER_RESET;
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
  | OrderListMyReset
  | OrderListRequest
  | OrderListSuccess
  | OrderListFail
  | OrderDeliverRequest
  | OrderDeliverSuccess
  | OrderDeliverFail
  | OrderDeliverReset;
