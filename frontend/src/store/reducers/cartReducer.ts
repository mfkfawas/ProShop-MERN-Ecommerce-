import { CartActionType } from '../actions/cartActionType';
import { CartActionTypes } from '../type';

interface cartInitialStateInterface {
  cartItems:
    | {
        product?: string;
        name: string;
        image: string;
        price: number;
        countInStock: number;
        qty: number;
      }[]
    | [];
}

const cartInitialState: cartInitialStateInterface = {
  cartItems: [],
};

export const cartReducer = (state = cartInitialState, action: CartActionTypes) => {
  switch (action.type) {
    case CartActionType.CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find(x => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x => (x.product === existItem.product ? item : x)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CartActionType.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload),
      };
    default:
      return state;
  }
};
