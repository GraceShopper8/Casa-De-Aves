import axios from 'axios'

const initialState = {
  orders: [],
}

const ADDED_NEW_ORDER = 'ADDED_NEW_ORDER'

const addedNewOrder = order => ({
  type: ADDED_NEW_ORDER,
  order,
})

export const addNewOrder = order => async dispatch => {
  const { data } = await axios.post('/api/orders/', order)
  dispatch(addedNewOrder(data))
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDED_NEW_ORDER: {
      return {
        ...state,
        orders: [...state.orders, action.order],
      }
    }
    default:
      return state
  }
}

export default orderReducer
