/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {

        var order;
    beforeEach(() => {
        order = Order.create({

        cartContents: 'this is a string',
        shippingAddress: '2800 Heath Ave',
        totalPrice: 883.00,
        shippingPrice: 22.00,
        price: 130.25

      })
    })

    it('GET /api/orders/', () => {
      return request(app)
        .get('/api/orders/')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].cartContents).to.a('string')
          expect(res.body[0].cartContents).to.be.equal('this is a string')
        })
    })

    it('POST /api/orders', () => {

      return request(app)
        .post('/api/orders')
        .send({
          cartContents: 'This is our cart',
          shippingAddress: '837 Woodland Ave',
          totalPrice: 1200.99
        })
        .expect(200)
        .then(res => {
           expect(res.body.totalPrice).to.be.equal('1200.99')
      })
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
