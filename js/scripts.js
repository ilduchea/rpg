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
  this.hitPoints = 0;
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
  this.hitPoints = 0;
}

Enemy.prototype.createEnemy = function() {
  var str = dieRoll2to8();
  var dex = dieRoll2to8();
  var int = dieRoll2to8();
  var con = dieRoll2to8();

  this.str = str;
  this.dex = dex;
  this.int = int;
  this.con = con + 2;
  this.hitPoints = this.con * 10;

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
    this.str = parseInt(this.str + 3);
  } else if (enemyClassRoll === 2) {
    this.enemyClass = "Ranger";
    this.dex = parseInt(this.dex + 3);
  } else {
    this.enemyClass = "Mage";
    this.int = parseInt(this.int + 3);
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
  if ((str >= dex) && (str >= int)){
    return parseInt(str);
  } else if ((dex >= str) && (dex >= int)){
    return parseInt(dex);
  } else if ((int >= str) && (int >= dex)){
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

var compareRolls = function (roll1, roll2, char, enemy){
  if (roll1 > roll2){
    enemy.hitPoints = enemy.hitPoints - (roll1 - roll2);
    return "You hit for " + (roll1 - roll2) + " damage.";
  } else if (roll2 > roll1){
    char.hitPoints = char.hitPoints - (roll2 - roll1);
    return "You take " + (roll2 - roll1) + " points of damage.";
  } else {
    return "It is a tie! Try again..."
  }
};

var checkHealth = function(char, enemy){
  if (enemy.hitPoints <= 0) {
    return "You Win!";
  } else if (char.hitPoints <= 0) {
    return "You lose";
  }
}

//=============
// FRONT END
//=============
$(document).ready(function() {

  var newGame = new Game();
  var newEnemy = new Enemy();
  var newChar = new Character();

  $("#start-btn").click(function(){
    $(".well").hide();
    $(".char-creation").slideDown(500);
  });

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
      $("#input-hp").val(parseInt($("#input-con").val()) * 10);
      $("#no-roll").text("");
    }
  });

  $("#accept-roll").click(function() {
    $(".char-8die").hide();
    $("#stats-left").text(newGame.statsToAlloc);
    $(".char-stats-alloc").fadeIn(400);
    $("#table2 .stat-cross-img").fadeIn(400);
  });

  // CLICK ON STAT CROSS
  $(".stat-cross-img").click(function() {
    // get ID name of stat image clicked
    let statClicked = $(this).attr("id");
    // update the correct stat in UI
    if (statClicked === "statUpStr") {
      $("#input-str").val( parseInt($("#input-str").val()) + 1 );
    } else if (statClicked === "statUpDex") {
      $("#input-dex").val( parseInt($("#input-dex").val()) + 1 );
    } else if (statClicked === "statUpInt") {
      $("#input-int").val( parseInt($("#input-int").val()) + 1 );
    } else if (statClicked === "statUpCon") {
      $("#input-con").val( parseInt($("#input-con").val()) + 1 );
      $("#input-hp").val(parseInt($("#input-con").val()) * 10)
    } else {
      console.log("statClicked problem");
    }

    newGame.statsToAlloc -= 1;
    $("#stats-left").text(newGame.statsToAlloc);

    // out of stats? buttons disappear
    if (newGame.statsToAlloc === 0) {
      $(".char-stats-alloc").fadeOut(400);
      $("#table2 .stat-cross-img").hide();
    }
  });

  $("#lets-play").click(function() {
    // check if name has been entered
    if (checkGameReady() === true) {
      // get starting stats for char from inputs
      newChar.name = $("#input-name").val();
      newChar.charClass = $(".char-class option:selected").val();
      newChar.gender = $(".char-gender option:selected").val();
      newChar.str = parseInt($("#input-str").val());
      newChar.dex = parseInt($("#input-dex").val());
      newChar.int = parseInt($("#input-int").val());
      newChar.con = parseInt($("#input-con").val());
      newChar.hitPoints = (newChar.con * 10);
      console.log("newChar.con * 10" , newChar.con * 10);
      // update combat char card with new stats

      $("#charName").text(newChar.name);
      $("#charStr").text(newChar.str);
      $("#charDex").text(newChar.dex);
      $("#charInt").text(newChar.int);
      $("#charCon").text(newChar.con);
      $(".char-creation").slideUp(400);
      $(".combat").slideDown(400);
      $(".attacks").hide();
      console.log("newChar = " , newChar);
    }
  });

  $("#revealText").click(function(){
    newEnemy.createEnemy();
    enemyImageCardChange();
    $("#back").toggleClass("hide");
    $("#revealText").toggle();
    $(".attacks, #attack").show();
    $(".attacks").removeClass("attack");
    $("#enemyNameInput").text(newEnemy.enemyClass);
    $("#enemyStrInput").text(newEnemy.str);
    $("#enemyDexInput").text(newEnemy.dex);
    $("#enemyIntInput").text(newEnemy.int);
    $("#enemyConInput").text(newEnemy.con);
  });

  $("#attack").click(function(){
    var attackMod = getAttackStat(newChar);
    var enemyMod = getAttackStat(newEnemy);
    var characterAttackRoll = attackRoll();
    var enemyAttackRoll = attackRoll();
    var characterAttack = characterAttackRoll + attackMod;
    var enemyAttack = enemyAttackRoll + enemyMod;
    var results = compareRolls(characterAttack, enemyAttack, newChar, newEnemy);
    var health = checkHealth(newChar, newEnemy);
    $(".attacks").addClass("attack");
    $("#enemy, #character").removeClass("winner");

    if (health === "You Win!"){
      $("#back").toggleClass("hide");
      $("#revealText").toggle();
      $("#enemy").removeClass();
      $("#enemy").addClass("enemy_card enemy-lose");
      $("#character").addClass("winner");
      $("#attack").hide();
    } else if (health === "You lose") {
      $("#lose, #character").toggleClass("hide");
      $("#lose").addClass("char-lose");
      $("#enemy").addClass("winner")
      $("#attack").hide();
    }

    $("#hero-attack .roll").text(characterAttackRoll + " + ");
    $("#hero-attack .mod").text(attackMod + " = ");
    $("#hero-attack .total").text(characterAttack);
    $("#enemy-attack .roll").text(enemyAttackRoll + " + ");
    $("#enemy-attack .mod").text(enemyMod + " = ");
    $("#enemy-attack .total").text(enemyAttack);
    $("#results p").text(results);
    $("#char-hitPoints p").text(newChar.hitPoints);
    $("#enemy-hitPoints p").text(newEnemy.hitPoints);
  });

  $("#lose").click(function(){
    $("#lose, #character").toggleClass("hide");
    $("#character, #enemy, #lose").removeClass("winner enemy-lose char-lose");
    $(".attacks").removeClass("attack");
    $("#attack").show();
  })

  // simple page reload button - maybe use this later
  $("#btnReset").click(function() {
    location.reload();
  });

});
