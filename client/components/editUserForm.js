'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store/user';

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      homeAddress: '',
      email: ''
    };
  }
  componentDidMount() {
    const { firstName, lastName, email, homeAddress } = this.props.user;
    this.setState({ firstName, lastName, email, homeAddress })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      firstName: nextProps.user.firstName,
      lastName: nextProps.user.lastName,
      homeAddress: nextProps.user.homeAddress,
      email: nextProps.user.email
    });
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const password = evt.target.password.value
    let NU;
    if (password) {
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
    this.props.updateUser(NU);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {error} = this.props
    if (!this.props.user) {
      return <h1>Loading...</h1>;
    }
    const disabled = this.state.email
    return (
      <div className="container container__sign-in-form white z-depth-2">
        <div id="register" className="col s12">
          <form className="col s12 container__form" onSubmit={this.handleSubmit}>
            <div className="form-container">
              <h4 className="teal-text">Edit your info</h4>
              <div className="row">
                <div className="input-field col s12 m6 l6">
                  <input
                    id="first_name"
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="input-field col s12 m6 l6">
                  <input
                    id="last_name"
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
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
                    required
                    minLength="8"
                  />
                </div>
              </div>
              {error &&
              (<div className="error-container">{error.response.data}</div>)
              }
              <center>
                <button
                  className="btn custom_btn waves-effect waves-light teal"
                  type="submit"
                  disabled={!disabled}
                  name="action">
                  Save
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

const mapDispatch = dispatch => ({
  updateUser: user => dispatch(updateUser(user))
});

export default connect(
  stateToProps,
  mapDispatch
)(EditUser);
