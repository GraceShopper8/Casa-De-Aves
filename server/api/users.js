const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { User } = require('../db/models')

module.exports = router

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await User.findAll()
    res.json(users)
  })
)
