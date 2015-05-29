var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/command', function(req, res, next){

  console.log(req.query);
  res.send(200).end();

});

module.exports = router;
