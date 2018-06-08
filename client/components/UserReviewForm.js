/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'



class UserReviewForm extends Component {


  render() {

    console.log("Route is correct")
    return (
      <div>Hello</div>
    )
  }
}

const mapState = state => {
  return {
    reviews: state.reviews
  }
}

const mapDispatch = dispatch => ({

})

export default connect(
  mapState,
  mapDispatch
)(UserReviewForm)
