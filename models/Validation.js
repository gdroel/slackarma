var Validation = function(name, username, callback){

  this.name = name;
  this.username = username;
  this.callback = callback;

  this.check = function(){

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

    var firstCharacter = this.name.substring(0, 1);

    if(firstCharacter === "@"){
      return true
    }
    else{
      return false
    }

  }

  //Makes sure someone isn't giving karma to themselves
  this.checkIfSameUsername = function(){

    var username = "@"+this.username;
    if(username == this.name){
      return false
    }else{
      return true;
    }
  }

}

module.exports = Validation;
