// Remove Content From Inner-Conent Div
function clearInnerContent(innerContentWrapper) {
    innerContentWrapper.innerHTML = ''
}
let emptyArray = []
let ticker;
let score;
let userScore;

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
    const scoreKeeper = document.getElementById('score-goes-here')
    const innerContentWrapper = document.getElementById('inner-content')
    const playTrivia = document.getElementById('trivia')
    const gameChoice = document.getElementById('choose-game-type')
    const loginDiv = document.getElementById('login-div')
    const gameDiv = document.getElementById('game-div')
    const questionContent = document.getElementById('question-content')
    const answerContentButtons = document.getElementsByClassName('answer-content')
    const regularGameButton = document.getElementById('regular-game-button')
    var currentGameWrongAnswers = 0

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

    function fetchCorrectAnswers(thisQuestion, thisAnswerId, pointsMultiplier) {
        fetch(`http://localhost:3000/answers/${thisQuestion.id}`)
        .then(resp => resp.json())
        .then(resp => {
            for(let i = 0; i < resp.length; i++) {
                let thisAnswerButton = document.getElementById(resp[i].id)
                if(resp[i].is_correct === true) {
                    if(parseInt(thisAnswerId) === resp[i].id) {
                        let newScore = 0
                        newScore = (score + 1) * pointsMultiplier;

                        emptyArray.push(newScore)
                        const sum = emptyArray => emptyArray.reduce((a,b) => a + b, 0)
                        userScore = sum(emptyArray)
                        scoreKeeper.innerText = userScore
                    }
                    thisAnswerButton.classList.add('green')
                    thisAnswerButton.classList.add('disabled')
                } else {
                    if(parseInt(thisAnswerId) === resp[i].id) {
                        currentGameWrongAnswers += 1
                    }
                    thisAnswerButton.classList.add('red')
                    thisAnswerButton.classList.add('disabled')
                }
            }
        })
        .then(function() {
            if(currentGameWrongAnswers < 3) {
                setTimeout(function() {displayQuestion('regular')}, 2000)
            } else {
                renderLeaderboard('regular')
            }
        })
    }


    fetch(questionsURL)
    .then(resp => resp.json())
    .then(resp => {
        questions = shuffle(resp)
    })
    
    function displayQuestion(gameType) {
        const gameDiv = document.getElementById('game-div')
        const questionContent = document.getElementById('question-content')
        const answerContentButtons = document.getElementsByClassName('answer-content')
        const thisQuestion = questions.pop()
        if(gameType === 'regular') {
            var allowedWrongAnswers = 3
            var pointsMultiplier = 1
        } else if(gameType === 'speed') {
            var allowedWrongAnswers = 1
            var pointsMultiplier = 5
        }
        countDownTimer(allowedWrongAnswers);
        gameDiv.classList.remove('hidden')
        loginDiv.classList.add('hidden')

        for (element of answerContentButtons) {
            element.classList.remove('red')
            element.classList.remove('green')
            element.classList.remove('disabled')
        }
        
        let myAnswers = thisQuestion.answers
        myAnswers = shuffle(myAnswers)

        questionContent.innerText = thisQuestion.content;

        for(let i = 0; i < thisQuestion.answers.length; i++) {
            const thisButton = answerContentButtons[i]
            answerContentButtons[i].innerText = myAnswers[i].content
            thisButton.setAttribute('id', myAnswers[i].id)

            thisButton.addEventListener('click', (event) => {
                const thisAnswerId = event.target.id
                clearInterval(ticker)
                console.log('pointsMultiplier is thisButton.addEvent')
                console.log(typeof pointsMultiplier)
                fetchCorrectAnswers(thisQuestion, thisAnswerId, pointsMultiplier)
            })
        }
    }

    function toggleGameChoice() {
        gameChoice.classList.toggle('hidden')
    }

    function startRegularGame() {
        emptyArray = []
        userScore = 0
        scoreKeeper.innerText = userScore
        console.log(userScore)
        currentGameWrongAnswers = 0
        displayQuestion('regular')
    }

    function startSpeedGame() {
        currentGameWrongAnswers = 0
        displayQuestion('speed')
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

    function countDownTimer(allowedWrongAnswers) {
        let timer = document.getElementById('time-goes-here')
        let row = document.getElementById('answers-row')
        score = 10;
        ticker = setInterval(function () {
            timer.innerText = score;
            if (score === 0) {
                clearInterval(ticker);
                currentGameWrongAnswers += 1
                if(currentGameWrongAnswers < allowedWrongAnswers) {
                    setTimeout(function() {displayQuestion('regular')}, 1000)
                } else {
                    setTimeout(renderLeaderboard('regular'))
                }
            }
            else {
                score--;
            }
        }, 1000); 
    };
})




