import {expect} from 'chai'
import { getAllProducts } from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)


describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    allProducts: [],
    singleProduct: {}
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAllProducts', () => {
    const products = {name: 'TEA HOUSE BIRDHOUSE'}
    it('eventually dispatches the gotAllProducts(data) action', () => {
      mockAxios.onGet('/api/products').replyOnce(200, products)
      return store.dispatch(getAllProducts())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('FETCH_ALL_PRODUCTS')
        })
    })
    it('It returns all the products', () => {
      mockAxios.onGet('/api/products').replyOnce(200, products)
      return store.dispatch(getAllProducts())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].products.name).to.be.deep.equal('TEA HOUSE BIRDHOUSE')
        })
    })
  })


})
