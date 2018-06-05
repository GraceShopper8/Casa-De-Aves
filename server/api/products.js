const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { Product, Review } = require('../db/models')

module.exports = router

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.findAll({ include: [Review] })
    res.json(products)
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findOne(
      { where: { id: req.params.id } },
      { include: [Review] }
    )
    res.json(product)
  })
)
