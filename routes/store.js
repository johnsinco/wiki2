const express = require('express');
const router = express.Router();
const level = require('level');
const store = level('./kvstore-db');


router.get('/:key', function(req, res, next) {
  var key = req.params.key
  if(!key) throw 'invalid key!'
  console.log(`key is ${key}`)
  store.get(key)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(404).send(`key ${key} not found!`)
    })
});

router.post('/:key', function(req, res) {
  var key = req.params.key
  console.log(`key is ${key}`)
  console.log(`body is ${req.body} some key is ${req.body.some}`)
  store.get(key)
    .catch((err) => {
      console.log(`in the get error block ${err}`)
      if(err && err.notFound) {
        // set the doc array to empty array
        console.log('returning an empty array from the missing key error')
        return "[]"
      }
    })
    .then((doc_array) => {
      console.log(`doc array from store is ----${doc_array}--${typeof doc_array}--`)
      // doc_array should be 1..n versions of the doc
      // push the new version onto the end
      doc_array = JSON.parse(doc_array)
      doc_array.push(req.body)
      console.log(`doc array is now >>${doc_array} --- ${typeof doc_array}`)
      return doc_array
    })
    .then((doc_array) => {
      console.log(`in push block doc_array is ${doc_array} --- ${typeof doc_array} ${doc_array[0].some}`)
      store.put(key, JSON.stringify(doc_array))
      .then(function () {
        console.log(">>>>>>>>>>>>>>>>>>> after put")
        res.status(200).send(doc_array.length.toString());
      })
      .catch(function (err) { console.error(err) })
    })
})

module.exports = router;
