import React from "react";
import { injectStripe } from "react-stripe-elements";
import CardSection from "./CardSection";
import { connect } from 'react-redux';
import axios from 'axios';

class CheckoutForm extends React.Component {
  handleSubmit = (ev) => {
    ev.preventDefault();

    this.props.stripe.createToken({ name: "Jenny Rosen" })
      .then(({ token }) => {
        console.log("Received Stripe token:", token);
        return axios.post('/api/checkout', token);
      }).then((data) => {
        console.log('data from axios payment', data);
      });
  };

  render() {
    console.log('payment method props', this.props.state);
    return (
      <div className="container container__sign-in-form white z-depth-2">
        <div id="payment-form" className="col s12">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="form-container">
              <h4 className="teal-text">Card Payment</h4>
              <div className="row">
                <div className="input-field col s6">
                  <input id="first_name" type="text" name="firstName" placeholder="First Name" />
                </div>
                <div className="input-field col s6">
                  <input id="last_name" type="text" name="lastName" placeholder="Last Name" />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="homeAddress" type="text" name="homeAddress" placeholder="Address" />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <CardSection />
                </div>
              </div>
              <center>
                <button className="btn waves-effect waves-light teal" type="submit" name="action">
                  Confirm order
                </button>
              </center>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    state
  }
}

export default injectStripe(connect(mapState)(CheckoutForm));
