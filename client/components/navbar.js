import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser, logout } from '../store'
import { deleteFromGuestCart, addToLocalStorageData } from '../store/cart'

class Navbar extends Component {
  componentDidMount() {
    const cartLocal = window.localStorage.getItem('cart')
    if (cartLocal && this.props.items.length === 0) {
      let items = JSON.parse(cartLocal)
      this.props.addToLocalStorageData(items)
    }

    document.addEventListener('DOMContentLoaded', function() {
      const sideNav = document.querySelectorAll('.sidenav')
      M.Sidenav.init(sideNav, { edge: 'right' })
    })

    setTimeout(() => {
      const dropDown = document.querySelectorAll('.dropdown-trigger')
      M.Dropdown.init(dropDown)
    }, 100)
  }

  handleDropDown = () => {
    const dropDown = document.querySelectorAll('.dropdown-trigger')
    M.Dropdown.init(dropDown)
  }

  render() {
    let cartTotal = 0
    const {
      handleClick,
      isLoggedIn,
      handleDeleteItem,
      loggedInUser,
      items,
      handleDeleteAccount,
    } = this.props
    return (
      <div>
        <nav id="nav-bar" className="teal" role="navigation">
          <div className="nav-wrapper container">
            <a href="/" className="brand-logo left">
              <img
                src="/img/5935-200 white-version.png"
                className="nav-bar-logo"
              />
            </a>

            <ul className="left">
              <li> |</li>
              <li>
                <Link to="/products" className="white-text">
                  Products
                </Link>
              </li>
            </ul>
            {isLoggedIn ? (
              <ul className="right">
                <li>
                  <a
                    className="dropdown-trigger"
                    data-target="dropdownLogin"
                    onMouseEnter={this.handleDropDown}>
                    My Account
                    <i className="material-icons right">arrow_drop_down</i>
                  </a>
                </li>
                <li>
                  <a data-target="slide-out" className="sidenav-trigger custom_a">
                    <span className="custom_badge">3</span>
                    <i className="material-icons">shopping_cart</i>
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="right">
                <li>
                  <Link to="/signup" className="white-text">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="white-text">
                    Log In
                  </Link>
                </li>
                <li className="custom_li">
                  <a data-target="slide-out" className="sidenav-trigger custom_a">
                    <span id="cartBadge" className="custom_badge animated">{(items.length > 0) ? items.length : ''}</span>
                    <i className="material-icons">shopping_cart</i>
                  </a>
                </li>
              </ul>
            )}
          </div>
        </nav>
        {/* Dropdown menu for My account*/}
        <ul id="dropdownLogin" className="dropdown-content">
          <li>
            <a href={`/orders/${this.props.loggedInUser.id}`}>My Orders</a>
          </li>
          <li className="divider" />
          <li>
            <a href={`/${loggedInUser.id}/edit`}>Edit Account</a>
          </li>
          <li className="divider" />
          <li>
            <a href="#" onClick={() => handleDeleteAccount(loggedInUser.id)}>
              Delete Account
            </a>
          </li>
          <li className="divider" />
          <li>
            <a href="#" onClick={handleClick}>
              Log Out
            </a>
          </li>
        </ul>
        {/* Slideout menu for My cart*/}
        <ul id="slide-out" className="sidenav">
          {isLoggedIn ? (
            <li>
              <div className="user-view">
                <a href="#name">
                  <span className="name">
                    {`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                  </span>
                </a>
                <a href="#email">
                  <span className="email">{loggedInUser.email}</span>
                </a>
              </div>
            </li>
          ) : (
            ''
          )}
          <li>
            <a>
              <i className="material-icons">shopping_cart</i>Your Shopping Cart
            </a>
          </li>
          <li>
            <div className="divider" />
          </li>

          {items.map((item, index) => {
            cartTotal += Number(item.price)
            return (
              <li className="custom_cart-sidebar" key={index}>
                <a className="custom_anchor">
                  {item.name} ${item.price}
                  <i
                    className="material-icons custom_delete-btn"
                    onClick={() => handleDeleteItem(index)}>
                    delete
                  </i>
                </a>
              </li>
            )
          })}
          <li>
            <a className="custom__price">Total ${cartTotal} </a>
          </li>
          <li>
            <div className="divider" />
          </li>
          <li>
            <a className="waves-effect" href="/cart">
              <span className="teal-text custom__btn-text">SHOW MORE</span>
            </a>
          </li>

          <li>
            <a className="waves-effect" href="/cart/checkout">
              <span className="teal-text custom__btn-text">CHECKOUT</span>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    loggedInUser: state.user,
    items: state.cart.items,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    handleDeleteAccount(evt) {
      dispatch(deleteUser(evt))
    },
    handleDeleteItem(index) {
      dispatch(deleteFromGuestCart(index))
    },
    addToLocalStorageData: data => dispatch(addToLocalStorageData(data)),
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
