'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store/user';

class EditUser extends Component {
  handleSubmit = (evt) => {
    evt.preventDefault();
    const NU = {
        id: this.props.user.id,
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      homeAddress: evt.target.homeAddress.value,
      email: evt.target.email.value,
      password: evt.target.password.value
    };
    this.props.updateUser(NU);
  };
  render() {
    return (
      <div className="container container__sign-in-form white z-depth-2">
        <div id="register" className="col s12">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="form-container">
              <h4 className="teal-text">Update</h4>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="first_name"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                  />
                </div>
                <div className="input-field col s6">
                  <input
                    id="last_name"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="homeAddress"
                    type="text"
                    name="homeAddress"
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <center>
                <button className="btn waves-effect waves-light teal" type="submit" name="action">
                  Submit
                </button>
              </center>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const stateToProps = (state) => ({
  user: state.user
});

const MapToProps = (dispatch) => ({
  updateUser: (user) => dispatch(updateUser(user))
});

export default connect(
  stateToProps,
  MapToProps
)(EditUser);
