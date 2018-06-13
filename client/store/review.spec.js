import {expect} from 'chai'
import reviewReducer, { gotAllReviews, createdReview } from './review'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)


describe('reviewReducer', () => {
  it('starts with initial state of an empty array', () => {
    const newState = reviewReducer(undefined, '@@INIT')
    expect(newState).to.deep.equal({ allReviews: [] })
  })

  it('created a new review', () => {
    const newReview = {
      reviewDetail: 'Expensive but worth it!',
      rating: 5
    }
    const newState = reviewReducer([], gotAllReviews(newReview))
    expect(newState.allReviews).to.deep.equal({
      reviewDetail: 'Expensive but worth it!',
      rating: 5
    })
  })
})
