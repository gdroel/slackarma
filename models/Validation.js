var Validation = function(name, username, callback){

  this.name = name;
  this.username = username;
  this.callback = callback;

  this.check = function(){

    // Note: check if same username is completely broken. You still can't
    // give karma to yourself, but for some reason when username is passed
    // as a parameter it becomes a weird string like: <@U04RL0M1F>

    if(this.checkIfSameUsername() == false){

      var response = {

        "text":"You can't give karma to yourself, narcissist."

      }

      this.callback(response)
      console.log("You can't give karma to yourself, narcissist.");
      return false;

    }

    else if(this.checkFirstCharacter() == false){

      var response = {

        "text": "You used the wrong syntax. Give karma like \"++ @someone\""
      }

      this.callback(response)
      console.log("Wrong syntax. Give karma like ++ @someone");
      return false;
    }

    else if(this.checkFirstCharacter() == true && this.checkIfSameUsername() == true){

      return true;

    }

  }

  this.checkFirstCharacter = function(){

    if(this.name != "leaderboard"){

      var firstCharacter = this.name.substring(0, 1);

      if(firstCharacter == "@"){
        return true;
      }
      else{
        return false;
      }

    }else{

      return true;
    }

  }

  //Makes sure someone isn't giving karma to themselves
  this.checkIfSameUsername = function(){

    var username = "@"+this.username;
    console.log('username'+username);
    console.log('name'+this.name);
    if(username == this.name){
      return false
    }else{
      return true;
    }
  }

}

module.exports = Validation;
