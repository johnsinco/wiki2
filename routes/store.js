const express = require('express');
const router = express.Router();
const level = require('level');
const store = require('../lib/store')


router.get('/:key', function(req, res, next) {
  let key = req.params.key
  let id = req.query.id
  if(!key) throw 'invalid key!'
  store.get(key)
    .then((data) => {
      var doc = data[id || (data.length - 1)];
      if(!doc) throw "doc not found"
      if(req.query.chunk) {
        doc = doc[req.query.chunk]
      }
      res.json(doc);
    })
    .catch((err) => {
      res.status(404).send(`key ${key} id ${id} not found!`)
    })
});

router.post('/:key', function(req, res) {
  var key = req.params.key
  store.get(key)
    .catch((err) => {
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
