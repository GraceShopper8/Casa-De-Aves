import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatedForm } from '../../store/checkout';

class AddressSection extends Component {
  componentDidMount() {
    // ! DOESNT WORK
    // initially component will mount with empty USER
    const { user, updatedForm } = this.props;
    if (user.firstName) {
      updatedForm({ firstName: user.firstName });
    } else if (user.lastName) {
      updatedForm({ lastName: user.lastName });
    } else if (user.homeAddress) {
      updatedForm({ homeAddress: user.homeAddress });
    } else if (user.email) {
      updatedForm({ email: user.email });
    }
  }

  handleChange = ev => {
    this.props.updatedForm({ [ev.target.name]: ev.target.value });
  };

  render() {
    const { form } = this.props;
    return (
      <div>
        <div className="row">
          <div className="input-field col s6">
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
          <div className="input-field col s6">
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
              name="homeAddress"
              placeholder="Shipping address"
              value={form.homeAddress}
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
