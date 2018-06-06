/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { deleteFromGuestCart } from '../store/cart'

class Cart extends Component {
  handleDelete = index => {
    this.props.deleteFromGuestCart(index)
  }

  render() {
    let cartTotal = 0
    const items = this.props.items
    console.log(items)
    return (
      <div className=" container">
        <ul className="collection col s6">
          {items.map((item, index) => {
            cartTotal += Number(item.price)
            return (
              <li className="collection-item avatar" key={index}>
                <img
                  src={`img/${item.imgUrl}`}
                  alt={item.name}
                  className="circle"
                />
                <span className="title">{item.name}</span>
                <p>${item.price}</p>
                <p>{item.description}</p>
                <a href="#!" className="secondary-content">
                  <i
                    className="material-icons"
                    onClick={() => this.handleDelete(index)}>
                    delete
                  </i>
                </a>
              </li>
            )
          })}
          <li className="collection-item avatar blue-grey lighten-3">
            <span className="title">TOTAL PRICE:</span>
            <p>${cartTotal}</p>
            <a href="#" className="btn-small secondary-content">
              Checkout
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    items: state.cart.items,
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = dispatch => ({
  deleteFromGuestCart: index => dispatch(deleteFromGuestCart(index)),
})

export default connect(
  mapState,
  mapDispatch
)(Cart)
