'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store/user';

class EditUser extends Component {

  constructor() {
    super();
    this.state = {
     firstName: ""
    };
  }

  componentDidMount() {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        homeAddress: this.props.user.homeAddress,
        email: this.props.user.email
      });

  }
  handleSubmit = (evt) => {
    evt.preventDefault();
  const password = evt.target.password.value
  let NU;
     if (password){
         NU = {
          id: this.props.user.id,
          firstName: evt.target.firstName.value,
          lastName: evt.target.lastName.value,
          homeAddress: evt.target.homeAddress.value,
          email: evt.target.email.value,
          password: evt.target.password.value
        };
     } else {
        NU = {
         id: this.props.user.id,
         firstName: evt.target.firstName.value,
         lastName: evt.target.lastName.value,
         homeAddress: evt.target.homeAddress.value,
         email: evt.target.email.value
        };
     }
    console.log("this is password", evt.target.password.value)
    console.log("this is lastName", evt.target.lastName.value)
    this.props.updateUser(NU);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (!this.props.user.firstName) {
      console.log("Loading...");
      return <h1>Loading...</h1>;
    }
    const disabled =
     this.state.email


    console.log("Userinfo", this.props.user)
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
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-field col s6">
                  <input
                    id="last_name"
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="homeAddress"
                    type="text"
                    name="homeAddress"
                    value={this.state.homeAddress}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
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
                <button
                 className="btn waves-effect waves-light teal"
                  type="submit"
                  disabled={!disabled}
                  name="action">
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
