//============
// BACK END
//============
function Game() {
  this.char;
  this.rollCount = 3;
  this.statsToAlloc = 5;
  this.ready = false;
  this.enemies = [];
  this.characters = [];
}

function Character() {
  this.name = "";
  this.charClass = "";
  this.gender = "";
  this.str = 0;
  this.dex = 0;
  this.int = 0;
  this.con = 0;
}

Character.prototype.addEnemy = function() {
  newGame.enemies.push(this);
}

Game.prototype.updateRollCount = function() {
  if (this.rollCount >= 0) {
    this.rollCount -= 1;
  } else {
    console.log("you're out of rolls");
  }
}

function Enemy() {
  this.enemyClass = "";
  this.gender = "";
  this.str = 0;
  this.dex = 0;
  this.int = 0;
  this.con = 0;
}

Enemy.prototype.createEnemy = function() {
  var str = dieRoll2to8();
  var dex = dieRoll2to8();
  var int = dieRoll2to8();
  var con = dieRoll2to8();

  this.str = str;
  this.dex = dex;
  this.int = int;
  this.con = con;

  var randomEnemyClass = function() {
    return Math.floor(Math.random() * 3) + 1;
  }
  var randomEnemyGender = function() {
    return Math.floor(Math.random() * 2) + 1;
  }
  var enemyClassRoll = randomEnemyClass();
  var enemyGenderRoll = randomEnemyGender();
  if (enemyClassRoll === 1) {
    this.enemyClass = "Warrior";
  } else if (enemyClassRoll === 2) {
    this.enemyClass = "Ranger";
  } else {
    this.enemyClass = "Mage";
  }
  if (enemyGenderRoll === 1) {
    this.gender = "Male";
  } else {
    this.gender = "Female";
  }
}

var getAttackStat = function(entity){
  var str = entity.str;
  var dex = entity.dex;
  var int = entity.int;
  if (str >= dex && str >= int){
    return parseInt(str);
  } else if (dex >= str && dex >= int){
    return parseInt(dex);
  } else if (int >= str && int >= dex){
    return parseInt(int);
  }
};
//random die number generator (2-8)
var dieRoll2to8 = function() {
  return Math.floor(Math.random() * 7) + 2;

}

var attackRoll = function(){
  return Math.floor(Math.random() * 20) + 1;
}

