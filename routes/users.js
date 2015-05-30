var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

});

router.get('/hi', function(req, res, next) {
  res.send('respond with a resource');

});

router.get('/add', function(req, res, next){

  var data = {
    username: 'gabe',
    slack_url: 'google',
    rep: 1
  };

  pg.connect(connectionString, function(err, client, done){

      client.query('INSERT INTO users(name, slack_url, rep) values($1, $2, $3)', [data.username, data.slack_url, data.rep]);

      query.on('end', function() {
        client.end();
        return res.json(results);
      });

      if(err) {
        console.log(err);
      }

  });


});

module.exports = router;
