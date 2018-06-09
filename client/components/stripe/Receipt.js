import React, { Component } from "react";
import { connect } from "react-redux";

class Receipt extends Component {
  render() {
    console.log(this.props);
    const resp = this.props.response;
    return (
      <div className="valign-wrapper">
        <h5>{JSON.stringify(resp, undefined, 2)}</h5>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    response: state.checkout.response
  };
};

export default connect(mapState)(Receipt);
