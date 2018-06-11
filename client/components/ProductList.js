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
          <a className='dropdown-trigger btn large' href='#' data-target='dropdown1'>Filter
          <i className="material-icons right">arrow_drop_down</i></a>


          <ul id='dropdown1' className='dropdown-content'>
            <li><a>Starter Home</a></li>
            <li className="divider" tabIndex="-1"></li>
            <li><a>Family Home</a></li>
            <li className="divider" tabIndex="-1"></li>
            <li><a>Midlife Crisis Home</a></li>
            <li className="divider" tabIndex="-1"></li>
            <li><a>All</a></li>

          </ul>

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
