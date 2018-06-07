/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleProducts } from '../store/product'
import { addedToCart } from '../store/cart'

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
    console.log('HERE IS PRODUCT:', product)
    return (
      <div className="container container--top-gutter">
        <div className="col s12 m7">
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
                <a className="waves-effect waves-light btn-flat btn-small">
                  <i className="material-icons left">add_shopping_cart</i>Add to
                  Cart
                </a>
                <a className="waves-effect waves-light btn-flat btn-small">
                  Checkout
                </a>
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
})

const mapDispatch = dispatch => ({
  getSingleProducts: id => dispatch(getSingleProducts(id)),
  getCartItems: id => dispatch(addedToCart(id)),
})

export default connect(
  mapState,
  mapDispatch
)(ProductDetail)
