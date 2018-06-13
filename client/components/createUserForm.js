'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddUser } from '../store/user';

class CreateUser extends Component {
  handleSubmit = evt => {
    evt.preventDefault();
    const NU = {
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      homeAddress: evt.target.homeAddress.value,
      email: evt.target.email.value,
      password: evt.target.password.value
    };
    this.props.newUser(NU);
  };
  render() {
   const {error} = this.props
    return (
      <div className="container container__sign-in-form white z-depth-2 animated fadeIn">
        <div id="register" className="col s12">
          <form className="col s12 container__form" onSubmit={this.handleSubmit}>
            <div className="form-container">
              <h4 className="teal-text">Welcome</h4>
              <div className="row">
                <div className="input-field col s12 m6 l6">
                  <input
                    id="first_name"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="input-field col s12 m6 l6">
                  <input
                    id="last_name"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="homeAddress" type="text" name="homeAddress" placeholder="Address" />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
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
                    required minLength="8"
                  />
                </div>
              </div>
              {error &&
              (<div className="error-container">{error.response.data}</div>)
              }
              <center>
                <button className="btn custom_btn waves-effect waves-light teal" type="submit" name="action">
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

const stateToProps = state => ({
  user: state.user,
  error: state.user.error,
});

const MapToProps = dispatch => ({
  newUser: user => dispatch(AddUser(user))
});

export default connect(
  stateToProps,
  MapToProps
)(CreateUser);
