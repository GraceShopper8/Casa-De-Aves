'use strict'
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },

  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://dummyimage.com/300x200.bmp/607d8b/ffffff',
  },

  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'No description yet!',
    validate: { notEmpty: true },
  },

  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
    defaultValue: 'Generic Plant',
  },

  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },

  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 0 },
    defaultValue: 0,
  },

  totalRatingSum: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },

  totalRatingCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },

  avgRating: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
})

Product.prototype.submitRating = function(rating) {
  this.totalRatingSum += rating
  this.totalRatingCount += 1
  this.avgRating = this.calcAvgRating()
}

Product.prototype.calcAvgRating = function() {
  return this.totalRatingCount / this.totalRatingCount
}

module.exports = Product
