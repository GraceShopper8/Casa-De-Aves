import {expect} from 'chai'
import reviewReducer, { gotAllReviews } from './review'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)


describe('reviewReducer', () => {
  it('starts with initial state of an empty array', () => {
    const newReview = reviewReducer(undefined, '@@INIT')
    expect(newState).to.deep.equal([])
  })
})

// gotAllReviews({
//   reviewDetail: "Expensive but worth it!",
//   rating: 5

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    allReviews: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })




})
