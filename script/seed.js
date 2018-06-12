'use strict';

const db = require('../server/db');
const { User, Product, Review, Order } = require('../server/db/models');
const reviewData = require('./seed-files/reviewData');
const productData = require('./seed-files/productData');
const userData = require('./seed-files/userData');

const randomNum = (min, max) => Math.random() * (max - min) + min;

const seedScript = async () => {
  try {
    await db.sync({ force: true });

    const seedProducts = Product.bulkCreate(productData, {
      returning: true,
      individualHooks: true
    });
    const seedReview = Review.bulkCreate(reviewData, {
      returning: true,
      individualHooks: true
    });
    const seedUser = User.bulkCreate(userData, {
      returning: true,
      individualHooks: true
    });

    const [products, reviews, users] = await Promise.all([seedProducts, seedReview, seedUser]);

    const productNames = products.map(product => JSON.stringify(product));

    const orders = users.map(user => {
      const tempArr = [
        productNames[Math.floor(Math.random() * productNames.length)],
        productNames[Math.floor(Math.random() * productNames.length)],
        productNames[Math.floor(Math.random() * productNames.length)]
      ];
      return Order.create({
        cartContents: JSON.stringify(tempArr),
        shippingAddress: user.homeAddress,
        totalPrice: Math.floor(Math.random() * 1000 + 100),
        shippingPrice: 0,
        userId: Math.ceil(Math.random() * users.length)
      });
    });

    reviews.forEach(review => {
      review.setUser(users[Math.ceil(Math.random() * users.length - 1)].id);
      review.setProduct(products[Math.ceil(Math.random() * products.length - 1)].id);
    });

    await Promise.all(orders);

    console.log('Database successfully seeded.');
  } catch (error) {
    console.error(error);
  } finally {
    db.close();
    console.log('Database connection closed.');
  }
};

if (module === require.main) {
  seedScript();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seedScript;
