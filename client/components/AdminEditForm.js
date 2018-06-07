/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleProducts, updateProduct} from '../store/product';

class AdminEditForm extends Component {


 componentDidMount() {
  this.props.getSingleProducts(this.props.match.params.id)
 }

 onHandleSubmit = event => {
    event.preventDefault();
    const id = this.props.id
    const name = event.target.name.value;
    const price = event.target.price.value;
    const description = event.target.description.value;

    const editObj = { id, name, description, price };
    this.props.sendToProductPutThunk(editObj)


  };

  render() {
     const product = this.props.singleProduct;
            return (
              <form className="container container--top-gutter" onSubmit={this.onHandleSubmit}>
                <div className="col s12 m7">
                  <div className="card horizontal medium">
                    <div className="card-image">
                      <img src={`/img/${product.imgUrl}`} />
                    </div>
                    <div className="card-stacked">
                      <div className="card-content">
                        <input name="name" type="text" placeholder={product.name} />
                        <div className="custom__price"><input name="price" type="text" placeholder={product.price} /></div>
                          <textarea id="product_form" name="description" placeholder={product.description}  />
                      </div>
                      <div className="card-action">
                      <button className="btn waves-effect waves-light" type="submit" name="action">Edit
                        <i className="material-icons right">send</i>
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )

  }
}

const mapState = (state) => ({
  singleProduct: state.product.singleProduct
});

const mapDispatch = (dispatch) => ({
  getSingleProducts: (id) => dispatch(getSingleProducts(id)),
  sendToProductPutThunk: (editObj) => dispatch(updateProduct(editObj))
})

export default connect(
  mapState,
  mapDispatch
)(AdminEditForm)
