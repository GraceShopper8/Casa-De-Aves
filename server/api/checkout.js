const router = require("express").Router();
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post("/", (req, res, next) => {
  const { token, amount, email } = req.body;
  console.log('body contains', req.body);
  const charge = stripe.charges.create({
    amount: amount * 100,
    currency: "usd",
    description: "Example charge",
    source: token,
    receipt_email: email,
  });

  charge
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err.message);
      next(err);
    });
});

module.exports = router;
