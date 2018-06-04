'use strict'
const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('review', {
  thumbsUp: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },

  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
    defaultValue: 5,
  },

  reviewDetail: {
    type: Sequelize.TEXT,
  },
})
