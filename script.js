const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const nextBtn = document.querySelector(".next-btn");
const headerTimer = document.getElementById("timer");
const congratsBox = document.querySelector(".congrats-box");
const restartBtn = document.querySelector(".restart-btn");

let questionCount = 0; // Initialize question count
let timer; // Variable to store timer
let timeLeft = 4 * 60; // 4 minutes in seconds
let userScore = 0; // Initialize user score

// Event listeners for buttons
startBtn.addEventListener("click", () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
});

exitBtn.addEventListener("click", () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
});

continueBtn.addEventListener("click", () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");
  showQuestions(questionCount);
  startTimer(); // Start the timer when the quiz starts
});

nextBtn.addEventListener("click", () => {
  questionCount++;
  if (questionCount < questions.length) {
    showQuestions(questionCount);
  } else {
    clearInterval(timer); // Stop timer when all questions are answered
    showCongratsBox(); // Show congratulation box
  }
});

restartBtn.addEventListener("click", () => {
  congratsBox.classList.remove("active");
  questionCount = 0;
  userScore = 0;
  timeLeft = 4 * 60;
  showQuestions(questionCount);
  startTimer();
  quizSection.classList.add("active");
  quizBox.classList.add("active");
});

function showQuestions(index) {
  const questionText = document.querySelector(".question-text");
  const optionList = document.querySelector(".option-list");
  optionList.innerHTML = "";

  const question = questions[index];
  questionText.textContent = `${question.numb}. ${question.question}`;
  question.options.forEach((option) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerHTML = `<span>${option}</span>`;
    div.onclick = () => optionSelected(div);
    optionList.appendChild(div);
  });

  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index + 1} of ${questions.length} Questions`;

  // Disable the Next button initially
  nextBtn.disabled = true;
}

const exitBtnCongrats = document.querySelector(".congrats-box .exit-btn");

exitBtnCongrats.addEventListener("click", () => {
  congratsBox.classList.remove("active");
  main.classList.remove("active");
});

function optionSelected(answer) {
  const userAnswer = answer.textContent.trim();
  const correctAnswer = questions[questionCount].answer.trim();

  if (userAnswer === correctAnswer) {
    answer.classList.add("correct");
    userScore++; // Increase score if the answer is correct
  } else {
    answer.classList.add("incorrect");
  }
  document.querySelectorAll(".option").forEach((option) => {
    option.classList.add("disabled");
    if (option.textContent.trim() === correctAnswer) {
      option.classList.add("correct");
    }
  });

  // Enable the Next button after an option is selected
  nextBtn.disabled = false;
}

function showCongratsBox() {
  const scoreText = document.querySelector(".score_text");
  scoreText.textContent = `You scored ${userScore} out of ${questions.length}!`;
  congratsBox.classList.add("active");
  quizSection.classList.remove("active");
  quizBox.classList.remove("active");
}

const questions = [
  {
    numb: 1,
    question:
      "A constant voltage is applied between the two ends of a uniform metallic wire. Some heat is developed in it. The heat developed is doubled if",
    answer: "Both the length and the radius of the wire are doubled.",
    options: [
      "The length of the wire is doubled.",
      "The radius of the wire is doubled.",
      "Both the length and the radius of the wire are halved.",
      "Both the length and the radius of the wire are doubled.",
    ],
  },
  {
    numb: 2,
    question: "The negation of the statement 'A circle is an ellipse' is",
    answer: "A circle is not an ellipse",
    options: [
      "An ellipse is a circle",
      "An ellipse is not a circle",
      "A circle is not an ellipse",
      "A circle is an ellipse",
    ],
  },
  {
    numb: 3,
    question: "Magnetic dipole moment is a vector quantity directed from?",
    answer: "south pole to north pole",
    options: [
      "east to west",
      "west to east",
      "south pole to north pole",
      "north pole to south pole",
    ],
  },
  {
    numb: 4,
    question:
      "The speed at which the current travels in a conductor is nearly equal to?",
    answer: "3 × 10^8 m/s",
    options: ["4 × 10^6 m/s", "3 × 10^8 m/s", "3 × 10^5 m/s", "3 × 10^4 m/s"],
  },
  {
    numb: 5,
    question:
      "Calculate the energy in joule corresponding to light of wavelength 45 nm:",
    answer: "4.42×10^−18",
    options: ["4.42×10^−18", "4.42×10^−15", "4.42×10^−17", "4.42×10^−19"],
  },
];

function startTimer() {
  if (timer) {
    clearInterval(timer); // Clear any existing timer
  }

  timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    headerTimer.textContent = `${minutes}:${seconds}`;

    if (timeLeft === 0) {
      clearInterval(timer);
      showCongratsBox(); // Show congratulation box if time's up
    }

    timeLeft--;
  }, 1000); // Update every second
}
