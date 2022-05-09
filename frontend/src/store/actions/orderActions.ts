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