import {expect} from 'chai'
import orderReducer from './order'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)


describe('orderReducer', () => {
  it('starts with initial state of an empty array', () => {
    const newState = orderReducer(undefined, '@@INIT')
    expect(newState).to.deep.equal({ orders: [],
    usersOrders: [] })
  })

  it('creates new order', () => {
    const newOrder = {
      cartContents: 'This is a string of objects',
      shippingAddress: '5 hudson place',
      totalPrice: 2200.50
    }
  })
})

 
