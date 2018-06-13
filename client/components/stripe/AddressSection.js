import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatedForm } from '../../store/checkout';

class AddressSection extends Component {
  constructor() {
    super();
    this.state = {
      isInfoLoaded: false,
    }
  }

  componentWillReceiveProps(nextProps){
    if(!this.state.isInfoLoaded){
      const { firstName, lastName, homeAddress, email } = nextProps.user;
      this.props.updatedForm({ firstName, lastName, shippingAddress: homeAddress || '', email });
      this.setState({isInfoLoaded: true})
    }
  };

  handleChange = ev => {
    this.props.updatedForm({[ev.target.name]: ev.target.value});
  };

  render() {
    const { form } = this.props;
    return (
      <div>
        <div className="row">
          <div className="input-field col s12 m6 l6">
            <input
              id="first_name"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field col s12 m6 l6">
            <input
              id="last_name"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="email"
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="homeAddress"
              type="text"
              name="shippingAddress"
              placeholder="Shipping address"
              value={form.shippingAddress}
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    form: state.checkout,
    user: state.user
  };
};

const mapDispatch = dispatch => ({
  updatedForm: field => dispatch(updatedForm(field))
});

export default connect(
  mapState,
  mapDispatch
)(AddressSection);
