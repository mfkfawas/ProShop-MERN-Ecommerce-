import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from './productActionType';
import { ProductActionType } from '../type';

export const listProducts =
  (keyword = '', pageNumber: string | number = '') =>
  async (dispatch: Dispatch<ProductActionType>) => {
    try {
      dispatch({ type: ActionType.PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/v1/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: ActionType.PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.PRODUCT_LIST_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const listProductDetails =
  (id: any) => async (dispatch: Dispatch<ProductActionType>) => {
    try {
      dispatch({ type: ActionType.PRODUCT_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/v1/products/${id}`);

      dispatch({
        type: ActionType.PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteProduct =
  (id: any) => async (dispatch: Dispatch<ProductActionType>, getState: any) => {
    try {
      dispatch({
        type: ActionType.PRODUCT_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/v1/products/${id}`, config);

      dispatch({
        type: ActionType.PRODUCT_DELETE_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.PRODUCT_DELETE_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const createProduct =
  () => async (dispatch: Dispatch<ProductActionType>, getState: any) => {
    try {
      dispatch({
        type: ActionType.PRODUCT_CREATE_REQUEST,
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

      const { data } = await axios.post(`/api/v1/products/`, {}, config);

      dispatch({
        type: ActionType.PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.PRODUCT_CREATE_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const updateProduct =
  (product: any) => async (dispatch: Dispatch<ProductActionType>, getState: any) => {
    try {
      dispatch({
        type: ActionType.PRODUCT_UPDATE_REQUEST,
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
        `/api/v1/products/${product._id}`,
        product,
        config
      );

      dispatch({
        type: ActionType.PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.PRODUCT_UPDATE_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const createProductReview =
  (productId: any, review: any) =>
  async (dispatch: Dispatch<ProductActionType>, getState: any) => {
    try {
      dispatch({
        type: ActionType.PRODUCT_CREATE_REVIEW_REQUEST,
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

      await axios.post(`/api/v1/products/${productId}/reviews`, review, config);

      dispatch({
        type: ActionType.PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.PRODUCT_CREATE_REVIEW_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };
