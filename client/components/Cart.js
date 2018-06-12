import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { me } from '../store'
import { deleteFromGuestCart, addToLocalStorageData } from '../store/cart'
import { updateUserCart } from '../store/user'

class Cart extends Component {
  componentDidMount = () => {
    const cartLocal = window.localStorage.getItem('cart')
    if (cartLocal && this.props.items.length === 0) {
      let items = JSON.parse(cartLocal)
      this.props.addToLocalStorageData(items)
    }
    if (this.props.isLoggedIn) {
      const updatedUser = {
        ...this.props.user,
        cart: JSON.stringify(this.props.items),
      }
      this.props.updateUserCart(updatedUser)
    }
  }

  handleDelete = async index => {
    await this.props.deleteFromGuestCart(index)
    if (this.props.isLoggedIn) {
      const updatedUser = {
        ...this.props.user,
        cart: JSON.stringify(this.props.items),
      }
      this.props.updateUserCart(updatedUser)
    }
  }

  render() {
    let cartTotal = 0
    let items = this.props.items
    return (
      <div className="container custom_cart-container">
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
                <span className="title bold">{item.name}</span>
                <p className="bold">${item.price}</p>
                <br />
                <p>{item.description}</p>
                <a
                  href="#!"
                  className="secondary-content"
                  onClick={() => this.handleDelete(index)}>
                  <i className="material-icons">delete</i>
                </a>
              </li>
            )
          })}
          {items.length > 0 ? (
            <li className="collection-item avatar blue-grey lighten-3">
              <h6>TOTAL PRICE:</h6>
              <h3>${cartTotal}</h3>
              <Link to="/cart/checkout" className="btn secondary-content">
                Checkout
              </Link>
            </li>
          ) : (
            <h2 className="center">NOTHING HERE, YOUR CART IS EMPTY!</h2>
          )}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    items: state.cart.items,
    user: state.user,
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  deleteFromGuestCart: index => dispatch(deleteFromGuestCart(index)),
  addToLocalStorageData: data => dispatch(addToLocalStorageData(data)),
  updateUserCart: user => dispatch(updateUserCart(user)),
})

export default connect(
  mapState,
  mapDispatch
)(Cart)
