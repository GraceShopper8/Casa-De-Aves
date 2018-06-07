const stripe = require("stripe")(process.env.STRIPE_SECRET);

// const charge = stripe.charges.create({
//   amount: 999,
//   currency: 'usd',
//   source: 'tok_visa',
//   receipt_email: 'nikifr.91@gmail.com',
// });

// charge.then((data) => {
//   console.log(data);
// })