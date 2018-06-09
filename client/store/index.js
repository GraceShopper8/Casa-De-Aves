import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import product from './product'
import cart from './cart'

import review from './review'
import order from './order'
import checkout from './checkout';


const reducer = combineReducers({
  user,
  product,
  cart,
  checkout,
  review,
  order
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
