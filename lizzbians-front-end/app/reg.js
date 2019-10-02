// import clearInnerContent from 'main.js'

// Remove Content From Inner-Conent Div
const innerContentWrapper = document.getElementById('inner-content')

function clearInnerContent(innerContentWrapper) {
    innerContentWrapper.innerHTML = ''
}

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
    const playTrivia = document.getElementById('trivia')
    const testButton = document.getElementById('game-test')
    let questions

    const questionsURL = 'http://localhost:3000/questions'

    fetch(questionsURL)
    .then(resp => resp.json())
    .then(resp => {
        questions = shuffle(resp)
    })
    
    function displayQuestion() {
        const loginDiv = document.getElementById('login-div')
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
                console.log(thisAnswerId)
                fetch(`http://localhost:3000/answers/${thisQuestion.id}`)
                .then(resp => resp.json())
                .then(resp => {
                    for(let i = 0; i < resp.length; i++) {
                        let thisAnswerButton = document.getElementById(resp[i].id)
                        if(resp[i].is_correct === true) {
                            if(parseInt(thisAnswerId) === resp[i].id) {
                                console.log('Correct Answer')
                            }
                            thisAnswerButton.classList.add('green')
                            thisAnswerButton.classList.add('disabled')
                        } else {
                            if(parseInt(thisAnswerId) === resp[i].id) {
                                console.log('Incorrect Answer')
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
                    setTimeout(displayQuestion, 2000)
                })
            })
        }
    }

    playTrivia.addEventListener('click', (event) => {
        clearInnerContent(innerContentWrapper)
        displayQuestion()
    })

})