export enum OrderActionType {
  ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST',
  ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS',
  ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL',
  ORDER_CREATE_RESET = 'ORDER_CREATE_RESET',

  ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST',
  ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS',
  ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL',

  ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST',
  ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS',
  ORDER_PAY_FAIL = 'ORDER_PAY_FAIL',
  ORDER_PAY_RESET = 'ORDER_PAY_RESET',
}
