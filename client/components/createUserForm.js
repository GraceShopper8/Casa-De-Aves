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
    return (
      <div className="container container__sign-in-form white z-depth-2 animated fadeIn">
        <div id="register" className="col s12">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="form-container">
              <h4 className="teal-text">Welcome</h4>
              <div className="row">
                <div className="input-field col s6">
<<<<<<< HEAD
                  <input
                    id="first_name"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="input-field col s6">
                  <input
                    id="last_name"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                  />
=======
                  <input id="first_name" type="text" name="firstName" placeholder="First Name" />
                </div>
                <div className="input-field col s6">
                  <input id="last_name" type="text" name="lastName" placeholder="Last Name" />
>>>>>>> c0eb5f663662d05e0af1ccb3461a43245503e5b7
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="homeAddress" type="text" name="homeAddress" placeholder="Address" />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
<<<<<<< HEAD
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
=======
                  <input id="email" type="email" name="email" placeholder="Email" />
>>>>>>> c0eb5f663662d05e0af1ccb3461a43245503e5b7
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
<<<<<<< HEAD
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required minLength="8"
                  />
=======
                  <input id="password" type="password" name="password" placeholder="Password" />
>>>>>>> c0eb5f663662d05e0af1ccb3461a43245503e5b7
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

const stateToProps = state => ({
  user: state.user
});

const MapToProps = dispatch => ({
  newUser: user => dispatch(AddUser(user))
});

export default connect(
  stateToProps,
  MapToProps
)(CreateUser);
