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

// Grabs all orders for a single user
router.get(
  '/:userid',
  asyncHandler(async (req, res) => {
    const order = await Order.findAll({ where: { userId: req.params.userid } })
    order ? res.json(order) : res.status(404).end()
  })
)

// Grabs single order for a user
router.get(
  '/:userid/:orderId',
  asyncHandler(async (req, res) => {
    const order = await Order.findOne({
      where: {
        userId: req.params.userid,
        id: req.params.orderId,
      },
    })
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
