const level = require('level');
const db = level('./kvstore-db')

class KVStore {

  get(key, id) {
    console.log(key + id);
    return {foo: 'bar'}
  }

  put(key) {
    console.log(key);
    console.log('in the put func')
    console.log('putting that shit')
    db.put('foo', 'bar')
      .then(function () { return db.get('foo') })
      .then(function (value) { console.log(value) })
      .catch(function (err) { console.error(err) })
        return 69;
      }

}

module.exports = new KVStore();
