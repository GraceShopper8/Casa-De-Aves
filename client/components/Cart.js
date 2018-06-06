import React, { Component } from "react";
import { connect } from "react-redux";

class Cart extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props);
    const items = this.props.items;
    return (
      <div>
        {items.map((el) => {
          return <p key={el.id}>{el.name}</p>;
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    items: state.cart.items
  };
};

export default connect(mapState)(Cart);
