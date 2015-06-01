var express = require('express');
var router = express.Router();
var User = require("../models/User");
var Validation = require("../models/Validation");


var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/slackrep';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add', function(req, res, next){

  var sendResponse = function(json){

    res.json(json)

  }

  var name = req.body.text;
  var team = req.body.team_id;
  var username = req.body.user_name; //Person who is giving karma

  name = name.replace("++ ", "");
  name = name.replace(/\s+/g, '');

  //just by creating a user object you automatically update a users
  // reputation or create a new user

  var validation = new Validation(name, username, sendResponse);

  if(validation.check() == true){
    console.log('lets create a new user');
    var user = new User(name, team, sendResponse);
  }else{
    console.log('validation failed');
  }

});

module.exports = router;
