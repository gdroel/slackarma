var express = require('express');
var router = express.Router();

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/slackrep';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add', function(req, res, next){

  console.log(req.body);

  var name = req.body.text;
  console.log("REQ BODY TEXT"+req.body.text)
  var team = req.body.team_id;
  name = name.split('++');
  name = name[0];
  name = name.replace(/\s/g, '');
  console.log(name);

  var queryString = "SELECT * FROM users WHERE name = '"+name+"' and team = '"+team+"'";
  console.log(queryString);

  var json = {

    "text":"Rep added"
  }

  pg.connect(connectionString, function(err, client, done){

      client.query(queryString, function(err, result){

        if(err) {
          console.log(err);
          res.send(err);
        }

        if(result.rows.length > 0){

            console.log('WE ARE UPDATAING');

            var user = result.rows[0];
            var rep = user.rep;
            rep = rep + 1;

            var updateString = "UPDATE users SET rep="+rep+" WHERE name='"+name+"' and team='"+team+"'";
            console.log(updateString);
            client.query(updateString);


            console.log(result.rows[0].name);
            res.send('You gave '+name+' a reputation point. '+name+' now has '+rep+' reputation points.');

        }else{

            console.error('nothing')
            client.query('INSERT INTO users(name, team, rep) values($1, $2, $3)', [name, team, 1]);
            // res.send('You gave '+name+' a reputation point. '+name+' now has 1 reputation point.');
            res.json(json)


        }


      });


  });


});

module.exports = router;
