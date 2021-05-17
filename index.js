
var buttonColors = ["red", "blue", "green", "yellow"]; // Array of button colors

var gamePattern = []; // Generate game pattern

var userClickedPattern = []; // Generate user's clicked pattern

var level = 0;

var started = false;


// Detect when key was pressed to start the game

$(".btn-start").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// When user clicks a button

$(".btn-clr").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

//Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

// Check user's answers
function checkAnswer(currentLevel) {

//Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      gameOver();
      startOver();
    };
   };

function nextSequence() {

//Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};


 // Identify user's clicked buttons

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

// Add animation to pressed button

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

// If user clicks the wrong button
function gameOver() {

  $("#level-title").text("Game over. Try again");
  $("body").addClass("game-over");
  setTimeout(function () {
  $("body").removeClass("game-over");
  }, 200);
};

// Restart the game
function startOver () {
  level = 0;
  gamePattern = [];
  started = false;
};
