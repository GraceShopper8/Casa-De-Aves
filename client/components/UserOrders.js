/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { me } from '../store';
import { getUsersOrders } from '../store/order';

class Orders extends Component {
  componentDidMount = () => {
    this.props.loadInitialData();
    this.props.getUsersOrders(this.props.userId);

    const elems = document.querySelectorAll('.collapsible');
    const instances = M.Collapsible.init(elems);
  };

  render() {
    const orders = this.props.userOrders;
    return (
      <div className="container custom_cart-container container--top-gutter">
        <ul className="collapsible grey lighten-4">
          {orders.length > 0 ? (
            <li className="center">
              <h2 className="teal-text ">THANKS FOR SHOPPING WITH US!</h2>
            </li>
          ) : (
            <li className="center">
              <h2 className="center teal-text">SORRY, DIDN'T FIND ANY PAST ORDERS</h2>
              <br/>
            </li>
          )}

          {orders.map((order, index) => {
            const cartItems = JSON.parse(order.cartContents);
            return (
              <li key={index}>
                <div className="collapsible-header row">
                  <p className="col s6 left-align">Order total: ${order.totalPrice}</p>
                  <p className="col s6 right-align">
                    {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                  </p>
                </div>
                <div className="collapsible-body">
                  <p className="bold">Ordered on: {order.createdAt.slice(0, 10)}</p>
                  {cartItems.map((item, i) => <p key={i}>{item.name}</p>)}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapState = state => {
  return {
    userOrders: state.order.usersOrders,
    userId: state.user.id,
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  getUsersOrders: userId => dispatch(getUsersOrders(userId))
});

export default connect(
  mapState,
  mapDispatch
)(Orders);
