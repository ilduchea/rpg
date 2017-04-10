// BACK END
function Game() {
  this.char;
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

function Enemy() {
  this.enemyClass = "";
  this.gender = "";
  this.str = 0;
  this.dex = 0;
  this.int = 0;
  this.con = 0;
}

Enemy.prototype.createEnemy = function(){
  var str = dieRoll2to8();
  var dex = dieRoll2to8();
  var int = dieRoll2to8();
  var con = dieRoll2to8();

  this.str = str;
  this.dex = dex;
  this.int = int;
  this.con = con;

  var randomEnemyClass = function(){
    return Math.floor(Math.random() * 3) + 1;
  }
  var randomEnemyGender = function(){
    return Math.floor(Math.random() * 2) + 1;
  }
  var enemyClassRoll = randomEnemyClass();
  var enemyGenderRoll = randomEnemyGender();
  if (enemyClassRoll === 1){
    this.enemyClass = "Warrior";
  } else if (enemyClassRoll === 2){
    this.enemyClass = "Ranger";
  } else {
    this.enemyClass = "Mage";
  }
  if (enemyGenderRoll === 1){
    this.gender = "Male";
  } else {
    this.gender = "Female";
  }
}

//random die number generator (2-8)
var dieRoll2to8 = function() {
  return Math.floor(Math.random() * 7) + 2;
}



// FRONT END
$(document).ready(function() {

  var newGame = new Game();
  var newEnemy = new Enemy();
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
  // role the 8-sided die and update stats when die is clicked
  $("#die8").click(function() {
    $("#input-str").val(dieRoll2to8());
    $("#input-dex").val(dieRoll2to8());
    $("#input-int").val(dieRoll2to8());
    $("#input-con").val(dieRoll2to8());
  });

  // simple page reload button function
  $("#btnReset").click(function() {
    location.reload();
  });

});