//=============
// FRONT END
//=============
$(document).ready(function() {

  var newGame = new Game();
  var newEnemy = new Enemy();
  var newChar = new Character();

  var enemyImageCardChange = function(){
    let enemyClass = newEnemy.enemyClass;
    let enemyGender = newEnemy.gender;
    if (enemyGender === "Male"){
      switch (true){
        case (enemyClass === "Warrior"):
          $("#enemy").removeClass();
          $("#enemy").addClass("dark_warrior_male1");
          break;
        case (enemyClass === "Mage"):
          $("#enemy").removeClass();
          $("#enemy").addClass("dark_wizard_male1");
          break;
        case (enemyClass === "Ranger"):
          $("#enemy").removeClass();
          $("#enemy").addClass("dark_ranger_male1");
          break;``
        default:
          console.log("switch default!");
      }  // end switch
    } else if (enemyGender === "Female") {
        switch (true){
          case (enemyClass === "Warrior"):
            $("#enemy").removeClass();
            $("#enemy").addClass("dark_warrior_fem1");
            break;
          case (enemyClass === "Mage"):
            $("#enemy").removeClass();
            $("#enemy").addClass("dark_wizard_fem1");
            break;
          case (enemyClass === "Ranger"):
            $("#enemy").removeClass();
            $("#enemy").addClass("dark_ranger_fem1");
            break;
          default:
            console.log("switch default!");
        }
    } else {
        console.log("gender neutral")
    } // END IF statement
  };

  // function to handle ALL char image changes
  var charImageCardChange = function() {
    let userClass = $(".char-class option:selected").val();
    let userGender = $(".char-gender option:selected").val();
    if (userClass === "Select") {
      $(".char-img").attr('src', 'img/arms1.png');
      $(".combat #character").removeClass();
    } else {
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
      } else if (userGender === "Other") {
        $(".char-img").attr('src', 'img/unicorn1.png');
        $(".combat #character").removeClass();
        $(".combat #character").addClass("unicorn1");
      } else {
          console.log("need to select")
      } // END sub IF
    } // END master IF
  } // END charImageCardChange function

  var checkGameReady = function() {
    $("#no-name").text("");
    $("#no-roll").text("");
    $("#no-class").text("");
    $("#no-gender").text("");
    if (($("#input-name").val() === "") || (newGame.rollCount === 3) || ($(".char-class").val() === "Select") || ($(".char-gender").val() === "Select")) {
      newGame.ready = false;
      if ($("#input-name").val() === "") {
        $("#no-name").text("<--");
      }
      if (newGame.rollCount === 3) {
        $("#no-roll").text("<--");
      }
      if ($(".char-class").val() === "Select") {
        $("#no-class").text("<--");
      }
      if ($(".char-gender").val() === "Select") {
        $("#no-gender").text("<--");
      }
    } else {
      newGame.ready = true;
    }
    return newGame.ready;
  }

  // check if the CLASS dropdown was clicked and update the image
  $("select.char-class").change(function() {
    $("#no-class").text("");
    charImageCardChange();
  });
  // check if the GENDER dropdown was clicked and update the image
  $("select.char-gender").change(function() {
    $("#no-gender").text("");
    charImageCardChange();
  });
  // role the 8-sided die and update stats when die is clicked
  $("#die8").click(function() {
    // show the "accept-roll" button for the first time
    $("#accept-roll").fadeIn(400);
    //check if rolls are left and update the game object
    newGame.updateRollCount();
    if (newGame.rollCount >= 0) {
      $("#rolls-left").text(newGame.rollCount);
      $("#input-str").val(dieRoll2to8());
      $("#input-dex").val(dieRoll2to8());
      $("#input-int").val(dieRoll2to8());
      $("#input-con").val(dieRoll2to8());
      $("#no-roll").text("");
    }
  });

  $("#accept-roll").click(function() {
    $(".char-8die").hide();
    $(".char-stats-alloc").fadeIn(400);
    $("#table2 .stat-cross-img").fadeIn(400);
  });

  $("#lets-play").click(function() {
    // check if name has been entered
    if (checkGameReady() === true) {
      // get starting stats for char from inputs
      newChar.name = $("#input-name").val();
      newChar.charClass = $(".char-class option:selected").val();
      newChar.gender = $(".char-gender option:selected").val();
      newChar.str = $("#input-str").val();
      newChar.dex = $("#input-dex").val();
      newChar.int = $("#input-int").val();
      newChar.con = $("#input-con").val();
      // update combat char card with new stats

      $("#charName").text(newChar.name);
      $("#charStr").text(newChar.str);
      $("#charDex").text(newChar.dex);
      $("#charInt").text(newChar.int);
      $("#charCon").text(newChar.con);
      $(".char-creation").hide();
      $(".combat").show();
      // console.log("newChar = " , newChar);
    }
  });

  $("#revealText").click(function(){
    newEnemy.createEnemy();
    enemyImageCardChange();
    $("#revealText").hide();
    $("#enemy div").removeClass("hide");
    $("#enemyNameInput").text(newEnemy.enemyClass);
    $("#enemyStrInput").text(newEnemy.str);
    $("#enemyDexInput").text(newEnemy.dex);
    $("#enemyIntInput").text(newEnemy.int);
    $("#enemyConInput").text(newEnemy.con);
  });

  $("#attack").click(function(){
    var attackMod = getAttackStat(newChar);
    var enemyMod = getAttackStat(newEnemy);
    var characterAttack = attackRoll() + attackMod;
    var enemyAttack = attackRoll() + enemyMod;

    $("#hero-attack").text(characterAttack);
    $("#enemy-attack").text(enemyAttack);
  });
  // simple page reload button function

  $("#btnReset").click(function() {
    location.reload();
  });

});
