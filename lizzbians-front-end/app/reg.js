    const timer = document.getElementById('time-goes-here')
    const points = document.getElementById('points-go-here')
    const questionsURL = 'http://localhost:3000/questions'
    const row = document.getElementById('row')
    let questions;
    let answers;

    countDownTimer();
    
//Timer for game play


    function countDownTimer() {
        var i = 10;
        var ticker = setInterval(function () {
            timer.innerHTML = i;
            if (i === 0) {
                clearInterval(ticker);
            }
            else   {
                    i--;
                    }
                }, 1000);

        

    };
document.addEventListener('DOMContentLoaded', (event) => {

function getQuestions() {
    fetch(questionsURL)
    .then(resp => resp.json())
    .then(resp => {
        questions = resp
        displayQuestion();
    })
}

function getAnswers() {

    fetch(questionsURL)
    .then(resp => resp.json())
    .then(resp => {
        answers = resp
        for (const question of resp) {
            answers = question.answers
            console.log(answers)
            }
            displayAnswers();
        })
    }

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayQuestion() {
    const gameDiv = document.getElementById('game-div')
    const questionContent = document.getElementById('question-content')
    const answerContentPs = document.getElementsByClassName('answer-content')
    gameDiv.classList.remove('hidden')

    for (const content of questions) {
        
        let innerQuestionContent = content.content
        questionContent.innerText = innerQuestionContent
        // questionContent.innerText = questions[questions.length -1].content
    }

}

function displayAnswers() {
    for (const content of answers) {
        const div = document.createElement('div')
        div.setAttribute('class', 'col-lg border')
        const para = document.createElement('p')
        para.setAttribute('class', 'answer-content')
        let innerAnswerContent = content.content
        para.innerText = innerAnswerContent
        div.appendChild(para)
        row.appendChild(div)
    }
}

getQuestions();
getAnswers();
// displayQuestion();














});
