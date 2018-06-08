/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleProducts, updateProduct } from '../store/product';

class AdminEditForm extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
  }
  componentDidMount() {
    this.props.getSingleProducts(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.singleProduct.name,
      price: nextProps.singleProduct.price,
      description: nextProps.singleProduct.description
    });
  }

  onHandleSubmit = event => {
    event.preventDefault();
    const id = this.props.singleProduct.id;
    const name = event.target.name.value;
    const price = event.target.price.value;
    const description = event.target.description.value;
    const editObj = { id, name, description, price };
    this.props.sendToProductPutThunk(editObj);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (!this.props.singleProduct.name) {
      console.log('Loading...');
      return <h1>Loading...</h1>;
    }
    if (!this.state.name) {
      console.log('Loading...');
      return <h1>Loading...</h1>;
    }
    const product = this.props.singleProduct;

    return (
      <form
        className="container container--top-gutter"
        onSubmit={this.onHandleSubmit}>
        <div className="col s12 m7">
          <div className="card horizontal medium">
            <div className="card-image">
              <img src={`/img/${product.imgUrl}`} />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div className="custom__price">
                  <input
                    name="price"
                    type="text"
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </div>
                <textarea
                  id="product_form"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </div>
              <div className="card-action">
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action">
                  Edit
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapState = state => ({
  singleProduct: state.product.singleProduct
});

const mapDispatch = dispatch => ({
  getSingleProducts: id => dispatch(getSingleProducts(id)),
  sendToProductPutThunk: editObj => dispatch(updateProduct(editObj))
});

export default connect(mapState, mapDispatch)(AdminEditForm);
