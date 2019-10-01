document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.getElementById('login-form')
    const usernameField = document.getElementById('username')
    const passwordField = document.getElementById('password')
    const userLoginURL = `http://localhost:3000/sessions/`

    function userLogIn() {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault()
            let username = usernameField.value 
            // let password = passwordField.value
            
            fetch(userLoginURL, {
                method: 'POST',
                body: JSON.stringify ({
                    username: username
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                // .then(response => response.json())
                .then(username =>
                    console.log(username))
            })
        
        })
    };

    userLogIn();
    
})