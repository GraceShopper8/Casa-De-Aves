const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { Review } = require('../db/models')

module.exports = router


router.get(
  '/',
  asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
      include: [{ all: true }]
    })
    res.json(reviews)
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newReview = await Review.create(req.body)
    res.json(newReview)
  })
)
