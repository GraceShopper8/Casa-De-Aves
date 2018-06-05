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

router.get('/:id',  (req, res, next) => {
  console.log('hellooooooooooooooooooooooooooooooo')
  User.find({
      where: { id: req.params.id},
      include: [{all: true}]
  })
  .then( camp => { res.json(camp)})
  .catch(next)
  })

router.post(
  '/',
  asyncHandler(async(req, res) => {
    const newUser = await User.create(req.body)
    res.json(newUser)
  })
)

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const updatedUser = await  User.update(req.body,{
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.json(updatedUser)
  })
)

router.delete(
  '/:id',
  (req, res, next) => {
    User.destroy({ where: { id: req.params.id } })
    .then(() => res.json(req.params.id))
        .catch(next)
  }
)
