const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {

  cartContents: {
    type: Sequelize.TEXT,
    defaultValue: '',
  },

  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 },
    defaultValue: 0,
  },

  shippingPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 4.99,
  },
})

module.exports = Order
