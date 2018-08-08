const request = require('supertest');
const app = require('../app');

const store = require('../lib/store')

describe('GET /:key', () => {
  before(() => {
    store.put(7, [{one: 'two', three: 'four'}])
      .then((doc) => {console.log(`stored testdoc ${doc}`)})
      .catch((err) => {console.log(`error!!! ${err}`)})
  })

  it('returns the doc under the key', (done) => {
    request(app)
      .get('/7')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('returns a part of the doc if requested', (done) => {
    request(app)
      .get('/7?chunk=three')
      .set('Accept', 'application/json')
      .expect(200, '"four"',  done)
  });
});

describe('POST /:key', () => {
  it('stores the doc and returns the ID', (done) => {
    request(app)
      .post('/10')
      .send({html: 'foo bar'})
      .set('Accept', 'application/json')
      .expect(200, '0', done)
  });

  after(() => {
    store.del(10, (err) => {})
  });
});
