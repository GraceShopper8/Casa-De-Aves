/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleProducts } from '../store/product'
import UserReviewForm from './UserReviewForm'
import { addedToCart } from '../store/cart'
import { Link } from 'react-router-dom'

class ProductDetail extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProducts(this.props.match.params.id)
  }

  handleClick(itemID) {
    this.props.addedToCart(itemID)
    setTimeout(() => {
      let storage = window.localStorage
      const cartItems = this.props.items
      const str = JSON.stringify(cartItems)
      storage.setItem('cart', str)
    }, 50)
  }

  render() {
    const product = this.props.singleProduct
    const prodReviews = product.reviews
    if (!prodReviews) {
      return <h1>""</h1>
    }

    const isAdmin = this.props.user.admin
    return (
      <div className="row container container--top-gutter animated fadeIn">
        <div className="col s11 l1" />
        <div className="col s12 m12 l10">
          <div className="card">
            <div className="card-image">
              <img src={`/img/${product.imgUrl}`} />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <h5>
                  {product.name}
                  {isAdmin ? (
                    <a
                      href={`/products/${product.id}/edit`}
                      className="btn-floating btn-small right red">
                      <i className="material-icons">edit</i>
                    </a>
                  ) : (
                    ''
                  )}
                </h5>
                <p className="custom__price">${product.price}</p>
                <p className="custom__description">{product.description}</p>
              </div>
              <div className="card-action">
                <a
                  className="waves-effect waves-light btn-small"
                  onClick={() => this.handleClick(product.id)}>
                  <i className="material-icons left">add_shopping_cart</i>
                  Add to Cart
                </a>
                <a
                  href="/cart/checkout"
                  className="waves-effect waves-light btn-small">
                  Checkout
                </a>
              </div>
            </div>
          </div>
          <UserReviewForm prodId={product.id} />
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  singleProduct: state.product.singleProduct,
  user: state.user,
})

const mapDispatch = dispatch => ({
  getSingleProducts: id => dispatch(getSingleProducts(id)),
  addedToCart: id => dispatch(addedToCart(id)),
})

export default connect(
  mapState,
  mapDispatch
)(ProductDetail)
