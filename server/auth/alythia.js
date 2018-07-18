const passport = require('passport')
const router = require('express').Router()
const passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;
const { User } = require('../db/models')
module.exports = router

passport.use('aly', new CustomStrategy(
  function(req, done) {
    User.find({ where: { googleId: req.params.id} })
      .then(
        foundUser =>
          foundUser
            ? done(null, foundUser)
            : User.create({
                email: req.body.email,
                googleId: req.params.id,
              }).then(createdUser => done(null, createdUser))
      )
      .catch(done)
  }
));

router.post('/verify/:id', passport.authenticate('aly'))

router.get('/logged-in/:id',
  passport.authenticate('aly', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
