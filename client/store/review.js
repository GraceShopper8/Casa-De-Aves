import axios from 'axios'


const CREATED_REVIEW = 'CREATED_REVIEW'

const initialState = {
  allReviews: []
}

const createdReview = review => {
  return {
    type: CREATED_REVIEW,
    review
  }
}

export const addReview = (review) => {
  return async dispatch => {
  try {
    const response = await axios.post(`/api/review`, review);
    const newReview = response.data;
    dispatch(createdReview(newReview))
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
     default:
      return state
  }
}


export default reviewReducer
