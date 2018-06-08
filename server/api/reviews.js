const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { Review } = require('../db/models')

module.exports = router


router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newReview = await Review.create(req.body)
    res.json(newReview)
  })
)
