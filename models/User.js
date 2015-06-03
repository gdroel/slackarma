var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/slackrep';

var User = function(name, team, callback){

    this.name = name;
    this.team = team;
    this.callback = callback

    //Connect to the Database
    pg.connect(connectionString, function(err, client, done){
      if(err){
        console.error(err);
      }

      if (name != "leaderboard"){

        console.log("THE NAME IS "+name);
        //Calls function which checks whether the User on that team has any rep yet.
        User.prototype.checkRep.call(User, client, name, team, callback);
      }
      else{
        User.prototype.leaderboard.call(User, client, team, callback);
      }
    });
}

// If a user has reputation, this function calls updateRep() that just increments
// the persons reputation by one. If the user does not exist, then the function calls
// newUser() which adds a user to the database

User.prototype.checkRep = function(client, name, team, callback){

  var queryString = "SELECT * FROM users WHERE name = '"+name+"' and team = '"+team+"'";
  client.query(queryString, function(err, result){

    if(err) {
      console.log(err);
    }

    if(result.rows.length > 0){
      User.prototype.updateRep.call(User, result, client, name, team, callback);
    }
    else{
      User.prototype.newUser.call(User, client, name, team, callback);
    }
  });

}

//Updates a users reputation
User.prototype.updateRep = function(result, client, name, team, callback){

  var user = result.rows[0];
  var rep = user.rep;
  rep = rep + 1;

  var updateString = "UPDATE users SET rep="+rep+" WHERE name='"+name+"' and team='"+team+"'";
  client.query(updateString);

  var response = {

    "none":"no response",
    "parse":"none"
  }

  callback(response);
  client.end();

}


//Adds a user to the database.
User.prototype.newUser = function(client, name, team, callback){

  client.query('INSERT INTO users(name, team, rep) values($1, $2, $3)', [name, team, 1]);

  var response = {

    "none":"no response",
    "parse":"none"
  }

  callback(response);
  client.end();

}


//Gets leaderboard
User.prototype.leaderboard = function(client, team, callback){

  var queryString = "SELECT * FROM users WHERE team ='"+team+"' ORDER BY rep DESC";
  console.log(queryString);
  var responseString = "";
  client.query(queryString, function(err, result){


  //loops through all the users returned by query, it appends each user to a string, which
  // is then sent in a json response.
  for(var i=0; i<result.rows.length; i++){

    console.log(result.rows[i].name);
    userInfo = "*" + result.rows[i].name + "* - " + result.rows[i].rep + ' Karma\n';
    responseString = responseString.concat(userInfo);

  }

  console.log('RESPONSE STRING '+responseString);

  var json = {

    "text":responseString,
    "username":"karma-bot",
    "parse":"none"
  }

  callback(json);
  client.end();

  });

}

module.exports = User;
