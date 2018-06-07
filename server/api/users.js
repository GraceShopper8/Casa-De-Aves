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

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    user ? res.json(user) : res.status(404).end()
  } catch (error) {
    next(error)
  }
})

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newUser = await User.create(req.body)
    res.json(newUser)
  })
)

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    const updated = await user.update(req.body)
    user ? res.json(updated) : res.status(404).json('Student not found.')
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.json(req.params.id))
    .catch(next)
})
