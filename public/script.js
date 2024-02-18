// Questions and answers
const questions = [
    {
        question: "Quel verbe est utilisé pour désigner le cri des dauphins ?",
        answers: [
            {text: "Gazouiller", correct: false},
            {text: "Glapir", correct: false},
            {text: "Siffler", correct: true},
            {text: "Chanter", correct: false}
        ]
    },
    {
        question: "Quel club un golfeur utilise-t-il sur le green ?",
        answers: [
            {text: "Un  driver", correct: false},
            {text: "Un putter", correct: true},
            {text: "Un driving iron", correct: false},
            {text: "Un bois de parcours", correct: false}
        ]
    },
    {
        question: "De quel pays Tirana est-elle la capitale ?",
        answers: [
            {text: "Thaïlande", correct: false},
            {text: "Mexique", correct: false},
            {text: "Albanie", correct: true},
            {text: "Madagascar", correct: false}
        ]
    },
    {
        question: "Aux USA, quelle est la principale base de lancement d'engins spatiaux ?",
        answers: [
            {text: "Cap Canaveral", correct: true},
            {text: "Kourou", correct: false},
            {text: "Vandenberg", correct: false},
            {text: "Uchinoura", correct: false}
        ]
    },
];

// Variables
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Suivant";
    showQuestion();
}

// Display current question
function showQuestion() {

    // Remove answers before adding next question
    resetQuestion();

    // Display question text
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionText.textContent = questionNumber + ". " + currentQuestion.question;

    // Display answers buttons
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("p-3", "bg-slate-800", "hover:bg-slate-900", "text-slate-50", "rounded");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        // Click event on buttons
        button.addEventListener("click", (e) => {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if (isCorrect) {
                selectedBtn.classList.add("bg-lime-700");
                score++;
            } else {
                selectedBtn.classList.add("bg-red-700");
                selectedBtn.classList.remove("bg-slate-800");
            }
            // Display correct answer
            answerButtons.childNodes.forEach(btn => {
                if (btn.dataset.correct === "true") {
                    btn.classList.add("bg-lime-700");
                    btn.classList.remove("bg-slate-800");
                }
                btn.classList.add("cursor-not-allowed");
                btn.classList.remove("hover:bg-slate-900");
                btn.disabled = true;
            });
            nextButton.classList.remove("hidden");   
        });
    })
}

// Remove answers
function resetQuestion() {
    nextButton.classList.add("hidden");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Display score
function showScore() {
    resetQuestion();
    questionText.textContent = "Votre score : " + score + " sur " + questions.length + ".";
    nextButton.textContent = "Rejouer";
    nextButton.classList.remove("hidden"); 
}

// Next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Next button click event
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        nextQuestion();
    } else {
        startQuiz();
    }
});

// Run quiz
startQuiz();