/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {

    var prod;
    beforeEach(() => {
        prod = Product.create({
        id: 1,
        name: 'TEA HOUSE BIRDHOUSE',
        description: 'This birdhouse was designed by Douglas Barnhard',
        category: 'StarterHome',
        price: 130.25,
        inventory: 20
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].price).to.be.equal('130.25')
          expect(res.body[0].category).to.be.equal('StarterHome')
        })
    })

    it('PUT /api/products/:id', () => {

      return request(app)
        .put('/api/products/' + 1)
        .send({
          category: 'familyHome',
          price: 1050.25,
        })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.category).to.be.equal('familyHome')
          expect(res.body.price).to.be.equal('1050.25')
        })
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
