import axios from 'axios'

const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS'
const FETCH_SINGLE_PRODUCT = 'FETCH_SINGLE_PRODUCT'

const initState = {
  allProducts: [],
  singleProduct: {},
}

const gotAllProducts = products => {
  return {
    type: FETCH_ALL_PRODUCTS,
    products,
  }
}

const gotSingleProducts = product => {
  return {
    type: FETCH_SINGLE_PRODUCT,
    product,
  }
}

export const getAllProducts = () => {
  return async dispatch => {
    // ASSUMING API ROUTE IS SET
    const { data } = await axios.get('/api/products')
    console.log('ALL PRODUCTS - from product thunk creator\n', data)
    const action = gotAllProducts(data)
    dispatch(action)
  }
}

export const getSingleProducts = id => {
  return async dispatch => {
    // ASSUMING API ROUTE IS SET
    const { data } = await axios.get(`/api/products/${id}`)
    console.log('SINGLE PRODUCTS - from product thunk creator\n', data)
    const action = gotSingleProducts(data)
    dispatch(action)
  }
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.products,
      }
    case FETCH_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.product,
      }
    default:
      return state
  }
}

export default productReducer
