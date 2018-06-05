const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { User } = require('../db/models')

module.exports = router

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await User.findAll({ attributes: ['id', 'email'] })
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    res.json(users)
  })
)
