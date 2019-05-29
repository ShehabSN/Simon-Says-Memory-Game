var buttonColours = ["red", "blue", "green", "yellow"];

var gameSequence = [];
var userSequence = [];

var firstPress = false;
var level = 0;

//Listens for the first key press to start the game
$(document).on("keypress", function() {
  if (!firstPress) {
    nextSequence();
    firstPress = true;
  }
})

//Listens for button clicks
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userSequence.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userSequence.length - 1);

})

//Creates the next random color in the sequence
function nextSequence() {
  userSequence = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gameSequence.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}

//Takes the name of the sound file as a paramater and plays the file
function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

//Animates the button when clicked
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Tests if the user's click is the right answer
function checkAnswer(currentLevel) {
  if (gameSequence[currentLevel] === userSequence[currentLevel]) {
    if ((gameSequence.length) === (userSequence.length)) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");

    reset();
  }
}

//Resets the level, game sequence, and the first press boolean to the initial game state
function reset() {
  level = 0;
  gameSequence = [];
  firstPress = false;

}
