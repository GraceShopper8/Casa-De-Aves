import React, { Component } from "react";
import { connect } from "react-redux";

class Receipt extends Component {
  render() {
    const { checkout, postedOrders } = this.props;

    if (postedOrders.length === 0) {
      return (
        <div className="container container__receipt white z-depth-2 animated fadeIn">
          <div className="col s12">
            <form>
              <div className="form-container">
                <center>
                  <h4 className="teal-text">You have not ordered anything</h4>
                  <a href="/products" className="waves-effect waves-light btn-small" type="submit">
                    shop products
                  </a>
                </center>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      const { cartContents, shippingAddress, id } = postedOrders[0];
      const { response } = checkout;
      const { amount, email } = response.data;
      const orderedItems = JSON.parse(cartContents);

      return (
        <div className="container container__receipt white z-depth-2 animated fadeIn">
          <div className="col s12">
            <form>
              <div className="form-container">
                <h4 className="teal-text">Thank You for you order.</h4>
                <h6 className="teal-text">Confirmation #{id}</h6>
                <div className="row">
                  <div className="input-field col s12">
                    <table>
                      <tbody>
                        {orderedItems.map((item, i) => (
                          <tr className="custom_table-row" key={i}>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                          </tr>
                        ))}
                        <tr className="custom_table-row">
                          <td>TOTAL</td>
                          <td>${amount / 100}</td>
                        </tr>
                      </tbody>
                    </table>
                    <span>Shipping to:</span>
                    <p>{`${checkout.firstName} ${checkout.lastName}`}</p>
                    <p>{`${shippingAddress}`}</p>
                  </div>
                </div>
                <center>
                  <a href="/products" className="waves-effect waves-light btn" type="submit">
                    shop more
                  </a>
                  <a href="/home" className="waves-effect waves-light btn" type="submit">
                    Home
                  </a>
                </center>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    checkout: state.checkout,
    postedOrders: state.receipt.postedOrders
  };
};

export default connect(mapState)(Receipt);
