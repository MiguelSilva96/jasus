
var express = require('express');
var router = express.Router();
var crypto = require('crypto');


/* GET listing. */
router.get('/:id', async function(req, res, next) {
  try {
    const db = req.app.locals.db;
    const urls = db.collection('urls');
    const urlRes = await urls.findOne({
      id: req.params.id
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

router.post('', async function(req, res, next) {
  try {
    // temporary for tests
    const md5sum = crypto.createHash('md5');
    const db = req.app.locals.db;
    const urls = db.collection('urls');
    let obj = req.body;
    if (obj.url === undefined || obj.url === null || obj.url === '')
      res.redirect('/');

    obj.id = md5sum.update(obj.url).digest('hex');
    const urlRes = await urls.findOne({
      id: obj.id
    });
    if (urlRes) {
      res.render('index', { title: 'jasus', urlId: urlRes.id });
    } else {
      urls.insertOne(obj, function(err, resdb) {
        if (err) throw err;
        res.render('index', { title: 'jasus', urlId: obj.id });
      });
    }
    
  } catch (err) {
    next(err);
  }
});

module.exports = router;
