const quizSection = document.getElementById("quiz-section");
const questionText = document.getElementById("question-text");
const answerButtons = document.querySelectorAll(".answer-button");
const resultSection = document.getElementById("result-section");
const resultText = document.getElementById("result-text");
const nextButton = document.getElementById("next-button");
const scoreSection = document.getElementById("score-section");
const finalScore = document.getElementById("final-score");

let currentQuestionIndex = 0;
let correctAnswer = "";
let answerFeedback = {};
let score = 0;
let totalQuestions = 5;

function updateQuestion() {
  // If there is no more question to display, end the quiz
  if (currentQuestionIndex >= totalQuestions) {
    endQuiz();
  } else {
    // Hide the result section and remove any result styling
    resultSection.style.display = "none";
    resultText.classList.remove("correct-answer");
    resultText.classList.remove("wrong-answer");

    // Fetch the next question and display it
    fetch("question-data.json")
      .then((response) => response.json())
      .then((data) => {
        displayQuestion(data[currentQuestionIndex]);
        currentQuestionIndex++;
      })
      .catch((error) => console.error("Error fetching quiz data:", error));
  }
}

function displayQuestion(questionData) {
  questionText.innerText = questionData.question;
  correctAnswer = questionData.correct_answer;
  answerFeedback = questionData.feedback;

  // Update the text and event listener for each answer button
  answerButtons.forEach((answerButton, index) => {
    answerButton.innerText = questionData.options[index];
    answerButton.addEventListener("click", displayResult);
    answerButton.classList.remove("disabled");
  });
}

function displayResult() {
  const choosenAnswer = this.innerText;
  resultText.innerText = answerFeedback[choosenAnswer];
  if (choosenAnswer === correctAnswer) {
    score++;
    resultText.classList.add("correct-answer");
  } else {
    resultText.classList.add("wrong-answer");
  }
  resultSection.style.display = "flex";

  // Disable all answer buttons once an answer is choosen
  answerButtons.forEach((answerButton) => {
    answerButton.removeEventListener("click", displayResult);
    answerButton.classList.add("disabled");
  });
}

function endQuiz() {
  // Hide the quiz section and display the result section with the final score
  quizSection.style.display = "none";
  scoreSection.style.display = "flex";
  finalScore.innerText = score;
}

nextButton.addEventListener("click", updateQuestion);
// Start the quiz by updating the first question
updateQuestion();
