import axios from 'axios'
import history from '../history'

const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS'
const FETCH_SINGLE_PRODUCT = 'FETCH_SINGLE_PRODUCT'
const UPDATED_PRODUCT = 'UPDATED_PRODUCT'

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
const updatedProduct = product => {
  return {
    type: UPDATED_PRODUCT,
    product
  }
}

export const getAllProducts = () => {
  return async dispatch => {
    // ASSUMING API ROUTE IS SET
    const { data } = await axios.get('/api/products')
    const action = gotAllProducts(data)
    dispatch(action)
  }
}

export const getSingleProducts = id => {
  return async dispatch => {
    // ASSUMING API ROUTE IS SET
    const { data } = await axios.get(`/api/products/${id}`)
    const action = gotSingleProducts(data)
    dispatch(action)
  }
}

export const updateProduct = product => {
  return async dispatch => {
    const resp = await axios.put(`/api/products/${product.id}`, product)
    const editedProduct = resp.data
    dispatch(updatedProduct(editedProduct))
    history.push('/products')
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
      case UPDATED_PRODUCT: {
      const newProducts = state.allProducts.filter(prod => prod.id !== action.prod.id)
      return {
        ...state,
        allProducts: [...newProducts, action.product]
      }
    }
    default:
      return state
  }
}

export default productReducer
