let emptyArray = [];
let ticker;
let score;
let userScore;
let questions;
const questionsURL = 'http://localhost:3000/questions'

let newScore;

// Remove Content From Inner-Conent Div
function clearInnerContent(innerContentWrapper) {
    innerContentWrapper.innerHTML = ''
}

// Randomize Elements in an Array
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

// Initial Fetch to get Questions
function questionFetch() {
    fetch(questionsURL)
    .then(resp => resp.json())
    .then(resp => {
        questions = shuffle(resp)
    })
}

questionFetch()

document.addEventListener('DOMContentLoaded', (event) => {
    // Set Variables
    const scoreKeeper = document.getElementById('score-goes-here')
    const innerContentWrapper = document.getElementById('inner-content')
    const playTrivia = document.getElementById('trivia')
    const gameChoice = document.getElementById('choose-game-type')
    const loginDiv = document.getElementById('login-div')
    const gameDiv = document.getElementById('game-div')
    const questionContent = document.getElementById('question-content')
    const answerContentButtons = document.getElementsByClassName('answer-content')
    const regularGameButton = document.getElementById('regular-game-button')
    const speedGameButton = document.getElementById('speed-game-button')
    const questionAudio = document.getElementById('question-audio')
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
    clearInterval(ticker);
    console.log('fetch Leaderboard')
    clearInnerContent(innerContentWrapper)
    hideStaticElements()

    fetch(`http://localhost:3000/games/${type}`)
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp)
        const scoresDiv = document.createElement('div')
        innerContentWrapper.appendChild(scoresDiv)
        scoresDiv.setAttribute('class', 'container-fluid text-center')
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


    // Fetches Correct and Incorrect andswers and Calculates Score
    function fetchCorrectAnswers(thisQuestion, thisAnswerId, pointsMultiplier, gameType, allowedWrongAnswers) {
        fetch(`http://localhost:3000/answers/${thisQuestion.id}`)
        .then(resp => resp.json())
        .then(resp => {
            for(let i = 0; i < resp.length; i++) {
                let thisAnswerButton = document.getElementById(resp[i].id)
                if(resp[i].is_correct === true) {
                    if(parseInt(thisAnswerId) === resp[i].id) {
                        newScore = 0
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
            if(currentGameWrongAnswers < allowedWrongAnswers) {
                setTimeout(function() {displayQuestion(gameType)}, 2000)
            } else {
                recordHighScore();
                setTimeout(function() {renderLeaderboard(gameType)}, 1000)
            }
        })
    }

    // Displays a new Question, Sets Event Listeners for Answer Choices
    function displayQuestion(gameType) {
        const answersRow = document.getElementById('answers-row')

        while (answersRow.firstChild) {
            answersRow.removeChild(answersRow.firstChild);
          }

        const gameDiv = document.getElementById('game-div')
        const questionContent = document.getElementById('question-content')
        
        const thisQuestion = questions.pop()

        let myAnswers = thisQuestion.answers
        myAnswers = shuffle(myAnswers)
        for(let i = 0; i < myAnswers.length; i++) {
            const thisButton = document.createElement('button')
            thisButton.innerText = myAnswers[i].content
            thisButton.setAttribute('class', 'answer-content')
            thisButton.setAttribute('id', myAnswers[i].id)
            answersRow.appendChild(thisButton)

            thisButton.addEventListener('click', (event) => {
                const thisAnswerId = event.target.id
                clearInterval(ticker)
                // questionAudio.pause()
                questionAudio.src = ''
                fetchCorrectAnswers(thisQuestion, thisAnswerId, pointsMultiplier, gameType, allowedWrongAnswers)
            })
        }


        if(gameType === 'regular') {
            var allowedWrongAnswers = 3
            var pointsMultiplier = 1
        } else if(gameType === 'speed') {
            var allowedWrongAnswers = 1
            var pointsMultiplier = 5
        }
        countDownTimer(allowedWrongAnswers, gameType);
        gameDiv.classList.remove('hidden')
        loginDiv.classList.add('hidden')

        playMusic(thisQuestion.media)

        questionContent.innerText = thisQuestion.content;
    }

    // Toggle Visibility of Game Type Choice Screen
    function toggleGameChoice() {
        gameChoice.classList.toggle('hidden')
    }

    function startRegularGame() {
        questionFetch()
        emptyArray = []
        userScore = 0
        scoreKeeper.innerText = userScore
        currentGameWrongAnswers = 0
        displayQuestion('regular')
    }

    function startSpeedGame() {
        questionFetch()
        emptyArray = []
        userScore = 0
        scoreKeeper.innerText = userScore
        currentGameWrongAnswers = 0
        displayQuestion('speed')
    }

    playTrivia.addEventListener('click', (event) => {
        clearInnerContent(innerContentWrapper)
        toggleGameChoice()
        gameDiv.classList.add('hidden')
        loginDiv.classList.add('hidden')
    })

    // end of game logic
function recordHighScore() {
    console.log('score')
    const createGameURL = `http://localhost:3000/games`
    const wrapper = document.getElementById('page-content-wrapper')
    username = wrapper.dataset.username
    const scoreScreenGrab= document.getElementById('score-goes-here').innerHTML
    console.log(typeof scoreScreenGrab)
    fetch(createGameURL, {  
        method: 'POST',  
        
        headers: {  
            'Accept': 'application/json',
            'Content-Type': 'application/json'  
          },  
          
        body: JSON.stringify ({
            username: username,
            game_type: 'regular',
            score: scoreScreenGrab
        })
    })
    .then(function (data) {  
      console.log('Request success: ', data);  
    })  
}

    regularGameButton.addEventListener('click', (event) => {
        toggleGameChoice()
        startRegularGame() 
    })

    speedGameButton.addEventListener('click', (event) => {
        toggleGameChoice()
        startSpeedGame() 
    })

    function countDownTimer(allowedWrongAnswers, gameType) {
        let timer = document.getElementById('time-goes-here')
        score = 10;
        ticker = setInterval(function () {
            timer.innerText = score;
            if (score === 0) {
                clearInterval(ticker);
                currentGameWrongAnswers += 1
                if(currentGameWrongAnswers < allowedWrongAnswers) {
                    setTimeout(function() {displayQuestion(gameType)}, 1000)
                } else {
                    console.log('countdown end')
                    console.log(score)
                    setTimeout(function() {renderLeaderboard(gameType)}, 1000)
                    clearInterval(ticker);
                }
            }

            else {
                score--;
            }
        }, 1000); 
    };

    function playMusic(media) {
        if(media) {
            questionAudio.src = media
            questionAudio.play()
            setTimeout(function() {
                questionAudio.pause()
                questionAudio.src = ''
            }, 10000)
        }  
    }
})




