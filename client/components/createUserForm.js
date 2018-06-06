'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddUser } from '../store/user';

class CreateUser extends Component{
    handleSubmit= (evt) => {
        evt.preventDefault();
        const NU = {
            firstName: evt.target.firstName.value,
            lastName: evt.target.lastName.value,
            homeAddress: evt.target.homeAddress.value,
            email: evt.target.email.value,
            password: evt.target.password.value
        }
        this.props.newUser(NU)
    }
    render(){
        return (
            <div id="register" className="col s12">
            <center>
            <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="form-container">
                <h3 className="teal-text">Welcome</h3>
              <div className="row">
                <div className="input-field col s6">
                  <input id="first_name" type="text" className="validate" name="firstName" value={this.props.user.firstName} />
                  <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field col s6">
                  <input id="last_name" type="text" className="validate" name="lastName" value={this.props.user.lastName} />
                  <label htmlFor="last_name">Last Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="homeAddress" type="text" className="validate" name="homeAddress" value={this.props.user.homeAddress} />
                  <label htmlFor="homeAddress">Address</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="password" type="password" className="validate"  name="password" value={this.props.user.password} />
                  <label htmlFor="password">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="email" type="email" className="validate"  name="email" value={this.props.user.email} />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <center>
                <button className="btn waves-effect waves-light teal" type="submit" name="action">Submit</button>
              </center>
            </div>
            </form>
            </center>
            </div>


            // <form onSubmit={this.handleSubmit}>
            //     <label htmlFor="New User Form">
            //         First Name
            //     </label>
            //     <input type="text" name="firstName" value={this.props.user.firstName}  />
            //     <label htmlFor="New User Form">
            //         Last Name
            //     </label>
            //     <input type="text" name="lastName" value={this.props.user.lastName} />
            //     <label htmlFor="New User Form">
            //         Address
            //     </label>
            //     <input type="text" name="homeAddress" value={this.props.user.homeAddress} />
            //     <label htmlFor="New User Form">
            //         email
            //     </label>
            //     <input type="text" name="email" value={this.props.user.email} />
            //     <label htmlFor="New User Form">
            //         Password
            //     </label>
            //     <input type="text" name="password" value={this.props.user.password} />
            //     <button type="submit">
            //         Add User
            //     </button>
            // </form>
        )
    }
}

const stateToProps = (state) => ({
    user: state.user
});

const MapToProps = (dispatch) => ({
    newUser: (user) => dispatch(AddUser(user))
});

export default connect(stateToProps, MapToProps)(CreateUser)

