const { expect } = require('chai');
const db = require('../index');
const Order = db.model('order');

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  const shippingAddress = '100 Campus Drive Waltham, Ma 05438';
  const totalPrice = Number(50.02);

  let order;
  beforeEach(() => {
    order = Order.build({
      shippingAddress: shippingAddress,
      totalPrice: totalPrice
    });
  });

  afterEach(() => {
    return Promise.all([Order.truncate({ cascade: true })]);
  });

  describe('attributes definition', () => {
    it("includes 'shippingAddress' field && 'totalPrice' ", () => {
      return order.save().then(savedOrder => {
        expect(savedOrder.shippingAddress).to.equal('100 Campus Drive Waltham, Ma 05438');
        expect(savedOrder.totalPrice).to.equal('50.02');
      });
    });
  });
}); // end describe('User model')
