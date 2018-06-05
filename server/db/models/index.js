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
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  Review
}
