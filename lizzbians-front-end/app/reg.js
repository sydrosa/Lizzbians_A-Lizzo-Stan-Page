// const { renderLeaderboard } = require("./helper_functions.js")

// Remove Content From Inner-Conent Div
function clearInnerContent(innerContentWrapper) {
    innerContentWrapper.innerHTML = ''
}
const emptyArray = []
let ticker;
let score;

var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

document.addEventListener('DOMContentLoaded', (event) => {
    const innerContentWrapper = document.getElementById('inner-content')
    const playTrivia = document.getElementById('trivia')
    const gameChoice = document.getElementById('choose-game-type')
    const loginDiv = document.getElementById('login-div')
    const gameDiv = document.getElementById('game-div')
    const questionContent = document.getElementById('question-content')
    const answerContentButtons = document.getElementsByClassName('answer-content')
    const regularGameButton = document.getElementById('regular-game-button')
    let currentGameWrongAnswers = 0

// This is Horrible CodE!!! ///////////////////////////////////////////////////////////////////////////////////////////////////

const staticElements = document.getElementById('static-elements').children

function hideStaticElements() {
    for(element of staticElements) {
        element.classList.add('hidden')
    }
}

// Leaderboard Table Helper Methods
function renderLeaderTables(gameTypeDiv, type) {
    const scoresTitle = document.createElement('h2')
    scoresTitle.innerText = `${type} Scores Table`
    gameTypeDiv.appendChild(scoresTitle)

    const scoresTable = document.createElement('table')
    scoresTable.setAttribute('id', type)
    gameTypeDiv.appendChild(scoresTable)

    const scoresHeaderRow = document.createElement('tr')
    scoresTable.appendChild(scoresHeaderRow)

    const scoresNameHeader = document.createElement('th')
    scoresNameHeader.innerText = 'Name'
    scoresHeaderRow.appendChild(scoresNameHeader)

    const scoreHeader = document.createElement('th')
    scoreHeader.innerText = 'Score'
    scoresHeaderRow.appendChild(scoreHeader)
}

// Build Leaderboard 
function renderLeaderboard(type) {

    hideStaticElements()

    fetch(`http://localhost:3000/games/${type}`)
    .then(resp => resp.json())
    .then(resp => {

        const scoresDiv = document.createElement('div')
        innerContentWrapper.appendChild(scoresDiv)
        renderLeaderTables(scoresDiv, type)

        const thisTable = document.getElementById(`${type}`)
        
        if(resp.length === 0) {
            const noScores = document.createElement('p')
            noScores.innerText = 'There are no Scores yet. Play?'
            scoresDiv.appendChild(noScores)
        } else {
            for(let i = 0; i < resp.length; i++) {
                const thisRow = document.createElement('tr')
                thisTable.appendChild(thisRow)
                
                const myName = document.createElement('td')
                myName.innerText = resp[i].user.username
                thisRow.appendChild(myName)

                const myScore = document.createElement('td')
                myScore.innerText = resp[i].score
                thisRow.appendChild(myScore)
            }
        }
    })
}

// This is Horrible Code!!! ///////////////////////////////////////////////////////////////////////////////////////////////////

    let questions

    const questionsURL = 'http://localhost:3000/questions'

    fetch(questionsURL)
    .then(resp => resp.json())
    .then(resp => {
        questions = shuffle(resp)
    })
    
    function displayQuestion(gameType) {
        countDownTimer();
        const gameDiv = document.getElementById('game-div')
        const questionContent = document.getElementById('question-content')
        const answerContentButtons = document.getElementsByClassName('answer-content')
        const thisQuestion = questions.pop()
        gameDiv.classList.remove('hidden')
        loginDiv.classList.add('hidden')

        for (element of answerContentButtons) {
            element.classList.remove('red')
            element.classList.remove('green')
            element.classList.remove('disabled')
        }

        questionContent.innerText = thisQuestion.content;

        for(let i = 0; i < thisQuestion.answers.length; i++) {
            const myAnswers = thisQuestion.answers
            const thisButton = answerContentButtons[i]
            answerContentButtons[i].innerText = myAnswers[i].content
            thisButton.setAttribute('id', myAnswers[i].id)


            thisButton.addEventListener('click', (event) => {
                const thisAnswerId = event.target.id
                let scoreKeeper = document.getElementById('score-goes-here')
                clearInterval(ticker)
    
                fetch(`http://localhost:3000/answers/${thisQuestion.id}`)
                .then(resp => resp.json())
                .then(resp => {
                    for(let i = 0; i < resp.length; i++) {
                        let thisAnswerButton = document.getElementById(resp[i].id)
                        if(resp[i].is_correct === true) {
                            if(parseInt(thisAnswerId) === resp[i].id) {
                                let newScore = score + 1;
                                emptyArray.push(newScore)
                                const sum = emptyArray => emptyArray.reduce((a,b) => a + b, 0)
                                let userScore = sum(emptyArray)
                                console.log(userScore)
                                scoreKeeper.innerHTML = userScore
                                console.log('Correct Answer')
                            }
                            thisAnswerButton.classList.add('green')
                            thisAnswerButton.classList.add('disabled')
                        } else {
                            if(parseInt(thisAnswerId) === resp[i].id) {
                                console.log('Incorrect Answer')
                                currentGameWrongAnswers += 1
                            }
                            thisAnswerButton.classList.add('red')
                            thisAnswerButton.classList.add('disabled')
                        }
                    }
                })
                .then(function() {
                    // do the score things
                })
                .then(function() {
                    if(currentGameWrongAnswers < 3) {
                        setTimeout(displayQuestion, 2000)
                    } else {
                        console.log('done')
                        renderLeaderboard('regular')
                    }
                })
            })
        }
    }

    function toggleGameChoice() {
        gameChoice.classList.toggle('hidden')
    }

    function startRegularGame() {
        currentGameWrongAnswers = 0
        displayQuestion('regular')

    }

    playTrivia.addEventListener('click', (event) => {
        clearInnerContent(innerContentWrapper)
        toggleGameChoice()
        gameDiv.classList.add('hidden')
        loginDiv.classList.add('hidden')
    })

    regularGameButton.addEventListener('click', (event) => {
        toggleGameChoice()
        startRegularGame()
        
    })

    
    
})
        function countDownTimer() {
            console.log(`I'm running this many times`)
            let timer = document.getElementById('time-goes-here')
            let row = document.getElementById('answers-row')
            // let emptyArray = []
            score = 10;
            ticker = setInterval(function () {
                timer.innerHTML = score;
                if (score === 0) {
                    clearInterval(ticker);
                }
                else {
                    score--;
                }
            }, 1000);
            
            
            
        };