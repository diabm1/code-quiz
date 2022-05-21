//when start button is clicked timer starts then I am presented with a question
var btn = document.querySelector("button");
const btnGoBack=document.getElementById("btnGoBack");
const btnClearHighScore=document.getElementById("btnClearHighScore");
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
btnClearHighScore.addEventListener("click", function (){
  localStorage.removeItem("userAndScore");
});
btnGoBack.addEventListener("click", function (){
 // document.getElementById("startScreen").style.display="block";
  document.getElementById("container").style.display="block";
  document.getElementById("highScore").innerHTML="";
  document.getElementById("displayHighScores").style.display="none";
  //displayHighScores
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

  intervalID = setInterval(myCallback, 1000);
  var timer = document.querySelector(".time");

  function myCallback() {
    timer.textContent = countDown;
    if (countDown === 0) {
      clearInterval(intervalID);
      showEndScreen();
    }
    countDown--;
    document.getElementById("spanTimer").innerHTML=countDown;
  }
  let i=1;
  // console.log(questionsArray[0].choices)
  questionsArray[displayQues].choices.forEach(function (choice) {
    var button = document.createElement("button");
    button.textContent =i+". "+ choice;
    console.log(i, choice);
    button.setAttribute("value", choice);
    i++;
    button.className="answerButton";
    button.onclick = evaluateAnswer;
    container.appendChild(button);
    
  });
}

function evaluateAnswer() {
  if (this.value == questionsArray[displayQues].answer) {
    console.log("correct");
    document.getElementById("message").innerHTML = "<hr/>Correct!";
    countDown++;
  } else {
    console.log("false");
    document.getElementById("message").innerHTML = "<hr/>Incorrect!";

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
      userScores = [];
    }
  }
  console.log(input.value);
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
  if(highScoreData==null)
  {
    alert("No high scores found");
    //document.getElementById("displayHighScores").innerHTML="<h1>None</h1>";
    return; 
  }
  var highScoreScreen = document.querySelector("#displayHighScores");
  var endScreen = document.querySelector("#endScreen");
  highScoreScreen.removeAttribute("class", "hide");
  endScreen.setAttribute("class", "hide");
  document.getElementById("startScreen").style.display="none";
  document.getElementById("container").style.display="none";
  document.getElementById("message").innerHTML="";
  document.getElementById("displayHighScores").style.display="block";
  const listOfScores = JSON.parse(highScoreData);
  const highScoreId = document.getElementById("highScore")
  //iterate through it
  for (let i = 0; i < listOfScores.length; i++) {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(listOfScores[i].initials + ":" + listOfScores[i].time);
    newDiv.appendChild(newContent);
    // console.log(listOfScores[i])
    console.log(newDiv)
    highScoreId.appendChild(newDiv)
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
