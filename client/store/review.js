import axios from 'axios'
import history from '../history'

const CREATED_REVIEW = 'CREATE_REVIEW'
const initialState = {
  allReviews: []
}

const gotAllProducts = review => {
  return {
    type: CREATED_REVIEW,
    review,
  }
}


const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATED_REVIEW:
      return {
        ...state,
        allReviews: action.products,
      }
     default:
      return state
  }
}


export default reviewReducer
