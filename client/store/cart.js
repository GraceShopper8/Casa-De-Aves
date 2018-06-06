import axios from 'axios'

const initialState = {
  items: [],
}

const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_GUEST_CART = 'DELETE_FROM_GUEST_CART'

const addToCart = item => {
  return {
    type: ADD_TO_CART,
    item,
  }
}

const deletedFromGuestCart = index => ({
  type: DELETE_FROM_GUEST_CART,
  index,
})

export const addedToCart = id => {
  return async dispatch => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch(addToCart(data))
  }
}

export const deleteFromGuestCart = index => {
  return dispatch => {
    dispatch(deletedFromGuestCart(index))
  }
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.item],
      }

    case DELETE_FROM_GUEST_CART:
      return {
        ...state,
        items: state.items.splice(action.index, 1),
      }

    default:
      return state
  }
}

export default cartReducer
