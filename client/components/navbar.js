import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="navbar-fixed">
    <nav id="nav-bar" className="teal" role="navigation">
      <div className="nav-wrapper container">
        <ul className="left hide-on-med-and-down">
          <li>
            <Link to="/" className="white-text">
              <i id="home-icon" className="material-icons">
                home
              </i>
            </Link>
          </li>
          <li>
            <Link to="/products" className="white-text">
              Products
            </Link>
          </li>
        </ul>
        <ul className="right hide-on-med-and-down">
          {!isLoggedIn ? (
            <React.Fragment>
              <li>
                <Link to="/signup" className="white-text">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/users/login" className="white-text">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/cart" className="white-text">
                  <i className="material-icons">shopping_cart</i>
                </Link>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <a href="#" onClick={handleClick} className="white-text">
                  Log Out
                </a>
              </li>
              <li>
                <Link to="/users" className="white-text">
                  <i className="material-icons">shopping_cart</i>
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(
  mapState,
  mapDispatch
)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
