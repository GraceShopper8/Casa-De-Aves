'use strict'
const db = require('../db')
const User = require('./user')
const Product = require('./Product')
const Review = require('./Review')
const Order = require('./Order')

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Order, { through: 'orderProduct' })
Order.belongsToMany(Product, { through: 'orderProduct' })

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)

module.exports = {
  db,
  User,
  Product,
  Review,
  Order,
}

