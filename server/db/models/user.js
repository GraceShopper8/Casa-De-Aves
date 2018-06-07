const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    defaultValue: 'TEST_FIRSTNAME',
  },

  lastName: {
    type: Sequelize.STRING,
    defaultValue: 'TEST_LASTNAME',
  },

  homeAddress: {
    type: Sequelize.STRING,
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },

  cart: {
    type: Sequelize.TEXT,
    defaultValue: '',
  },

  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    },
  },

  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    },
  },

  googleId: {
    type: Sequelize.STRING,
  },
})

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

module.exports = User
