//when start button is clicked timer starts then I am presented with a question
var btn = document.querySelector("button");
const btnGoBack = document.getElementById("btnGoBack");
const btnClearHighScore = document.getElementById("btnClearHighScore");
var intervalID;
var questionsArray = [
  {
    text: "Commonly used data types DO Not Include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    text: "The condition in an if / else statement is enclosed with ________.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "paranthesis",
  },
  {
    text: "Arrays in JavaScript can be used to store ________.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    text: "String values must be enclosed within ________ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
  },
  {
    text: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log",
  },
];
btnClearHighScore.addEventListener("click", function () {
  localStorage.removeItem("userAndScore");
});
btnGoBack.addEventListener("click", function () {
  document.getElementById("container").style.display = "block";
  document.getElementById("highScore").innerHTML = "";
  document.getElementById("displayHighScores").style.display = "none";
});
btn.addEventListener("click", function () {
  var startScreen = document.querySelector("#startScreen");
  var quizScreen = document.querySelector("#quizScreen");

  startScreen.setAttribute("class", "hide");
  quizScreen.removeAttribute("class", "hide");

  buildQuesCard();
});

let displayQues = 0;
let countDown = 60;

function buildQuesCard() {
  var questionText = document.getElementById("questionText");
  questionText.textContent = questionsArray[displayQues].text; //text == question
  var container = document.getElementById("container");

  intervalID = setInterval(myCallback, 10000);
  var timer = document.querySelector(".time");

  function myCallback() {
    timer.textContent = countDown;
    if (countDown === 0) {
      clearInterval(intervalID);
      showEndScreen();
    }
    countDown--;
    document.getElementById("spanTimer").innerHTML = countDown;
  }
    let i = 1;
    questionsArray[displayQues].choices.forEach(function (choice) {
      var button = document.createElement("button");
      button.textContent = i + ". " + choice;
      button.setAttribute("value", choice);
      i++;
      button.className = "answerButton";
      button.onclick = evaluateAnswer;
      container.appendChild(button);
    });
  
  
}

function evaluateAnswer() {
  if (this.value == questionsArray[displayQues].answer) {
    
    document.getElementById("message").innerHTML = "<hr/>Correct!";
    //add something here to go to next set of answers but hide previous answers
    countDown++;
  } else {
    document.getElementById("message").innerHTML = "<hr/>Incorrect!";
    //add something here to go to next set of answers but hide previous answers
    countDown--;
  }

  //button.onClick = evaluateAnser && go to next question. Cycle through the object above how

  if (displayQues < questionsArray.length - 1) {
    displayQues++;
    var questionText = document.getElementById("questionText");
    questionText.textContent = questionsArray[displayQues].text;
  } else {
    clearInterval(intervalID);
    showEndScreen();
  }
}

function saveToLocalStorage() {
  var input = document.getElementById("initials");
  var timer = document.querySelector(".time");
  let userScores;
  const localStorageData = localStorage.getItem("userAndScore");
  if (localStorageData === null) {
    userScores = [];
  } else {
    try {
      userScores = JSON.parse(localStorageData);
    } catch {
      userScores = [];
    }
  }
  // console.log(input.value);
  var userAndScore = {
    initials: input.value.trim(),
    time: timer.innerHTML.trim(),
  };
  userScores.push(userAndScore);
  localStorage.setItem("userAndScore", JSON.stringify(userScores));
  showHighScores();
}

function showHighScores() {
  //  jQuery $("#startScreen").hide();
  //get items from local storage
  const highScoreData = localStorage.getItem("userAndScore");
  if (highScoreData == null) {
    alert("No high scores found");
    //document.getElementById("displayHighScores").innerHTML="<h1>None</h1>";
    return;
  }
  var highScoreScreen = document.querySelector("#displayHighScores");
  var endScreen = document.querySelector("#endScreen");
  highScoreScreen.removeAttribute("class", "hide");
  endScreen.setAttribute("class", "hide");
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("container").style.display = "none";
  document.getElementById("message").innerHTML = "";
  document.getElementById("displayHighScores").style.display = "block";
  const listOfScores = JSON.parse(highScoreData);
  const highScoreId = document.getElementById("highScore");
  //iterate through it
  for (let i = 0; i < listOfScores.length; i++) {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(
      listOfScores[i].initials + ":" + listOfScores[i].time
    );
    newDiv.appendChild(newContent);
    // console.log(listOfScores[i])
    console.log(newDiv);
    highScoreId.appendChild(newDiv);
  }

  //create element forEach
  //attach child to high scores id
}

function showEndScreen() {
  var quizScreen = document.querySelector("#quizScreen");
  var endScreen = document.querySelector("#endScreen");

  quizScreen.setAttribute("class", "hide");
  endScreen.removeAttribute("class", "hide");

  var submit = document.getElementById("submit");
  submit.onclick = saveToLocalStorage;

  //display endScreen
}

//testing git
