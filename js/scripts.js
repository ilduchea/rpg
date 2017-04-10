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

  // change character image - when user selects from dropdown
  $("select.char-class").change(function() {
    let userClass = $(".char-class option:selected").val();
    console.log("class changed to: " , userClass);
    switch (true) {
      case (userClass === "Warrior"):
        $("#char-img").attr('src', 'img/warrior_male1.png')
        break;
      case (userClass === "Mage"):
        $("#char-img").attr('src', 'img/mage_male1.png')
        break;
      case (userClass === "Ranger"):
        $("#char-img").attr('src', 'img/ranger_male1.png')
        break;
      default:
        console.log("switch default!");
    }
  });



  // simple page reload button function
  $("#btnReset").click(function() {
    location.reload();
  });

});
