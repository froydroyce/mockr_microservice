const shell = require('shelljs');
const request = require('supertest');
const app = require('../app');

describe('Mockr Microservice', () => {
  describe('GET interview request', () => {
    test('It retreives a interview from Mockr API and sends email', () => {
      return request(app).get('/interviews/1')
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.message).toBe('success')
        })
    })
  })
})
