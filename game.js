var colors = ['blue', 'green', 'red', 'yellow'];
var level = 0;
var started = false;
var clicked=false;
var clickCount=0;
$(document).on('keypress', function () {
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
        clicked=true;
    }
});

if(!clicked)
{
$(document).dblclick(function () {
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
        clicked =  true;
    }
});
}
var gamePattern = [];
var userPattern = [];

function nextSequence() {

    var random = Math.floor(Math.random() * 4);
    var chosenColor = colors[random];
    gamePattern.push(chosenColor);
    $("#" + chosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + chosenColor + ".mp3");
    audio.play();

}
$(".btn").on("click", function () {
    var userChosenColor = this.id;
    $("#" + userChosenColor).fadeOut(100).fadeIn(100);
    animatePress(userChosenColor);
    var audio = new Audio("sounds/" + userChosenColor + ".mp3");
    audio.play();
    userPattern.push(userChosenColor);
    checkAnswer();
});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
var counter=0;
function checkAnswer() {
    if ((userPattern[counter]) === (gamePattern[counter]) && gamePattern.length>0)
     {
         console.log("in");
         counter++;
         if(gamePattern.length===userPattern.length)
         {
             console.log("inin");
                level++;
                counter=0;
        $("#level-title").text("Level " + level);
        iteration(level);
         }
    } else {
        $("body").addClass("game-over")
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        setTimeout(function () {
            $("body").removeClass("game-over");

        }, 300);
        $("#level-title").text("Game Over. Press Any Key to play again.");
        console.log("gameover");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userPattern=[];
    started = false;
    clicked=false;
}

function iteration(t) {
    gamePattern = [];
    userPattern = [];
    t += 1;
    a = 0;
    while (a < t) {
        a++;
        task();
    }

    function task() {
        setTimeout(function () {
            nextSequence()
        }, 1000 * a)
    };


}