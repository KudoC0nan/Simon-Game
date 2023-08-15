var buttonColours = ["red" , "blue" , "green" , "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = 0;

if (!started) {
    $(document).keypress(nextSequence);
    started++;
}

function nextSequence() {
    level++;
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    $("#level-title").text("Level " + level);
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(200);
    $("#" + randomChosenColour).fadeIn(200);
    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout( function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(".btn").click(function (event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    animatePress(userChosenColour);
    playSound(userChosenColour);
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(nextSequence , 1000);
        }
    }

    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        } , 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function playSound(sound) {
    var clip = new Audio("sounds/" + sound + ".mp3");
    clip.play();
}

function startOver () {
    level = 0;
    gamePattern = [];
    started = 0;
}