'use strict'

const db = require('../server/db')
const { User, Product, Review } = require('../server/db/models')

const seed = async () => {
  try {
    await db.sync({ force: true })

    const seedUsers = User.bulkCreate(userData, { returning: true })
    const seedProducts = Product.bulkCreate(productData, { returning: true })
    const seedReviews = Review.bulkCreate(reviewData, { returning: true })

    await Promise.all([seedProducts, seedUsers, seedReviews])
    console.log('Database successfully seeded.')
  } catch (error) {
    console.error(error)
  } finally {
    db.close()
    console.log('Database connection closed.')
  }
}

seed()

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
