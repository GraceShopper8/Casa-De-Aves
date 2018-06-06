/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { addedToCart } from '../store/cart'

class ProductCard extends Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(itemID) {
    console.log('ITEM ID', itemID)
    this.props.getCartItems(itemID)
  }

  render() {
    const product = this.props.product
    return (
      <li className="side-by-side">
        <div className="row">
          <div className="col s12 m6">
            <div className="card">
              <div className="card-image">
                <Link to={`/products/${product.id}`}>
                  <img src={`/img/${product.imgUrl}`} />
                </Link>
                <a className="btn-floating btn-large halfway-fab waves-effect waves-light teal">
                  <i
                    className="material-icons"
                    onClick={() => this.handleClick(product.id)}>
                    add_shopping_cart
                  </i>
                </a>
              </div>
              <div className="card-content">
                <Link to={`/products/${product.id}`}>
                  <h5 className="black-text">{product.name}</h5>
                </Link>
                <p>${product.price}</p>
              </div>
              <div className="card-action center">
                <Link to={`/products/${product.id}`}>More Detail</Link>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

const mapState = state => {
  return {
    items: state.cart.items,
  }
}

const mapDispatch = dispatch => {
  return {
    getCartItems: id => dispatch(addedToCart(id)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(ProductCard)
