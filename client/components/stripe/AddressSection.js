import React, { Component } from "react";
import { connect } from "react-redux";

import { updatedForm } from "../../store/checkout";

class AddressSection extends Component {
  handleChange = (ev) => {
    this.props.updatedForm({ [ev.target.name]: ev.target.value });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="input-field col s6">
            <input
              id="first_name"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={this.props.form.firstName}
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
              value={this.props.form.lastName}
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
              value={this.props.form.email}
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
              value={this.props.form.homeAddress}
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    form: state.checkout
  };
};

const mapDispatch = (dispatch) => ({
  updatedForm: (field) => dispatch(updatedForm(field))
});

export default connect(
  mapState,
  mapDispatch
)(AddressSection);
