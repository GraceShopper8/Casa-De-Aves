import axios from 'axios'


const CREATED_REVIEW = 'CREATED_REVIEW'
const FETCH_ALL_REVIEWS = 'FETCH_ALL_REVIEWS'

const initialState = {
  allReviews: []
}

export const createdReview = review => {
  return {
    type: CREATED_REVIEW,
    review
  }
}

export const gotAllReviews = reviews => {
  return {
    type: FETCH_ALL_REVIEWS,
    reviews
  }
}

export const addReview = (review) => {
  return async dispatch => {
  try {
    const response = await axios.post(`/api/reviews`, review);
    const newReview = response.data;
    dispatch(createdReview(newReview))
  } catch (error) { console.error(error) }
 }
}

export const getAllReviews = () => {
  return async dispatch => {
  try {
    const response = await axios.get(`/api/reviews`);
    const reviews = response.data;
    dispatch(gotAllReviews(reviews))
  } catch (error) { console.error(error) }
 }
}


const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATED_REVIEW:
      return {
        ...state,
        allReviews: [...state.allReviews, action.review]
      }
      case FETCH_ALL_REVIEWS:
      return {
        ...state,
        allReviews: action.reviews
      }
     default:
      return state
  }
}


export default reviewReducer
