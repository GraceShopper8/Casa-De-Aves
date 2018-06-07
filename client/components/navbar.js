import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser, logout } from '../store'
import { deleteFromGuestCart } from '../store/cart'

class Navbar extends Component{
// = ({ handleClick, isLoggedIn, handleDelete, userId }) => (
 constructor(){
   super()
   this.state = {isOpen: false, isOpened: false}
 }
  clicker = () => {
    this.setState((state) => ({isOpened: !state.isOpened}))
  }
  cartClicker = () => {
    this.setState((state) => ({isOpen: !state.isOpen}))
  }
  render(){
    var cartTotal = 0;
    const { handleClick, isLoggedIn, handleDeleteItem, userId, items, handleDeleteAccount } = this.props
    console.log('ITEMS IN CART: ', items)
   return (<div className="navbar-fixed">
    <nav id="nav-bar" className="teal" role="navigation">
      <div className="nav-wrapper container">
        <ul className="left hide-on-small-and-down">
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
        <ul className="right hide-on-small-and-down">
          {!isLoggedIn ? (
            <React.Fragment>
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
              <li>
              <i className="material-icons" onClick ={this.cartClicker}>shopping_cart</i>
                {this.state.isOpen && <ul id="cart-options">
                <Link to="/cart" className="white-text">
                  Show More
                </Link>
                                      </ul>}
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>

              <li>
                <i className="material-icons" onClick ={this.cartClicker}>shopping_cart</i>
                {this.state.isOpen && <ul id="cart-options">
                {
                  items.map((item, index) => {
                    cartTotal += Number(item.price)
               return (
              <ul key={index}>
              <li  >
                <a className="title bold">{item.name}</a>
                <a className="bold">${item.price} </a>
                <a href="#!" className="secondary-content" onClick = { () => handleDeleteItem(index)}>
                  <i className="material-icons">delete</i>
                </a>
              </li>
              </ul>
            )
          })}
                <a>Total: {cartTotal} </a>
                <Link to="/cart" className="white-text" onClick={this.cartClicker}>
                  Show More
                </Link>
                                      </ul>}
              </li>

              <li>
                  <i className="material-icons" onClick={this.clicker}>expand_more</i>
                  {this.state.isOpened && <ul id="cart-options">
                    <Link to="/edit" className="white-text">
                    Edit Account
                    </Link>
                    <a href="#" onClick = { () => handleDeleteAccount(userId)} className="white-text">
                    Delete Account
                    </a>
                    <a href="#" onClick={handleClick} className="white-text">
                    Log Out
                    </a>
                                          </ul>}
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
           </div>)
  }

}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    items: state.cart.items
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    handleDeleteAccount(evt){
      dispatch(deleteUser(evt))
    },
    handleDeleteItem(index){
      dispatch(deleteFromGuestCart(index))
    }
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
