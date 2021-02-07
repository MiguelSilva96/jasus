var express = require('express');
var router = express.Router();
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

/* GET  listing. */
router.get('/', function(req, res, next) {
  res.send('return the urls vs redirects');
});

router.post('/urls', function(req, res, next) {
  res.send('creating url');
});

module.exports = router;
