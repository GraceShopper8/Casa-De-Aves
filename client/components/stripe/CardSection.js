import React from 'react';
import { CardElement } from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    var styles = {
      base: {
        color: '#303238',
        fontSize: '16px',
        color: "#32325d",
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#ccc',
        },
      },
      invalid: {
        color: '#e5424d',
        ':focus': {
          color: '#303238',
        },
      },
    };
    return (
      <CardElement style={styles} />
    );
  }
}

export default CardSection;