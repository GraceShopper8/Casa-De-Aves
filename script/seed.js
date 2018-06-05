'use strict'

const db = require('../server/db')
const { User, Product, Review } = require('../server/db/models')
const reviewData = require('./seed-files/reviewData')
const productData = require('./seed-files/productData')


async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}


const randomNum = (min, max) => Math.random() * (max - min) + min

const seedScript = async () => {
  try {
    await db.sync({ force: true })

    const seedProducts = Product.bulkCreate(productData, { returning: true })
    const seedReview = Review.bulkCreate(reviewData, { returning: true })
    await Promise.all([
      seedProducts,
      seedReview,
      User.create({email: 'cody@email.com', password: '123'}),
      User.create({email: 'murphy@email.com', password: '123'})
    ])
    console.log('Database successfully seeded.')
  } catch (error) {
    console.error(error)
  } finally {
    db.close()
    console.log('Database connection closed.')
  }
}

if (module === require.main) {
  seedScript();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seedScript




/*
'use strict'



*/
