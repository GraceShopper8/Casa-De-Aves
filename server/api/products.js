const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { Product, Review, User } = require('../db/models')

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

    const product = await Product.findOne({
      where: { id: req.params.id },
      include: [{ all: true }],
    })

    res.json(product)
  })
)

// api/products
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  })
)

//api/products/:id
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const updatedProduct = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
    res.json(updatedProduct[1][0].dataValues)
  })
)

router.delete('/:id', async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id)
  if (!deletedProduct) {
    return res.status(404).send(`Error Product id: ${req.parmas.id} not found`)
  }
  await Product.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.send(deletedProduct)
})
