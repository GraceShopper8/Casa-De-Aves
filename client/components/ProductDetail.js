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
    console.log('ITEM ID', itemID)
    this.props.getCartItems(itemID)
  }

  render() {
    const product = this.props.singleProduct
    console.log('HERE IS PRODUCT:', product)
    return (
      <div className="row container detail-container">
        <div className="col s1" />
        <img src={`/img/${product.imgUrl}`} className="col s4 detail-img" />
        <div className="col s6">
          <h2>{product.name}</h2>
          <h5>${product.price}</h5>
          <p>{product.description}</p>
        </div>
        <a className="btn-large waves-effect waves-light teal">
          <i
            className="material-icons"
            onClick={() => this.handleClick(product.id)}>
            add_shopping_cart
          </i>
        </a>
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
