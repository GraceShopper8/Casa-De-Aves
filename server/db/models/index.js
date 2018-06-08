const User = require('./user')
const Product = require('./Product')
const Order = require('./Order')
const Review = require('./Review')

const db = require('../db');

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Order, { through: 'orderProduct' })
Order.belongsToMany(Product, { through: 'orderProduct' })

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)

module.exports = {
  User,
  Product,
  Order,
  Review
}
