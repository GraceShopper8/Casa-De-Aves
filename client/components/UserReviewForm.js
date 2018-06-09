/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReview, getAllReviews } from '../store/review'



class UserReviewForm extends Component {

  componentDidMount(){
    this.props.getAllProductReviews()
  }
  onHandleSubmit = event => {
    event.preventDefault();
    const reviewDetail = event.target.reviewDetail.value;
    const rating = event.target.rating.value;
    const productId = this.props.prodId

    const reviewObj = { reviewDetail, rating, productId};
    this.props.sendToReviewPostThunk(reviewObj);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
   if (!this.props.reviews) {
     console.log('Loading...');
     return <h1>Loading...</h1>;
   }
   console.log('this is state.reviews', this.props.reviews)
  const prodReviews = this.props.reviews.filter((review) => review.productId === this.props.prodId)

    return (
<div className="row">
  <form className="col s12" onSubmit={this.onHandleSubmit}>
    <div className="row">
        <div className="input-field col s10">
           <input placeholder="Review: "
            id="review"
            type="text"
            className="validate"
            name="reviewDetail"
            onChange={this.handleChange} />
        </div>
        <div className="input-field col s2">
          <input placeholder="Rating: "
           id="rating"
           type="text"
           className="validate"
           name="rating"
           onChange={this.handleChange} />
        </div>
        <div className="input-field col s1">
         <button
           className="btn waves-effect waves-light"
           type="submit"
           name="action">
           Submit
         </button>
        </div>
    </div>
  </form>
  {
     prodReviews.map((review) => {
     return( <div className="row">
              <div className="input-field col s12">
             <input key={review.id} id="textarea1" defaultValue={review.reviewDetail} className="input-field col s12"></input>


             </div>
           </div>
     )

    })
  }
</div>


    )
  }
}

const mapState = state => ({
 reviews: state.review.allReviews
})

const mapDispatch = dispatch => ({
sendToReviewPostThunk: newReview => dispatch(addReview(newReview)),
getAllProductReviews: () => dispatch(getAllReviews())
})

export default connect(
  mapState,
  mapDispatch
)(UserReviewForm)
