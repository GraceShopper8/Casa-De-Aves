import React, { Component } from "react";
import { StripeProvider } from "react-stripe-elements";
import { Elements } from "react-stripe-elements";

import InjectedCheckoutForm from "./stripe/CheckoutForm";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {stripe: null};
  }
  
  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: window.Stripe('pk_test_T1EYDxHoDxrRIs4ntFf597Br')});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe('pk_test_12345')});
      });
    }
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </StripeProvider>
    );
  }
}
export default Checkout;
