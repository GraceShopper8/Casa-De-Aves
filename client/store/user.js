import axios from 'axios'
import history from '../history'
import userHome from '../components'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_NEW_USER = 'ADD_NEW_USER'
const UPDATED_USER_CART = 'UPDATED_USER_CART'
const UPDATE_USER = 'UPDATE_USER'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const addNewUser = user => ({ type: ADD_NEW_USER, user })
const updatedUserCart = user => ({ type: UPDATED_USER_CART, user })
const updatedUser = user => ({ type: UPDATE_USER, user })

/**
 * THUNK CREATORS
 */

// Adds cart to user "cart" column through user update
export const updateUserCart = user => async dispatch => {
  try {
    const { data } = await axios.put(`/api/users/${user.id}`, user)
    dispatch(updatedUserCart(data))
    // console.log('THIS IS THE PASSED USER: ', data)
  } catch (error) {
    console.error(error)
  }
}

export const AddUser = user => dispatch =>
  axios
    .post(`/auth/signup`, user)
    .then(
      res => {
        dispatch(addNewUser(res.data))
        history.push('/products')
      },
      authError => {
        dispatch(addNewUser({ error: authError }))
      }
    )
    .catch(err => console.error(err))

export const updateUser = user => dispatch =>
  axios
    .put(`/auth/${user.id}`, user)
    .then(
      res => {
        dispatch(updatedUser(res.data))
        history.push('/products')
      },
      authError => {
        dispatch(updatedUser({ error: authError }))
      }
    )
    .catch(err => console.error(err))

export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err))

export const auth = (email, password, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(
      res => {
        dispatch(getUser(res.data))
        history.push('/home')
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const deleteUser = user => dispatch =>
  axios
    .delete(`/auth/${user}`)
    .then(_ => {
      dispatch(removeUser())
      history.push('/login')
    })
    .catch(err => console.log(err))

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser())
      history.push('/login')
    })
    .catch(err => console.log(err))

/**
 * REDUCER
 */

const userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case ADD_NEW_USER:
      return action.user
    case UPDATED_USER_CART:
      return action.user
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}

export default userReducer
