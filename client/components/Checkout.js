import React, { Component } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import { connect } from 'react-redux'

import CheckoutForm from './stripe/CheckoutForm'

class Checkout extends Component {
  constructor() {
    super()
    this.state = { stripe: null }
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe('pk_test_T1EYDxHoDxrRIs4ntFf597Br'),
      })
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        this.setState({ stripe: window.Stripe('pk_test_T1EYDxHoDxrRIs4ntFf597Br') })
      })
    }
  }

  render() {
    const totalPrice = this.props.items.reduce((total, item) => {
      total += Number(item.price);
      return total;
    }, 0);
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <CheckoutForm totalPrice={totalPrice}/>
        </Elements>
      </StripeProvider>
    )
  }
}

const mapState = state => ({
  items: state.cart.items,
})

export default connect(mapState)(Checkout)
