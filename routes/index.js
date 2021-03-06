var express = require('express');
var router = express.Router();
var User = require("../models/User");
var Validation = require("../models/Validation");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Slackarma - Give Teammate Reputation Points in Slack' });
});

router.get('/add', function(req, res, next) {
  res.render('index', { title: 'Slackarma - Give Teammate Reputation Points in Slack' });
});



router.post('/add', function(req, res, next){

  //this is called whenever a model is finished processing data
  var sendResponse = function(json){
    res.json(json)
  }

  var name = req.body.text;
  var team = req.body.team_id;
  var username = req.body.user_name.toLowerCase(); //Person who is giving karma

  name = name.replace("++ ", "");
  name = name.replace(/\s+/g, '');

  console.log('the name is '+name);

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
