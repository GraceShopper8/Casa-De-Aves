/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductCard from './ProductCard';
import { getAllProducts, filterProducts } from '../store/product';

class ProductList extends Component {
  async componentDidMount() {
    await this.props.getAllProducts();
    M.Dropdown.init(this.domNode);
  }

  handleDropDown = async event => {
    const category = event.target.name;

    if (category === 'All') {
      await this.props.getAllProducts();
    } else {
      await this.props.getAllProducts();
      this.props.getAllFilteredProducts(category);
    }
  };

  render() {
    const productsList = this.props.allProducts;

    return (
      <div className="row container">
        <div className="col s1" />
        <main className="col s10">
          <h2 className="float-header teal-text text-darken-3 center">
            All Products
          </h2>

          <a
            className="dropdown-trigger btn large"
            ref={domNode => {
              this.domNode = domNode;
            }}
            data-target="dropdown1">
            Filter <i className="material-icons right">arrow_drop_down</i>
          </a>

          <ul
            id="dropdown1"
            onClick={this.handleDropDown}
            className="dropdown-content">
            <li>
              <a name="StarterHome">Starter Home</a>
            </li>
            <li className="divider" tabIndex="-1" />
            <li>
              <a name="FamilyHome">Family Home</a>
            </li>
            <li className="divider" tabIndex="-1" />
            <li>
              <a name="MidlifeCrisisHome">MidlifeCrisis Home</a>
            </li>
            <li className="divider" tabIndex="-1" />
            <li>
              <a name="All">All</a>
            </li>
          </ul>

          <ul className="products-box animated fadeIn">
            {productsList.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </ul>
        </main>
      </div>
    );
  }
}

const mapState = state => ({
  allProducts: state.product.allProducts
});

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(getAllProducts()),
  getAllFilteredProducts: category => dispatch(filterProducts(category))
});

export default connect(mapState, mapDispatch)(ProductList);
