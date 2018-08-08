const request = require('supertest');
const app = require('../app');

const store = require('../lib/store')

describe('GET /:key', () => {
  before(() => {
    store.put(7, [{five: 'six'}, {one: 'two', three: 'four'}])
      .then((doc) => {})
      .catch((err) => {console.log(`error!!! ${err}`)})
  })

  it('returns the doc under the key', (done) => {
    request(app)
      .get('/7')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('returns the doc version by ID', (done) => {
    request(app)
      .get('/7?id=0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {five: 'six'}, done);
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

  it('returns a new id for an existing key', (done) => {
    request(app)
      .post('/20')
      .send({html: 'foo bar'})
      .set('Accept', 'application/json')
      .expect(200, '1', done)
  });

  before(() => {
    store.put(20, [{}])
      .then((doc) => {})
      .catch((err) => {console.log(`error!!! ${err}`)})
  });
  after(() => {
    store.del(10, (err) => {})
    store.del(20, (err) => {})
  });
});
