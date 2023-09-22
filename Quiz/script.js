const questions = [
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Creative Style Sheets', correct: false },
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Computer Style Sheets', correct: false },
            { text: 'Colorful Style Sheets', correct: false }
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'Hyperlinks and Text Markup Language', correct: false },
            { text: 'Home Tool Markup Language', correct: false },
            { text: 'Hyper Text Markup Links', correct: false }
        ]
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<scripting>', correct: false },
            { text: '<javascript>', correct: false },
            { text: '<js>', correct: false },
            { text: '<script>', correct: true }
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            { text: 'alertBox("Hello World")', correct: false },
            { text: 'msgBox("Hello World")', correct: false },
            { text: 'alert("Hello World")', correct: true },
            { text: 'msg("Hello World")', correct: false }
        ]
    }
]

const question = document.querySelector('.question');
const answerBtns = document.querySelector('.answer-btns');
const nextBtn = document.querySelector('.next-btn');
const progressDisplay = document.querySelector('.progress-bar');
const bar = document.querySelector('.bar');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    bar.style.width = `${currentQuestionIndex}%`;
    nextBtn.textContent = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    question.innerHTML = `${questionNumber}: ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent =  answer.text;
        button.classList.add('btn');
        answerBtns.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', (e) => {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === 'true';
            const checkCorrect = document.createElement('span');
            checkCorrect.classList.add('emoji');
            button.append(checkCorrect);
            if (isCorrect) {
                selectedBtn.classList.add('correct');
                score++;
                checkCorrect.innerHTML = `<i class='bx bx-check-circle'></i>`;
            } else {
                selectedBtn.classList.add('incorrect');
                checkCorrect.innerHTML = `<i class='bx bx-x-circle'></i>`;
            }
            Array.from(answerBtns.children).forEach(btn => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                }
                btn.disabled = true;
            })
            nextBtn.classList.add('show')
        });
    })
}

function resetState() {
    nextBtn.classList.remove('show');
    progressDisplay.classList.remove('hide');
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function showScore() {
    resetState();
    question.innerHTML = `You scored ${score} of ${questions.length} Questions!`;
    nextBtn.textContent = 'Play again';
    nextBtn.classList.add('show');
    bar.style.width = `100%`;
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        const progressBar = (currentQuestionIndex / questions.length) * 100;
        bar.style.width = `${progressBar}%`;
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();