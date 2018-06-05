/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProductCard extends Component {
  render() {
    const product = this.props.product
    return (
      <li className="side-by-side">
        <div className="row">
          <div className="col s12 m6">
            <div className="card">
              <div className="card-image">
                <img src={`/img/${product.imgUrl}`} />
                <a className="btn-floating btn-large halfway-fab waves-effect waves-light teal">
                  <i className="material-icons">add_shopping_cart</i>
                </a>
              </div>
              <div className="card-content">
                <h5>{product.name}</h5>
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

export default ProductCard
