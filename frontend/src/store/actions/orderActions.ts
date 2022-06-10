import axios from 'axios';
import { Dispatch } from 'redux';
import { OrderActionType } from './orderActionType';
import { OrderActionTypes } from '../type';

interface OrderType {
  orderItems:
    | {
        product: string;
        name: string;
        image: string;
        price: number;
        countInStock: number;
        qty: number;
      }[]
    | [];
  shippingAddress:
    | {
        address: string;
        city: string;
        postalCode: string;
        country: string;
      }
    | {};
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export const createOrder =
  (order: OrderType) => async (dispatch: Dispatch<OrderActionTypes>, getState: any) => {
    try {
      dispatch({
        type: OrderActionType.ORDER_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/v1/orders`, order, config);

      dispatch({
        type: OrderActionType.ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.ORDER_CREATE_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const getOrderDetails =
  (orderId: string) => async (dispatch: Dispatch<OrderActionTypes>, getState: any) => {
    try {
      dispatch({
        type: OrderActionType.ORDER_DETAILS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/v1/orders/${orderId}`, config);

      dispatch({
        type: OrderActionType.ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.ORDER_DETAILS_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const payOrder =
  (orderId: any, paymentResult: any) =>
  async (dispatch: Dispatch<OrderActionTypes>, getState: any) => {
    try {
      dispatch({
        type: OrderActionType.ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.patch(
        `/api/v1/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: OrderActionType.ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.ORDER_PAY_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const deliverOrder =
  (order: any) => async (dispatch: Dispatch<OrderActionTypes>, getState: any) => {
    try {
      dispatch({
        type: OrderActionType.ORDER_DELIVER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.patch(
        `/api/v1/orders/${order._id}/deliver`,
        {},
        config
      );

      dispatch({
        type: OrderActionType.ORDER_DELIVER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.ORDER_DELIVER_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const listMyOrders =
  () => async (dispatch: Dispatch<OrderActionTypes>, getState: any) => {
    try {
      dispatch({
        type: OrderActionType.ORDER_LIST_MY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/v1/orders/myorders`, config);

      dispatch({
        type: OrderActionType.ORDER_LIST_MY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.ORDER_LIST_MY_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const listOrders =
  () => async (dispatch: Dispatch<OrderActionTypes>, getState: any) => {
    try {
      dispatch({
        type: OrderActionType.ORDER_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/v1/orders`, config);

      dispatch({
        type: OrderActionType.ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.ORDER_LIST_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };
