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
        const gameDiv = document.getElementById('game-div')
        const questionContent = document.getElementById('question-content')
        const answerContentDivs = document.getElementsByClassName('answer-content')
        const thisQuestion = questions[questions.length -1]
        gameDiv.classList.remove('hidden')
    
        questionContent.innerText = thisQuestion.content;

        for(let i = 0; i < thisQuestion.answers.length; i++) {
            const myAnswers = thisQuestion.answers
            console.log(myAnswers)
            const thisDiv = answerContentDivs[i].parentNode
            answerContentDivs[i].innerText = myAnswers[i].content
            console.log(thisQuestion.answers[i])
            thisDiv.setAttribute('id', myAnswers[i].id)

            thisDiv.addEventListener('click', (event) => {
                
                console.log(this)
                fetch(`http://localhost:3000/answers/${event.target.id}`)
                .then(resp => resp.json())
                .then(resp => console.log(resp))
            })
        }
    }

    testButton.addEventListener('click', (event) => {
        displayQuestion()
    })

    function countDownTimer() {
        const timer = document.getElementById('time-goes-here')
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

    countDownTimer();
})