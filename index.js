var gameStarted = false;
var sequenceDone = false;
let inputArray = [];
var gameOver= false;
var count = 0;
var title = "";
let compArray = [];
document.addEventListener("keypress", function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    simon();
  }
});
document.querySelectorAll(".btn").forEach((div) => {
  div.addEventListener("click", gameLoop);
});

function simon() {
  count = 0;
  title = "";
  compArray = [];
  game();
}

function game() {
  count += 1;
  title = "Level " + count;
  document.querySelector("#level-title").textContent = title;
  var randomNumber = Math.ceil(Math.random() * 4);
  var key;
  switch (randomNumber) {
    case 1:
      key = "green";
      break;
    case 2:
      key = "red";
      break;
    case 3:
      key = "yellow";
      break;
    case 4:
      key = "blue";
      break;
  }
  compArray.push(key);
  var keyid = "#" + key;
  var src2 = "sounds/" + key + ".mp3";
  var audio2 = new Audio(src2);
  audio2.play();
  document.querySelector(keyid).classList.add("pressed");
  setTimeout(() => {
    document.querySelector(keyid).classList.remove("pressed");
  }, 100);
  inputArray.length=0;
  gameOver = false;
  sequenceDone = true;
}

function gameLoop(event) {
  if (sequenceDone == true) {
    if (gameOver == false) {
      var input = event.target.id;
      inputArray.push(input);
      if (
        inputArray[inputArray.length - 1] == compArray[inputArray.length - 1]
      ) {
        var src = "sounds/" + input + ".mp3";
        var audio = new Audio(src);
        audio.play();
        document.querySelector("#"+input).classList.add("pressed");
        setTimeout(() => {
          document.querySelector("#"+input).classList.remove("pressed");
        }, 100);
        if (inputArray.length == compArray.length) {
          setTimeout(game, 1000);
        }
      } else {
        gameOver = true;
        document.querySelector("#level-title").textContent =
          "Game Over, Press Any Key to Restart";
        document.body.classList.add("game-over");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        setTimeout(function () {
          document.body.classList.remove("game-over");
        }, 100);
        gameStarted = false;
      }
    }
  }
}
