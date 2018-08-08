const express = require('express');
const router = express.Router();
const level = require('level');
const store = level('./kvstore-db', { valueEncoding: 'json' });


router.get('/:key', function(req, res, next) {
  var key = req.params.key
  if(!key) throw 'invalid key!'
  console.log(`key is ${key}`)
  store.get(key)
    .then((data) => {
      var id = req.query.id || data.length - 1
      res.json(data[id]);
    })
    .catch((err) => {
      res.status(404).send(`key ${key} not found!`)
    })
});

router.post('/:key', function(req, res) {
  var key = req.params.key
  store.get(key)
    .catch((err) => {
      console.log(`in the get error block ${err}`)
      if(err && err.notFound) {
        return []
      }
    })
    .then((doc_array) => {
      // doc_array should be 1..n versions of the doc
      // push the new version onto the end
      doc_array.push(req.body)
      return doc_array
    })
    .then((doc_array) => {
      store.put(key, doc_array)
      .then(function () {
        // return the id/index of the most recent stored version
        res.status(200).send((doc_array.length - 1).toString());
      })
      .catch(function (err) { console.error(err) })
    })
})

module.exports = router;
