document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let currentQuestionIndex = 0;
  let Score = 0;

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
      currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    }
    else{
       showResult()
    }
  });

  restartBtn.addEventListener("click",()=>{
    currentQuestionIndex=0;
    Score=0;
    restartBtn.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden")
    startQuiz()


  })

  function startQuiz() {
    startBtn.classList.add("hidden");
    restartBtn.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestions();
  }

  function showQuestions() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";

    questions[currentQuestionIndex].choices.forEach((choice) => {
      let li = document.createElement("li");
      li.textContent = choice;
      li.classList.add("choice");

      li.addEventListener("click", () => {
        document.querySelectorAll(".choice").forEach((el) => {
          el.classList.remove("selected");
        });
        li.classList.add("selected");
        selectAnswer(choice);
      });

      choicesList.appendChild(li);
    });
  }

  function selectAnswer(choice) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (choice === correctAnswer) {
      Score++;
    }
    nextBtn.classList.remove("hidden");
  }

  function showResult(){
    questionContainer.classList.add("hidden")
    resultContainer.classList.remove('hidden')
    scoreDisplay.textContent=`${Score} out of ${questions.length}`
    restartBtn.classList.remove('hidden')
  }
});
