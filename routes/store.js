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
  console.log(`body is ${JSON.stringify(req.body)}`)
  store.put(key, JSON.stringify(req.body))
    .then(function () {
      console.log(">>>>>>>>>>>>>>>>>>> after put")
      store.get(key)
        .then((val) => {
          res.json(val);
        })
    })
    .catch(function (err) { console.error(err) })
})

module.exports = router;
