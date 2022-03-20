//model
//--settings
const timeAllowedPerQuestion = 5,
	  timePenalty = 5,
	  correctAnswerBonus = 10,
	  localStorageLabel = "triviagame";

//--data
const quesArr = [
	{
		question: "What is the answer?",
		answers: [
			"Wrong",
			"Correct!",
			"Incorrect",
			"Very Wrong"
		],
		answer: 1 //index of correct answer in answers array
	},
	{
		question: "Do you know the answer?",
		answers: [
			"Wrong",
			"Incorrect",
			"Very Wrong",
			"Correct!"
		],
		answer: 3
	}
];

//--app state variables
var currentQuestionIndex, correctAnswers, timer, timeRemaining, score;

//--model functions
function reset() {
	currentQuestionIndex = 0;
	correctAnswers = 0;
	timeRemaining = timeAllowedPerQuestion * quesArr.length;
	score = 0;
}
function getHighScores() {
	const data = localStorage.getItem(localStorageLabel);
	if (!data) return [];
	return JSON.parse(data);
}
function setHighScores(data) {
	localStorage.setItem(localStorageLabel, JSON.stringify(data));
}



//view
function showCurrentQuestion() {
	let q = quesArr[currentQuestionIndex];
	document.querySelector("#game h2").textContent = q.question;
	document.querySelectorAll("#game button").forEach((b, i) => {
		b.textContent = q.answers[i];
	});
}
function changeView() {
	const main = document.querySelector("main"),
		  state = main.className;
          console.log(state, "state")
	switch(state) {
		case "start":
			main.className = "game";
			break;
		case "game":
			main.className = "end";
			break;
		case "end":
			main.className = "start";
			break;
	}
}
function viewTime() {
	document.querySelector("#time").textContent = timeRemaining;
}
function viewScore() {
	document.querySelector("#score").textContent = score;
}
function viewHighScores() {
    // debugger;
	// const data = getHighScores();
	// document.querySelector("#highscores").innerHTML = data?.map(({name, score}) => `
	// 	<li>${score}: ${name}</li>
	// `).join("");
}




//controller
function init() {
	//view changing
	document.querySelector("#start button").addEventListener("click", startGame);
	// const [saveButton, cancelButton] = document.querySelectorAll("#end button");
	// saveButton.addEventListener("click", saveHighScore);
	// cancelButton.addEventListener("click", changeView);
	//assign controller to answer buttons
	document.querySelectorAll("#game button").forEach(b => {
		b.addEventListener("click", handleAnswer);
	});
	//high scores
	viewHighScores();
    console.log("hello")
}
function handleAnswer(event) {
	//event.target is the button clicked
	//event.target.dataset.index is the data-index attribute
    console.log("hello")
	let answerIndex = Number(event.target.dataset.index);
	let q = quesArr[currentQuestionIndex];
	if (answerIndex === q.answer) {
		//correct answer!
		correctAnswers++;
		score += correctAnswerBonus;
	}
	else {
		//incorrect answer
		timeRemaining -= timePenalty;
	}
	currentQuestionIndex++;
	//are there more questions?
	if (quesArr[currentQuestionIndex]) showCurrentQuestion();
	else endGame();
}
function startGame() {
	reset();
	startTimer();
	showCurrentQuestion();
	changeView();
}
function endGame() {
	stopTimer();
	changeView();
	if (timeRemaining > 0) score += timeRemaining;
	viewScore();
}
function saveHighScore() {
	const name = document.querySelector("#name").value.trim();
	let data = getHighScores();
	data.push({name, score});
	data.sort((a, b) => b.score - a.score);
	//data = data.slice(0, 5);
	setHighScores(data);
	viewHighScores();
	changeView();
}
function startTimer() {
	viewTime();
	// timer = setInterval(tick, 1000);
}
function stopTimer() {
	clearInterval(timer);
}
function tick() {
	timeRemaining = Math.max(0, timeRemaining - 1);
	viewTime();
	if (!timeRemaining) endGame();
}



init();


















