import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <div className="container container__sign-in-form white z-depth-2 animated fadeIn">
      <div id="login" className="col s12">
        <form className="col s12" onSubmit={handleSubmit} name={name}>
          <div className="form-container">
            <h4 className="teal-text">Hello</h4>
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
            <br />
            <center>
              <button
                className="btn btn-small waves-effect waves-light teal"
                type="submit"
                name="action">
                Sign In
              </button>
              <br />
              <a href="/auth/google">
                <div className="btn_google">
                  <img src="/img/btn_google.svg" />
                  <p>Sign in with Google</p>
                </div>
              </a>
              <br />
              <a href="">Forgotten password?</a>
            </center>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
  }
}

export const Login = connect(
  mapLogin,
  mapDispatch
)(AuthForm)
export const Signup = connect(
  mapSignup,
  mapDispatch
)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
