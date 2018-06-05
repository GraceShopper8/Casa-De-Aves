const router = require('express').Router()
const { Product } = require('../db/models')
const asyncHandler = require('express-async-handler')

module.exports = router

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.findAll()
    res.json(products)
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.json(product)
  })
)
