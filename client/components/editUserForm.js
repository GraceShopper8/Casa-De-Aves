'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store/user';

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
<<<<<<< HEAD
=======
      lastName: '',
      homeAddress: '',
>>>>>>> c0eb5f663662d05e0af1ccb3461a43245503e5b7
      email: ''
    };
  }
  componentDidMount() {
    const { firstName, lastName, email, homeAddress } = this.props.user;
    this.setState({ firstName, lastName, email, homeAddress })
  }

<<<<<<< HEAD
  UNSAFE_componentWillReceiveProps(nextProps) {
=======
  componentWillReceiveProps(nextProps) {
>>>>>>> c0eb5f663662d05e0af1ccb3461a43245503e5b7
    this.setState({
      firstName: nextProps.user.firstName,
      lastName: nextProps.user.lastName,
      homeAddress: nextProps.user.homeAddress,
      email: nextProps.user.email
    });
<<<<<<< HEAD


=======
>>>>>>> c0eb5f663662d05e0af1ccb3461a43245503e5b7
  }
  
  handleSubmit = evt => {
    evt.preventDefault();
<<<<<<< HEAD
    const password = evt.target.password.value
=======
    const password = evt.target.password.value;
>>>>>>> c0eb5f663662d05e0af1ccb3461a43245503e5b7
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
<<<<<<< HEAD
=======

>>>>>>> c0eb5f663662d05e0af1ccb3461a43245503e5b7
    this.props.updateUser(NU);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (!this.props.user) {
<<<<<<< HEAD
      return <h1>Loading...</h1>;
    }
    const disabled = this.state.email
=======
      console.log('Loading...');
      return <h1>Loading...</h1>;
    }
    console.log('this.props.user', this.props.user);
    console.log('this.state', this.state);
    const disabled = this.state.email;

>>>>>>> c0eb5f663662d05e0af1ccb3461a43245503e5b7
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
                    required
                  />
                </div>
                <div className="input-field col s6">
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
<<<<<<< HEAD
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
=======
                  <input id="email" type="email" name="email" value={this.state.email} onChange={this.handleChange} />
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
                    required
                    minLength="8"
                  />
                </div>
              </div>
              <center>
                <button
                  className="btn waves-effect waves-light teal"
                  type="submit"
                  disabled={!disabled}
                  name="action">
=======
                  <input id="password" type="password" name="password" placeholder="Password" />
                </div>
              </div>
              <center>
                <button className="btn waves-effect waves-light teal" type="submit" disabled={!disabled} name="action">
>>>>>>> c0eb5f663662d05e0af1ccb3461a43245503e5b7
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

const mapDispatch = dispatch => ({
  updateUser: user => dispatch(updateUser(user))
});

export default connect(
  stateToProps,
  mapDispatch
)(EditUser);
