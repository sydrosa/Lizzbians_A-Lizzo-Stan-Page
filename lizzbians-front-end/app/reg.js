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
    const testButton = document.getElementById('game-test')
    let questions

    const questionsURL = 'http://localhost:3000/questions'

    fetch(questionsURL)
    .then(resp => resp.json())
    .then(resp => {
        questions = shuffle(resp)
    })
    
    function displayQuestion() {
        console.log('display')
        const gameDiv = document.getElementById('game-div')
        const questionContent = document.getElementById('question-content')
        const answerContentButtons = document.getElementsByClassName('answer-content')
        const thisQuestion = questions.pop()
        gameDiv.classList.remove('hidden')

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
            }, {once: true})
        }
    }

    testButton.addEventListener('click', (event) => {
        // clearInnerContent(innerContentWrapper)
        displayQuestion()
    })

    function countDownTimer() {
        let timer = document.getElementById('time-goes-here')
        let row = document.getElementById('answers-row')
        let emptyArray = []
        var i = 10;
        var ticker = setInterval(function () {
            timer.innerHTML = i;
            if (i === 0) {
                clearInterval(ticker);
            }
            else   {
                    i--;
                    }
                }, 1000)
                ;
        row.addEventListener('click', (event) => {
            let scoreKeeper = document.getElementById('score-goes-here')
            clearInterval(ticker)
            let newScore = i + 1;
            // scoreKeeper.innerHTML = newScore;
            emptyArray.push(newScore)
            const sum = emptyArray => emptyArray.reduce((a,b) => a + b, 0)
            let userScore = sum(emptyArray)
            scoreKeeper.innerHTML = userScore
            console.log(userScore)

        })
        
    };

    countDownTimer();
    
})