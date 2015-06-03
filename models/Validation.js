var Validation = function(name, username, callback){

  this.name = name;
  this.username = username;
  this.callback = callback;

  this.check = function(){

    // Note: check if same username is completely broken. You still can't
    // give karma to yourself, but for some reason when username is passed
    // as a parameter it becomes a weird string like: <@U04RL0M1F>

    if(this.checkFirstCharacter() == false){

      var response = {

        "text": "You used the wrong syntax or that person isn't on your team. Give karma like \"++ @username\"",
        "parse":"none"
      }

      this.callback(response)
      console.log("Wrong syntax. Give karma like ++ @someone");
      return false;
    }

    else if(this.checkFirstCharacter() == true){

      return true;

    }

  }

  // I have to say, this function is pretty clever. If I type in @gabe (who is in a team on slack),
  // slack doesn't send the plaintext "@gabe." It instead sends this weird slack code
  // formatted like <@#####> that auto hyperlinks to a user in slack. If @gabe is not on a team in slack,
  // then slack just sends the plaintext, since slack auto hyperlinks people who are on a team.

  this.checkFirstCharacter = function(){

    if(this.name != "leaderboard"){

      var firstCharacters = this.name.substring(0, 2);

      if(firstCharacters == "<@"){
        return true;
      }
      else{
        return false;
      }

    }else{

      return true;
    }

  }

}

module.exports = Validation;
