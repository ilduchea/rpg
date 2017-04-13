//============
// BACK END
//============
function Game() {
  this.char;
  this.rollCount = 3;
  this.statsToAlloc = 5;
  this.ready = false;
  this.enemies = [];
  this.enemyLevel = 1;
  this.characters = [];
  this.fightRound = 0;
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
  this.level = 1;
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

Game.prototype.updateRollCount = function() {
  if (this.rollCount >= 0) {
    this.rollCount -= 1;
  } else {
    console.log("you're out of rolls");
  }
}

Character.prototype.addEnemy = function() {
  newGame.enemies.push(this);
}

Character.prototype.charInputToStats = function() {
  this.str = parseInt($("#input-str").val());
  this.dex = parseInt($("#input-dex").val());
  this.int = parseInt($("#input-int").val());
  this.con = parseInt($("#input-con").val());
  this.hitPoints = (this.con * 10);
}

Enemy.prototype.createEnemy = function(game) {
  var str = dieRoll2to8();
  var dex = dieRoll2to8();
  var int = dieRoll2to8();
  var con = dieRoll2to8();
  //Increment enemy levels by 2 every 4th time the player wins
  var charWins = game.enemies.length;
  var getLevelIncrement = function(i) {
    if ((i > 0) && (i % 4 === 0)) {
      game.enemyLevel += 2;
      // return currentEnemyLevel;
    }
  }
  getLevelIncrement(charWins);
  let currentEnemyLevel = game.enemyLevel;
  console.log(game);
  //End enemy level check

  this.str = str;
  this.dex = dex;
  this.int = int;
  this.con = con + (2 * currentEnemyLevel);
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
    this.str = parseInt(this.str + (3 * currentEnemyLevel));
  } else if (enemyClassRoll === 2) {
    this.enemyClass = "Ranger";
    this.dex = parseInt(this.dex + (3 * currentEnemyLevel));
  } else {
    this.enemyClass = "Mage";
    this.int = parseInt(this.int + (3 * currentEnemyLevel));
  }
  if (enemyGenderRoll === 1) {
    this.gender = "Male";
  } else {
    this.gender = "Female";
  }
  game.enemies.unshift(this);
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
// random die number generator (2-8)
var dieRoll2to8 = function() {
  return Math.floor(Math.random() * 7) + 2;
}
// main attack roll generator
var attackRoll = function(){
  return Math.floor(Math.random() * 20) + 1;
}
// check for winning condition
var checkHealth = function(char, enemy, game){
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
  var newChar = new Character();   // this needs to move into the game

  // MASTER ROLL compare between char and enemy
  var compareRolls = function (roll1, roll2, char, enemy){
    if (roll1 > roll2){
      $("#character .damage").text("");
      $("#results p").text("");
      enemy.hitPoints = enemy.hitPoints - (roll1 - roll2);
      $("#enemy .damage").text("-" + (roll1 - roll2));
    } else if (roll2 > roll1){
      $("#enemy .damage").text("");
      $("#results p").text("");
      char.hitPoints = char.hitPoints - (roll2 - roll1);
      $("#character .damage").text("-" + (roll2 - roll1));
    } else {
      $("#enemy .damage").text("");
      $("#character .damage").text("");
      $("#results p").text("Parry!");
    }
  };
  // update a group of char combat texts
  var updateCharCombatCardStats = function() {
    $("#charName").text(newChar.name);
    $("#charStr").text(newChar.str);
    $("#charDex").text(newChar.dex);
    $("#charInt").text(newChar.int);
    $("#charCon").text(newChar.con);
  }
  // change character health bar look based on percent of HP
  var updateCharHealthBar = function() {
    // update bar LABEL
    $(".char-hp-bar span").text(newChar.hitPoints + " / " + (newChar.con * 10));
    // update bar FILL
    let percentFull = Math.round( ( newChar.hitPoints / (newChar.con * 10) ) * 100 );
    let percentFullStr = ("width: " + percentFull + "%");
    $(".char-hp-bar .progress-bar").prop("style" , percentFullStr);
    // remove old COLOR classes
    $(".char-hp-bar .progress-bar").removeClass("progress-bar-success");
    $(".char-hp-bar .progress-bar").removeClass("progress-bar-warning");
    $(".char-hp-bar .progress-bar").removeClass("progress-bar-danger");
    // update bar new COLOR class
    if (percentFull >= 60) {
      $(".char-hp-bar .progress-bar").addClass("progress-bar-success");
    } else if ((percentFull < 60) && (percentFull >= 25)) {
      $(".char-hp-bar .progress-bar").addClass("progress-bar-warning");
    } else if ((percentFull < 25) && (percentFull > 0)) {
      $(".char-hp-bar .progress-bar").addClass("progress-bar-danger");
    } else {
      console.log("char DIED bruh!");
    }
  }
  // change enemy health bar look based on percent of HP
  var updateEnemyHealthBar = function() {
    // update bar LABEL
    let tmpEnemy = newGame.enemies[0];
    // console.log("enemies[0]", tmpEnemy);
    // console.log("typeof tmpEnemy.hitPoints :", typeof tmpEnemy.hitPoints);
    $(".enemy-hp-bar span").text(tmpEnemy.hitPoints + " / " + (tmpEnemy.con * 10));
    // update bar FILL
    let percentFull = Math.round( (tmpEnemy.hitPoints / (tmpEnemy.con * 10) ) * 100 );
    let percentFullStr = ("width: " + percentFull + "%");
    $(".enemy-hp-bar .progress-bar").prop("style" , percentFullStr);
    // remove old COLOR classes
    $(".enemy-hp-bar .progress-bar").removeClass("progress-bar-success");
    $(".enemy-hp-bar .progress-bar").removeClass("progress-bar-warning");
    $(".enemy-hp-bar .progress-bar").removeClass("progress-bar-danger");
    // update bar new COLOR class
    if (percentFull >= 60) {
      $(".enemy-hp-bar .progress-bar").addClass("progress-bar-success");
    } else if ((percentFull < 60) && (percentFull >= 25)) {
      $(".enemy-hp-bar .progress-bar").addClass("progress-bar-warning");
    } else if ((percentFull < 25) && (percentFull > 0)) {
      $(".enemy-hp-bar .progress-bar").addClass("progress-bar-danger");
    } else {
      console.log("enemy DIED, huzzah!");
    }
  }
  // change enemy based on...
  var enemyImageCardChange = function(){
    let enemy = newGame.enemies[0];
    let enemyClass = enemy.enemyClass;
    let enemyGender = enemy.gender;
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
  // check that character creation is complete before proceeding to combat
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
  // START the game
  $("#start-btn").click(function(){
    $(".well").hide();
    $(".char-creation").slideDown(500);
  });
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
  // ACCEPT ROLL button
  $("#accept-roll").click(function() {
    $(".char-8die").hide();
    $("#stats-left").text(newGame.statsToAlloc);
    $(".char-stats-alloc").fadeIn(400);
    $("#table2 .stat-cross-img").fadeIn(400);
  });
  // LEVEL UP BUTTON
  $("#levelUpBtn").click(function() {
    //disable name, class, gender inputs
    $("#input-name").attr('disabled', 'disabled')
    $(".char-creation .char-class").attr('disabled', 'disabled')
    $(".char-creation .char-gender").attr('disabled', 'disabled')
    // transition play area
    $("").text("LEVEL UP");
    // show and hide proper rows
    $(".combat").hide();
    $(".char-creation").slideDown(500);
    // refresh stats allocator
    newGame.statsToAlloc = 5;
    $("#stats-left").text(newGame.statsToAlloc);
    // show statup images
    $(".char-stats-alloc").fadeIn(600);
    $("#table2 .stat-cross-img").fadeIn(600)
    // change header text to say level up
    $("#char-title1").text("LEVEL UP!");
    $("#char-title2").text("...you feel yourself growing stronger...");
    // show and hide proper rows
    newChar.level += 1; //Increment character level.
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
      $("#table2 .stat-cross-img").hide();
      $(".char-stats-alloc").hide();
      // handle showing correct play button
      if (newGame.fightRound === 0) {
        $("#lets-play").fadeIn(400);
      } else {
        $("#continue-play").fadeIn(400);
      }
    }
  });
  // LETS PLAY, click to enter the combat screen
  $("#lets-play").click(function() {
    // check if name has been entered
    if (checkGameReady() === true) {
      // get starting stats for char from inputs
      newChar.name = $("#input-name").val();
      newChar.charClass = $(".char-class option:selected").val();
      newChar.gender = $(".char-gender option:selected").val();
      // grab stats form UI and store them in char
      newChar.charInputToStats();
      // update combat char card with new stats
      updateCharHealthBar();
      updateCharCombatCardStats();
      $(".char-creation").slideUp(400);
      $(".combat").slideDown(400);
      $(".attacks").hide();
      $("#lets-play").hide();
    }
  });
  // CONTINUE onto the combat screen after leveling up
  $("#continue-play").click(function() {
    newChar.charInputToStats();
    updateCharCombatCardStats();
    updateCharHealthBar();
    $(".attacks").hide();
    $("#levelUpBtn").hide();
    $("#continue-play").hide();
    $("#enemy").removeClass("enemy-lose");
    $("#character").removeClass("winner");
    $("#results p").text("");
    $("#attackBtn").show();
    // refresh enemy bar for better appearence
    $(".enemy-hp-bar .progress-bar").prop("style" , "width: 100%");
    $(".enemy-hp-bar span").text("");
    $(".char-creation").slideUp(400);
    $(".combat").slideDown(400);
  });
  // Click REVEAL ENEMY, update combat text area
  $("#revealText").click(function(){
    newGame.fightRound += 1;
    let newEnemy = new Enemy();
    newEnemy.createEnemy(newGame);
    newChar.hitPoints = (newChar.con * 10);
    enemyImageCardChange();
    $("#back").toggleClass("hide");
    $("#revealText").hide();
    $("#results p").text("");
    $(".attacks, #attackBtn").show();
    $("#enemyNameInput").text(newEnemy.enemyClass);
    $("#enemyStrInput").text(newEnemy.str);
    $("#enemyDexInput").text(newEnemy.dex);
    $("#enemyIntInput").text(newEnemy.int);
    $("#enemyConInput").text(newEnemy.con);
    updateCharHealthBar();
    updateEnemyHealthBar();
  });
  // ATTCK BUTTON!
  $("#attackBtn").click(function(){
    $(".attacks").addClass("shake");
    $(".attacks").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
    function(e) {
    // code to execute after animation ends
    $(".attacks").removeClass("shake");
    });
    let newEnemy = newGame.enemies[0];
    var attackMod = getAttackStat(newChar);
    var enemyMod = getAttackStat(newEnemy);
    var characterAttackRoll = attackRoll();
    var enemyAttackRoll = attackRoll();
    var characterAttack = characterAttackRoll + attackMod;
    var enemyAttack = enemyAttackRoll + enemyMod;
    compareRolls(characterAttack, enemyAttack, newChar, newEnemy);
    updateEnemyHealthBar();
    updateCharHealthBar();
    var health = checkHealth(newChar, newEnemy, newGame);
    // check who wins and update images and animations
    if (health === "You Win!"){
      if ((newGame.enemies.length % 2)===0){
        //Corecctly displays Game winning screen when player gets level 3. Set the neumber to 1 less then the winning level.
        if (newChar.level === 2){
          $(".combat").slideUp();
          $("#row-winner").slideDown();
        } else {
          $("#levelUpBtn").show();
        }
      }

      $("#back").toggleClass("hide");
      $("#revealText").show();
      $("#enemy").removeClass();
      $("#enemy").addClass("enemy_card enemy-lose");
      $("#character").addClass("winner");
      $("#attackBtn").hide();
      $("#enemy .damage").text("");
      $("#results p").text("You Win!");

    } else if (health === "You lose") {
      $("#try-again, #character").toggleClass("hide");
      $("#try-again").addClass("char-lose");
      $("#enemy").addClass("winner");
      $("#attackBtn").hide();
      $("#character .damage").text("");
      $("#results p").text("You Lose");
    }  // END IF - win/lose
    // display roll numbers at top of screen and on cards
    $("#hero-attack .roll").text(characterAttackRoll + " + ");
    $("#hero-attack .mod").text(attackMod + " = ");
    $("#hero-attack .total").text(characterAttack);
    $("#enemy-attack .roll").text(enemyAttackRoll + " + ");
    $("#enemy-attack .mod").text(enemyMod + " = ");
    $("#enemy-attack .total").text(enemyAttack);
  });  // END #attackBtn function
  // TRY AGAIN text when char dies
  $("#try-again").click(function(){
    // var currentEnemy = newGame.enemies[0];
    // newChar.hitPoints = (newChar.con * 10);
    // currentEnemy.hitPoints = (currentEnemy.con * 10);
    // updateCharHealthBar();
    // updateEnemyHealthBar();
    // $("#attackBtn").show();
    $("#try-again, #character").toggleClass("hide");
    $("#character, #enemy, #try-again").removeClass("winner enemy-lose char-lose");
    $(".combat").hide();
    $("#row-loser").show();
  })
  // simple page reload button, used on game over screen
  $(".reset-btn").click(function() {
    location.reload();
  });

});  // END DOCUMENT READY CALLBACK FUNCTION
