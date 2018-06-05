/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LandingPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="index-banner" className="parallax-container">
          <div className="section no-pad-bot">
            <div className="container">
              <div className="row">
                <h1 className="header white-text landing-title">
                  Casa de Aves.
                </h1>
                <h3 className="header col s12 light blue-grey-text text-lighten-5">
                  Mid-Century Modern Bird Houses.
                </h3>
              </div>
              <br />
              <div className="row">
                <Link
                  to="/products"
                  className="btn-large  waves-effect waves-light teal">
                  Our Products
                </Link>
                <Link
                  to="/locations"
                  className="btn-large waves-effect waves-light teal">
                  Create an Account
                </Link>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default LandingPage
