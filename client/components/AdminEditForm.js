/* eslint-disable react/prefer-stateless-function ,react/no-deprecated */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleProducts, updateProduct } from '../store/product'

class AdminEditForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
    }
  }
  componentDidMount() {
    this.props.getSingleProducts(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.singleProduct.name,
      price: nextProps.singleProduct.price,
      inventory: nextProps.singleProduct.inventory,
      description: nextProps.singleProduct.description,
    })
  }

  onHandleSubmit = event => {
    event.preventDefault()
    const id = this.props.singleProduct.id
    const name = event.target.name.value
    const price = event.target.price.value
    const inventory = event.target.inventory.value
    const description = event.target.description.value
    const editObj = { id, name, inventory, description, price }
    this.props.sendToProductPutThunk(editObj)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    if (!this.props.singleProduct.name || !this.state.name) {
      return <h1>Loading...</h1>
    }
    const product = this.props.singleProduct

    return (
      <form
        className="container container--top-gutter"
        onSubmit={this.onHandleSubmit}>
        <div className="col s12 m7">
          <div className="card horizontal medium">
            <div className="card-image">
              <img
                src={`/img/${product.imgUrl}`}
                className="custom__image-size"
              />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div>
                  <input
                    name="price"
                    type="text"
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <input
                    name="inventory"
                    type="text"
                    value={this.state.inventory}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field col s12">
                  <textarea
                    id="product_form"
                    name="description"
                    className="materialize-textarea"
                    data-length="120"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="card-action">
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

const mapState = state => ({
  singleProduct: state.product.singleProduct,
})

const mapDispatch = dispatch => ({
  getSingleProducts: id => dispatch(getSingleProducts(id)),
  sendToProductPutThunk: editObj => dispatch(updateProduct(editObj)),
})

export default connect(
  mapState,
  mapDispatch
)(AdminEditForm)
