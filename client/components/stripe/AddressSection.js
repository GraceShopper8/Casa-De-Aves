import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatedForm } from '../../store/checkout';

class AddressSection extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      homeAddress: '',
      email: '',
      isInfoLoaded: false,
    }
  }

  componentDidMount() {
    this.setState(this.props.user);
  }

  componentWillReceiveProps(nextProps){
    if(!this.state.isInfoLoaded){
      const { firstName, lastName, homeAddress, email } = nextProps.user;
      this.setState({ firstName, lastName, homeAddress, email, isInfoLoaded: true });
    }
  };

  handleChange = ev => {
    this.setState({[ev.target.name]: ev.target.value});
    this.props.updatedForm(this.state);
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
              placeholder="Last Name"
              value={this.state.lastName}
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
              value={this.state.email}
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
