'use strict'
const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('order', {
  orderId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
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

module.exports = Orders
