import axios from 'axios';

const initialState = {
  items: []
}

const ADD_TO_CART = 'ADD_TO_CART';

const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    item
  }
}

export const addedToCart = (id) => {
  return async (dispatch) => {
    const {data} = await axios.get(`/api/products/${id}`);
    dispatch(addToCart(data)); 
  }
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.item]
      }
      break;
  
    default:
      return state;
  }
}

export default cartReducer;