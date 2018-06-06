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
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="New User Form">
                    First Name
                </label>
                <input type="text" name="firstName" value={this.props.user.firstName}  />
                <label htmlFor="New User Form">
                    Last Name
                </label>
                <input type="text" name="lastName" value={this.props.user.lastName} />
                <label htmlFor="New User Form">
                    Address
                </label>
                <input type="text" name="homeAddress" value={this.props.user.homeAddress} />
                <label htmlFor="New User Form">
                    email
                </label>
                <input type="text" name="email" value={this.props.user.email} />
                <label htmlFor="New User Form">
                    Password
                </label>
                <input type="text" name="password" value={this.props.user.password} />
                <button type="submit">
                    Add User
                </button>
            </form>
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

