/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReview, getAllReviews } from '../store/review'
import Rating from 'react-rating'

class UserReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      reviewDetail: '',
      rating: 0,
    }
  }

  componentDidMount() {
    this.props.getAllProductReviews()
  }

  onHandleSubmit = event => {
    event.preventDefault()

    const reviewDetail = this.state.reviewDetail
    const rating = this.state.rating
    const productId = this.props.prodId
    const userId = this.props.user.id

    const reviewObj = { reviewDetail, rating, productId, userId }
    this.props.sendToReviewPostThunk(reviewObj)
    this.setState({
      reviewDetail: '',
      rating: 0,
    })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleRatingChange = rating => {
    this.setState({ rating })
  }

  render() {
    if (!this.props.reviews) return <div />

    const prodReviews = this.props.reviews.filter(
      review => review.productId === this.props.prodId
    )
    const revProdReview = prodReviews.reverse()

    const disabled =
      this.props.user.id &&
      this.state.reviewDetail &&
      this.state.rating >= 0 &&
      this.state.rating <= 5 &&
      this.state.rating !== ''
    return (
      <div>
        <form className=" card col s12 m12 l12" onSubmit={this.onHandleSubmit}>
          <div className="row white">
            <div className="input-field col s12 m12 l9 white">
              <h5 className="teal-text">ADD A REVIEW!</h5>
              <textarea
                placeholder="Be honest..."
                id="review"
                type="text"
                className="validate materialize-textarea"
                name="reviewDetail"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field col s12 m12 l3 white">
              <h5 className="teal-text">5 STARS?</h5>
              <Rating
                start={0}
                stop={5}
                step={1}
                initialRating={this.state.rating}
                onChange={this.handleRatingChange}
                emptySymbol={
                  <i className="small material-icons teal-text">star_border</i>
                }
                fullSymbol={
                  <i className="small material-icons teal-text">star</i>
                }
              />
            </div>
            <div className="col s12 m12 l12">
              <button
                className="waves-effect waves-light btn-small"
                type="submit"
                disabled={!disabled}
                name="action">
                {this.props.user.id ? 'Submit' : 'Log in to leave a review!'}
              </button>
            </div>
          </div>
        </form>
        {revProdReview.map(review => {
          var sentiment
          const rating = review.rating
          switch (rating) {
            case 0:
              sentiment = 'sentiment_very_dissatisfied'
              break
            case 1:
              sentiment = 'sentiment_dissatisfied'
              break
            case 4:
              sentiment = 'sentiment_satisfied'
              break
            case 5:
              sentiment = 'sentiment_very_satisfied'
              break
            default:
              sentiment = 'sentiment_neutral'
          }
          return (
            <div key={review.id} className="col s12 m6 l12">
              <div className="card">
                <div className="card-content">
                  <div className="row">
                    <span className="teal-text lighten-1 center-align">
                      {review.user
                        ? review.user.firstName
                        : this.props.user.firstName}
                    </span>
                    <span className="teal-text lighten-1">
                      <i className="small material-icons left">{sentiment}</i>
                    </span>
                  </div>
                  <p>{review.reviewDetail}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  reviews: state.review.allReviews,
  user: state.user,
})

const mapDispatch = dispatch => ({
  sendToReviewPostThunk: newReview => dispatch(addReview(newReview)),
  getAllProductReviews: () => dispatch(getAllReviews()),
})

export default connect(
  mapState,
  mapDispatch
)(UserReviewForm)
