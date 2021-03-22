
var express = require('express');
const { ObjectID } = require('mongodb');
var router = express.Router();


/* GET listing. */
router.get('/:id', async function(req, res, next) {
  try {
    const db = req.app.locals.db;
    const urls = db.collection('urls');
    const urlRes = await urls.findOne({
      _id: new ObjectID(req.params.id)
    });

    if (urlRes) {
      urlRes.id = req.params.id;
      res.redirect(urlRes.url);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/urls', async function(req, res, next) {
  try {
    const db = req.app.locals.db;
    const urls = db.collection('urls');
    let obj = req.body;
    if (obj.url === undefined || obj.url === null || obj.url === '')
      res.redirect('/');

    const urlRes = await urls.findOne({
      url: obj.url
    });
    if (urlRes) {
      res.render('index', { title: 'jasus', urlId: urlRes._id, origin: req.get('origin') });
    } else {
      urls.insertOne(obj, function(err, resdb) {
        if (err) throw err;
        res.render('index', { title: 'jasus', urlId: obj._id, origin: req.get('origin') });
      });
    }
    
  } catch (err) {
    next(err);
  }
});

module.exports = router;
