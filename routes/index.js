var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/command', function(req, res, next){

  res.send('He got an upvote'+req.query.text).end();

});

module.exports = router;
