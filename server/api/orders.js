const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { Order } = require('../db/models')

module.exports = router

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const orders = await Order.findAll()
    res.json(orders)
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    order ? res.json(order) : res.status(404).end()
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newOrder = await Order.create(req.body)
    res.json(newOrder)
  })
)
