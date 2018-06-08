/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleProducts } from '../store/product'
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
    this.props.getCartItems(itemID)
  }

  render() {
    const product = this.props.singleProduct
    const isAdmin = this.props.user.admin
    return (
      <div className="row container container--top-gutter animated fadeIn">
        <div className="col s1" />
        <div className="col s10">
          <div className="card horizontal medium">
            <div className="card-image">
              <img src={`/img/${product.imgUrl}`} />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <h5>{product.name}</h5>
                <p className="custom__price">${product.price}</p>
                <p className="custom__description">{product.description}</p>
              </div>
              <div className="card-action">
                <a className="waves-effect waves-light btn-small">
                  <i className="material-icons left">add_shopping_cart</i>Add to
                  Cart
                </a>
                <a
                  href="/cart/checkout"
                  className="waves-effect waves-light btn-small">
                  Checkout
                </a>
                {isAdmin ? (
                  <Link to={`/products/${product.id}/edit`}>
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      name="action">
                      Edit<i className="material-icons right">send</i>
                    </button>
                  </Link>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
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
  getCartItems: id => dispatch(addedToCart(id)),
})

export default connect(
  mapState,
  mapDispatch
)(ProductDetail)
