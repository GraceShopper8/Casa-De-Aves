/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { me } from '../store'
import { getUsersOrders } from '../store/order'

class Orders extends Component {
  componentDidMount = () => {
    this.props.loadInitialData()
    this.props.getUsersOrders(this.props.userId)
  }

  render() {
    const orders = this.props.userOrders
    return (
      <div className="container">
        <ul className="collection col s6">
          {orders.length > 0 ? (
            <li className="center collection-item avatar blue-grey lighten-3">
              <h2>THANKS FOR SHOPPING WITH US!</h2>
            </li>
          ) : (
            <h2 className="center">SORRY, DIDN'T FIND ANY PAST ORDERS</h2>
          )}
          {orders.map((order, index) => {
            return (
              <li className="collection-item " key={index}>
                <div className="cart-display">
                  <h5 className="">
                    Ordered on: {order.createdAt.slice(0, 10)}
                  </h5>
                  <h5>Order Details [IN PROCESS]</h5>
                </div>
                <div className="cart-display">
                  <p className="bold">Order total: ${order.totalPrice}</p>
                  <p>{orders.length} Item(s)</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userOrders: state.order.usersOrders,
    userId: state.user.id,
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  getUsersOrders: userId => dispatch(getUsersOrders(userId)),
})

export default connect(
  mapState,
  mapDispatch
)(Orders)
