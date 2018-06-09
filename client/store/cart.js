import axios from 'axios'

const initialState = {
  items: [],
}

const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_GUEST_CART = 'DELETE_FROM_GUEST_CART'
const ADD_FROM_LOCAL = 'ADD_FROM_LOCAL'

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

const addFromLocalStorage = data => {
  return {
    type: ADD_FROM_LOCAL,
    data,
  }
}

export const addToLocalStorageData = data => {
  return dispatch => {
    dispatch(addFromLocalStorage(data))
  }
}

export const addedToCart = id => {
  return async dispatch => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch(addToCart(data))
  }
}

export const deleteFromGuestCart = index => {
  let storage = window.localStorage
  let items = JSON.parse(storage.getItem('cart'))
  let newItems = items.filter((item, i) => {
    if (index !== i) return item
  })
  storage.setItem('cart', JSON.stringify(newItems))

  return dispatch => {
    dispatch(deletedFromGuestCart(index))
  }
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, {...action.item, quantity: 0}],
      }

    case DELETE_FROM_GUEST_CART:
      return {
        ...state,
        items: state.items.filter((item, i) => {
          if (action.index !== i) return item
        }),
      }

    case ADD_FROM_LOCAL:
      return {
        ...state,
        items: action.data,
      }
    default:
      return state
  }
}

export default cartReducer
