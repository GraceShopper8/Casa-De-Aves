const router = require('express').Router();
const axios = require('axios');

router.post('/', (req, res, next) => {
  console.log(process.env.STRIPE_SECRET);
  res.send('worked')
})

module.exports = router;