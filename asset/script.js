//when start button is clicked timer starts then I am presented with a question
var btn = document.querySelector("button");
var intervalID;
var questionsArray = [
  {
    text: "Question 1",
    choices: ["A", "B", "C", "D"],
    answer: "B",
  },
  {
    text: "Question 2",
    choices: ["A", "B", "C", "D"],
    answer: "C",
  },
  {
    text: "Question 3",
    choices: ["A", "B", "C", "D"],
    answer: "D",
  },
];

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

  intervalID = setInterval(myCallback, 500);
  var timer = document.querySelector(".time");

  function myCallback() {
    timer.textContent = countDown;
    if (countDown === 0) {
      clearInterval(intervalID);
      showEndScreen();
    }
    countDown--;
  }

  // console.log(questionsArray[0].choices)
  questionsArray[displayQues].choices.forEach(function (choice) {
    var button = document.createElement("button");
    button.textContent = choice;
    button.setAttribute("value", choice);
    button.onclick = evaluateAnswer;
    container.appendChild(button);
  });
}

function evaluateAnswer() {
  if (this.value == questionsArray[displayQues].answer) {
    console.log("correct");
    countDown++;
  } else {
    console.log("false");
    countDown--;
  }

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
  //put object here; change from initials to something else
  //input.value needs to be changed to an object. but what would that value consist of
  // create user object from submission
  let userScores;
  const localStorageData = localStorage.getItem("userAndScore");
  if (localStorageData === null) {
    userScores = [];
  } else {
    try {
      userScores = JSON.parse(localStorageData);
    } catch {
      userScores = []
    }
    
  }
  console.log(input.value);
  var userAndScore = {
    initials: input.value.trim(),
    time: timer.innerHTML.trim(),
  };
  userScores.push(userAndScore)
  localStorage.setItem("userAndScore", JSON.stringify(userScores));
  showHighScores()
  
}

function showHighScores(){
  var highScoreScreen = document.querySelector("#displayHighScores")
  var endScreen = document.querySelector("#endScreen");
  highScoreScreen.removeAttribute("class", "hide");
  endScreen.setAttribute("class", "hide");
  //get items from local storage
  //iterate through it 
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
