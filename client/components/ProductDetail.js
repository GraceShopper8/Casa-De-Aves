/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleProducts } from '../store/product'

class ProductDetail extends Component {
  componentDidMount() {
    this.props.getSingleProducts(this.props.match.params.id)
  }

  render() {
    const product = this.props.singleProduct
    console.log('HERE IS PRODUCT:', product)
    return (
      <div className="row">
        <h1>{product.name}</h1>
        <img src={`/img/${product.imgUrl}`} />
        <p>${product.price}</p>
        <p>{product.description}</p>
      </div>
    )
  }
}

const mapState = state => ({
  singleProduct: state.product.singleProduct,
})

const mapDispatch = dispatch => ({
  getSingleProducts: id => dispatch(getSingleProducts(id)),
})

export default connect(
  mapState,
  mapDispatch
)(ProductDetail)
