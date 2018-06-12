/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProductCard from './ProductCard'
import { getAllProducts, filterProducts } from '../store/product'

class ProductList extends Component {
  async componentDidMount() {
    await this.props.getAllProducts()
  }

  handleClick = (event) => {
    event.preventDefault()
    const category = event.target.name
    this.props.getAllFilteredProducts(category)

  }

  render() {
    const productsList = this.props.allProducts

    return (
      <div className="row container">
        <div className="col s1" />
        <main className="col s10">
          <h2 className="float-header teal-text text-darken-3 center">
            All Products
          </h2>
           <ul className="products-box animated fadeIn">
            {productsList.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
           </ul>
        </main>
      </div>
    )
  }
}

const mapState = state => ({
  allProducts: state.product.allProducts,
})

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(getAllProducts()),
  getAllFilteredProducts: (category) => dispatch(filterProducts(category)),
})

export default connect(
  mapState,
  mapDispatch
)(ProductList)
