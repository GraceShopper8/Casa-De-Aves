import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome } from './components'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import LandingPage from './components/LandingPage'
import AdminEditForm from './components/AdminEditForm'
import { me } from './store'
import Checkout from './components/Checkout'
import Receipt from './components/stripe/Receipt'
import CreateUser from './components/createUserForm'
import EditUser from './components/editUserForm'
import Cart from './components/Cart'
import UserOrders from './components/UserOrders'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props
    const isAdmin = this.props.isAdmin
    console.log('isAdmin', isAdmin)

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={CreateUser} />

        <Route exact path="/products" component={ProductList} />
        <Route exact path="/products/:id" component={ProductDetail} />
        {/* <Route exact path="/users/signup" component={CreateUser} /> */}
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/receipt" component={Receipt} />
        <Route exact path="/cart/checkout" component={Checkout} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/:id/edit" component={EditUser} />
            <Route exact path="/orders/:userid" component={UserOrders} />

            {isAdmin && (
              <Switch>
                {/* Routes placed here are only available for loggin && Admin */}
                <Route
                  exact
                  path="/products/:id/edit"
                  component={AdminEditForm}
                />
              </Switch>
            )}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin,
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
