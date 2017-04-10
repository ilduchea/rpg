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

  // function to handle ALL char image changes
  var charImageCardChange = function() {
    let userClass = $(".char-class option:selected").val();
    let userGender = $(".char-gender option:selected").val();
    if (userGender === "Male") {
      switch (true) {
        case (userClass === "Warrior"):
          $(".char-img").attr('src', 'img/warrior_male1.png');
          $(".combat #character").removeClass();
          $(".combat #character").addClass("warrior_male1");
          break;
        case (userClass === "Mage"):
          $(".char-img").attr('src', 'img/mage_male1.png');
          $(".combat #character").removeClass();
          $(".combat #character").addClass("mage_male1");
          break;
        case (userClass === "Ranger"):
          $(".char-img").attr('src', 'img/ranger_male1.png');
          $(".combat #character").removeClass();
          $(".combat #character").addClass("ranger_male1");
          break;
        default:
          console.log("switch default!");
      }  // end switch
    } else if (userGender === "Female") {
      switch (true) {
        case (userClass === "Warrior"):
          $(".char-img").attr('src', 'img/warrior_fem1.png');
          $(".combat #character").removeClass();
          $(".combat #character").addClass("warrior_fem1");
          break;
        case (userClass === "Mage"):
          $(".char-img").attr('src', 'img/mage_fem1.png');
          $(".combat #character").removeClass();
          $(".combat #character").addClass("mage_fem1");
          break;
        case (userClass === "Ranger"):
          $(".char-img").attr('src', 'img/ranger_fem1.png');
          $(".combat #character").removeClass();
          $(".combat #character").addClass("ranger_fem1");
          break;
        default:
          console.log("switch default!");
      }  // end switch
    } else {
      console.log("gender neutral")
    } // END IF statement
  }

  // check if the CLASS dropdown was clicked and update the image
  $("select.char-class").change(function() {
    charImageCardChange();
  });
  // check if the GENDER dropdown was clicked and update the image
  $("select.char-gender").change(function() {
    charImageCardChange();
  });

  // simple page reload button function
  $("#btnReset").click(function() {
    location.reload();
  });

});
