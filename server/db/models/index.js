'use strict'
const db = require('../db')
const User = require('./User')
const Product = require('./Product')
const Review = require('./Review')
const Orders = require('./Orders')

Orders.belongsTo(User)
User.hasMany(Orders)

Product.belongsToMany(Orders, { through: 'orderProduct' })
Orders.belongsToMany(Product, { through: 'orderProduct' })

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)

module.exports = {
  db,
  User,
  Product,
  Review,
  Orders,
}
