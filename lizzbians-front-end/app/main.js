// Remove Content From Inner-Conent Div
function clearInnerContent(innerContentWrapper) {
    innerContentWrapper.innerHTML = ''
}

// Build Theme Menu
function renderThemeSettings(wrapper) {
    const sidebarWrapper = document.getElementById('sidebar-wrapper')

    const classicButton = document.createElement('button')
    classicButton.innerText = 'Classic'
    wrapper.appendChild(classicButton)
    classicButton.addEventListener('click', function(event) {
        event.preventDefault()
        sidebarWrapper.setAttribute('class', 'classic-theme')
    })

    const darkButton = document.createElement('button')
    darkButton.innerText = 'Dark'
    darkButton.addEventListener('click', function(event) {
        event.preventDefault()
        sidebarWrapper.setAttribute('class', 'dark-theme')
    })
    wrapper.appendChild(darkButton)

    const lightButton = document.createElement('button')
    lightButton.innerText = 'Light'
    lightButton.addEventListener('click', function(event) {
        event.preventDefault()
        sidebarWrapper.setAttribute('class', 'light-theme')
    })
    wrapper.appendChild(lightButton)   
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

// On Page Load Functions
$(document).ready(function(){

    const themeButton = document.getElementById('theme')
    const leaderboardButton = document.getElementById('leaderboard')
    const innerContentWrapper = document.getElementById('inner-content')

    // Build Leaderboard
    function renderLeaderboard(type) {
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
    
    $("#menu-toggle").click(function(event){
        event.preventDefault()
        $("#wrapper").toggleClass("menuDisplayed")
    });

    themeButton.addEventListener('click', (event) => {
        clearInnerContent(innerContentWrapper)
        renderThemeSettings(innerContentWrapper)
    })

    leaderboardButton.addEventListener('click', (event) => {
        console.log('click')
        clearInnerContent(innerContentWrapper)
        renderLeaderboard('speed')
        renderLeaderboard('regular')
    })
});
      
