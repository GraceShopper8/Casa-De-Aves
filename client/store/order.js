import axios from 'axios'

const initialState = {
  orders: [],
  usersOrders: [],
}

const ADDED_NEW_ORDER = 'ADDED_NEW_ORDER'
const GOT_USERS_ORDERS = 'GOT_USERS_ORDERS'

const addedNewOrder = order => ({
  type: ADDED_NEW_ORDER,
  order,
})

const gotUsersOrders = orders => ({
  type: GOT_USERS_ORDERS,
  orders,
})

export const getUsersOrders = userId => async dispatch => {
  const { data } = await axios.get(`/api/orders/${userId}`)
  dispatch(gotUsersOrders(data))
}

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

    case GOT_USERS_ORDERS: {
      return {
        ...state,
        usersOrders: action.orders,
      }
    }

    default:
      return state
  }
}

export default orderReducer
