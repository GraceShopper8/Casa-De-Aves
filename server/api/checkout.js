const router = require("express").Router();
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post("/", (req, res, next) => {
  const { token } = req.body; // Using Express

  const charge = stripe.charges.create({
    amount: 230,
    currency: "usd",
    description: "Example charge",
    source: token,
    receipt_email: 'jenny.rosen@example.com',
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
