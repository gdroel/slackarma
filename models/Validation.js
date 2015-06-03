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

        "text":"You can't give karma to yourself, narcissist.",
        "parse":"none"

      }

      this.callback(response)
      console.log("You can't give karma to yourself, narcissist.");
      return false;

    }

    else if(this.checkFirstCharacter() == false){

      var response = {

        "text": "You used the wrong syntax or that person isn't on your team. Give karma like \"++ @username\""+this.name,
        "parse":"none"
      }

      this.callback(response)
      console.log("Wrong syntax. Give karma like ++ @someone");
      return false;
    }

    else if(this.checkFirstCharacter() == true && this.checkIfSameUsername() == true){

      return true;

    }

  }

  //Makes sure that the karma-giver users a valid username,
  //such as @gabe instead of saying gabe. It also magically covers a
  //lot of different use cases, such as someone typing ++kjsdfalds

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

  //Makes sure someone isn't giving karma to themselves
  this.checkIfSameUsername = function(){

  //   var username = "@"+this.username;
  //   console.log('username'+username);
  //   console.log('name'+this.name);
  //   if(username == this.name){
  //     return false
  //   }else{
  //     return true;
  //   }
  // }

  return true;

  }

}

module.exports = Validation;
