const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");




let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//need to come back to fix the timer. 
const startingMinutes = 5;
let time = startingMinutes * 60;

const countdownEl = document.getElementById('countdown');

setInterval(updateCountdown, 60000);

function updateCountdown() {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;

      seconds = seconds < 10? '0' + seconds : seconds;

      countdownEl.innerHTML = '${minutes}:${seconds}';
      time--;
}

let questions = [
      {
            question: "What is var stands for?",
            choice1: "variable",
            choice2: "variance",
            answer: 1,
      },
      {
            question: "What is wrong with this variable? (var high Score)",
            choice1: "It contains a space",
            choice2: "It contains a capital letter",
            answer: 1,
      },
      {
            question: "Which of these lines of code updates the status variable?",
            choice1: "var status = working out;",
            choice2: "status = working out;",
            answer: 2,
      },
      {
            question: "What does this code display in the console? var currentStatus = watching TV; console.log(cureentStatus);",
            choice1: "currentStatus",
            choice2: "watching TV",
            answer: 2,
      },
      {
            question: "What is a good use for the values True and False?",
            choice1: "storing values from one to five",
            choice2: "showing if a feature is switched on or off",
            answer: 2,
      },
      {
            question: "What do we use to check if two numbers are equal?",
            choice1: "===",
            choice2: "=",
            answer: 1,
      },
      {
            question: "What can we use console.log() to display the value of a variable?",
            choice1: "Before we create the variable",
            choice2: "After we create the variable",
            answer: 2,
      },
      {
            question: "What is the = sign for?",
            choice1: "It adds string values together",
            choice2: "It gives a value to a variable",
            answer: 2,
      },
      {
            question: "What are values like booleans, strings, and numbers called?",
            choice1: "variables",
            choice2: "types",
            answer: 2,
      },
      {
            question: "Which value is of type number?",
            choice1: "42",
            choice2: '"42"',
            answer: 1,
      },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
      setTimeout(startGame,300000);
      questionCounter = 0;
      score = 0;
      getNewQuestion();
};

getNewQuestion = () => {
      if (questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem("mostRecentScore", score);

            return window.location.assign("end.html");
      }

      questionCounter++;
      progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
      progressBarFull.style.width = "${(questionCounter/MAX_QUESTIONS) * 100}%";

      currentQuestion = questions[questionCounter - 1];
      question.innerText = currentQuestion.question;

      choices.forEach((choice) => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];
      });

      choices.forEach((choice) => {
            choice.addEventListener("click", (e) => {
                  if (!acceptingAnswers) return;

                  acceptingAnswers = false;
                  const selectedChoice = e.target;
                  const selectedAnswer = selectedChoice.dataset["number"];

                  let classToApply =
                        selectedAnswer == currentQuestion.answer
                              ? "correct"
                              : "incorrect";

                  if (classToApply === "correct") {
                        incrementScore(SCORE_POINTS / MAX_QUESTIONS);
                  }

                  selectedChoice.parentElement.classList.add(classToApply);

                  setTimeout(() => {
                        selectedChoice.parentElement.classList.remove(
                              classToApply
                        );
                        getNewQuestion();
                  }, 1000);
            });
      });

      acceptingAnswers = true;
};

incrementScore = (num) => {
      score += num;
      scoreText.innerText = score.toString();
};

startGame();