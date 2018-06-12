/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/reviews/', () => {
    beforeEach(() => {
      return Review.create({
        rating: 4,
        reviewDetail: 'One fly bird house!'
      })
    })

    it('GET /api/reviews', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].reviewDetail).to.be.equal('One fly bird house!')
        })
    })


  }) // end describe('/api/reviews')

  describe('POST /api/reviews', () => {

  it('creates a new review', () => {

    return request(app)
    .post('/api/reviews')
    .send({
      rating: 3,
      reviewDetail: 'This was a great house'
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.id).to.not.be.an('undefined');
      expect(res.body.reviewDetail).to.equal('This was a great house');
    });

  })
 })
}) // end describe('Review routes')
