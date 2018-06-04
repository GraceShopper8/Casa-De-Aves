const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('calcAvgRating', () => {
      let widget

      beforeEach(() => {
        return Product.create({
          name: 'WidetA',
          price: 25.00,
        })
          .then(wid => {
            wid.submitRating(5)
            widget = wid
          })


      })

      it('it returns totalRating / totalCount as an Interger', () => {
        expect(widget.avgRating).to.be.equal(5)
      })

    }) // end describe('calcAvgRating')
  }) // end describe('instanceMethods')
}) // end describe('User model')
