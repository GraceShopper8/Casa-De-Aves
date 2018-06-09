/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReview, getAllReviews } from '../store/review'



class UserReviewForm extends Component {

 constructor(){
   super()
   this.state = {
     reviewDetail: ""

   }
 }


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
    document.getElementById('review').value='';
    document.getElementById('rating').value='';
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
   if (!this.props.reviews) {
     console.log('Loading...');
     return <h1>Loading...</h1>;
   }

  const prodReviews = this.props.reviews.filter((review) => review.productId === this.props.prodId)
  const revProdReview = prodReviews.reverse()

  const disabled = this.state.reviewDetail &&  this.state.rating >= 0 && this.state.rating <= 5 && this.state.rating !== ""
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

          <input placeholder="Rating: 0 - 5"
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
           disabled={!disabled}
           name="action">
           Submit
         </button>
        </div>
    </div>
  </form>
    {
     revProdReview.map((review) => {
       var sentiment;
       const rating = review.rating;
       switch (rating){
        case 0:
          sentiment = 'sentiment_very_dissatisfied';
          break;
        case 1:
           sentiment = 'sentiment_dissatisfied';
           break;
        case 4:
           sentiment = 'sentiment_satisfied';
           break;
        case 5:
           sentiment = 'sentiment_very_satisfied';
           break;
        default:
           sentiment = 'sentiment_neutral';
        }
     return (
        <div key={review.id} className="row">
          <div key={review.id} className="input-field col s12">
             <i className="medium material-icons left">{sentiment}</i>
             <input key={review.id} id="textarea1"
              defaultValue={review.reviewDetail} className="input-field col s12" />
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
