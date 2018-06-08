/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReview } from '../store/review'



class UserReviewForm extends Component {


  onHandleSubmit = event => {
    event.preventDefault();
    const reviewDetail = event.target.reviewDetail.value;
    const rating = event.target.rating.value;

    const reviewObj = { reviewDetail, rating};
    this.props.sendToReviewPostThunk(reviewObj);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {


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
</div>
    )
  }
}

const mapState = state => {

}

const mapDispatch = dispatch => ({
sendToReviewPostThunk: newReview => dispatch(addReview(newReview))
})

export default connect(
  mapState,
  mapDispatch
)(UserReviewForm)






// { this.props.map((review) => {
//   return (
//
//
//       <div className="row">
//         <div className="input-field col s12">
//        <input key={review.id} id="textarea1" defaultValue={review.reviewDetail} className="input-field col s12"></input>
//
//
//        </div>
//      </div>
//
//
//   ) //return
