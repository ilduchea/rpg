// BACK END
function Game(char) {
  this.char = char;
  this.enemies = [];
}

function Character(name, charClass, gender, str, dex, int, con) {
  this.name = name;
  this.charClass = charClass;
  this.gender = gender;
  this.str = str;
  this.dex = dex;
  this.int = int;
  this.con = con;
}

Character.prototype.addEnemy = function () {
  newGame.enemies.push(this);
};






// FRONT END
$(document).ready(function() {





  // simple page reload button function
  $("#btnReset").click(function() {
    location.reload();
  });

});
