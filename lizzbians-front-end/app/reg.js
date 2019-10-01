document.addEventListener('DOMContentLoaded', (event) => {

let questions

function getQuestions() {
    const questionsURL = 'http://localhost:3000/questions'
    fetch(questionsURL)
    .then(resp => resp.json())
    .then(resp => {
        questions = resp
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

    questionContent.innerText = questions[questions.length -1].content



}














});