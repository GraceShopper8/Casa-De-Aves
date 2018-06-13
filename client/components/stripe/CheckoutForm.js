import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';
import AddressSection from './AddressSection';
import { connect } from 'react-redux';
import axios from 'axios';
import history from '../../history';
import { addNewOrder } from '../../store/order';
import { updatedResponse } from '../../store/checkout';
import { postedOrder } from '../../store/receipt';

class CheckoutForm extends React.Component {
  constructor() {
    super();
    this.state = {
      submitButtonDisabled: true
    };
  }

  handleCardInput = val => {
    if (val) {
      this.setState({
        submitButtonDisabled: false
      });
    }
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const button = document.querySelector('.progress');
    const paymentButton = document.getElementById('payment_btn');

    button.classList.remove('custom_hidden');
    paymentButton.classList.add('disabled');

    const { firstName, lastName, homeAddress, email } = this.props.form;

    this.props.stripe
      .createToken({ name: `${firstName} ${lastName}` })
      .then(({ token }) => {
        return axios.post('/api/checkout', {
          token: token.id,
          amount: this.props.totalPrice,
          email
        });
      })
      .then(response => {
        if (response.status === 200) {
          this.props.updatedResponse(response);
          const { items, totalPrice, user } = this.props;
          const orderBody = {
            cartContents: JSON.stringify(items),
            shippingAddress: homeAddress,
            totalPrice: totalPrice,
            userId: user.id || null
          };
          return axios.post('/api/orders', orderBody);
        }
      })
      .then(response => {
        const { data } = response;
        this.props.postedOrder(data);
        history.push('/receipt');
      });
  };

  render() {
    const items = this.props.items;
    const totalPrice = this.props.totalPrice;

    return (
      <div className="container container__sign-in-form white z-depth-2 animated fadeIn">
        <div id="payment-form" className="col s12">
          <form className="col s12 container__form" onSubmit={this.handleSubmit}>
            <div className="form-container">
              <h4 className="teal-text">Payment</h4>
              <h6 className="teal-text">Order details</h6>
              <div className="row custom_table-body">
                <div className="input-field col s12">
                  <table>
                    <tbody>
                      {items.map((item, i) => (
                        <tr className="custom_table-row" key={i}>
                          <td>{item.name}</td>
                          <td>${item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tbody>
                      <tr className="custom_total-price">
                        <td>TOTAL</td>
                        <td>${totalPrice}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <h6 className="teal-text">Customer details</h6>
              <AddressSection />
              <h6 className="teal-text">Card details</h6>

              <div className="row">
                <div className="input-field col s12">
                  <CardSection handleCardInput={this.handleCardInput} />
                </div>
              </div>
              <center>
                <button
                  id="payment_btn"
                  className="btn waves-effect waves-light teal"
                  type="submit"
                  name="action"
                  disabled={this.state.submitButtonDisabled || totalPrice === 0}
                >
                  Submit order
                </button>
              </center>
            </div>
            <div className="progress custom_hidden">
              <div className="indeterminate" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    items: state.cart.items,
    form: state.checkout,
    user: state.user
  };
};

const mapDispatch = dispatch => ({
  addNewOrder: order => dispatch(addNewOrder(order)),
  updatedResponse: response => dispatch(updatedResponse(response)),
  postedOrder: data => dispatch(postedOrder(data))
});

export default injectStripe(
  connect(
    mapState,
    mapDispatch
  )(CheckoutForm)
);
