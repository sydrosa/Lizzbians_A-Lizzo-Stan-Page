function renderThemeSettings(wrapper) {
    const sidebarWrapper = document.getElementById('sidebar-wrapper')

    const classicButton = document.createElement('button')
    classicButton.innerText = 'Classic'
    wrapper.appendChild(classicButton)
    classicButton.addEventListener('click', function(event) {
        // sidebarWrapper.classList.remove('light-theme');
        // sidebarWrapper.classList.remove('dark-theme');
        sidebarWrapper.setAttribute('class', 'classic-theme')
    })

    const darkButton = document.createElement('button')
    darkButton.innerText = 'Dark'
    darkButton.addEventListener('click', function(event) {
        // sidebarWrapper.classList.remove('classic-theme');
        // sidebarWrapper.classList.remove('dark-theme');
        sidebarWrapper.setAttribute('class', 'dark-theme')
    })
    wrapper.appendChild(darkButton)

    const lightButton = document.createElement('button')
    lightButton.innerText = 'Light'
    lightButton.addEventListener('click', function(event) {
        // sidebarWrapper.classList.remove('classic-theme');
        // sidebarWrapper.classList.remove('dark-theme');
        sidebarWrapper.setAttribute('class', 'light-theme')
    })
    wrapper.appendChild(lightButton)   
}



$(document).ready(function(){
    const themeButton = document.getElementById('theme')
    const innerContentWrapper = document.getElementById('inner-content')
    
    $("#menu-toggle").click(function(e){
        e.preventDefault();
        $("#wrapper").toggleClass("menuDisplayed");
    });

    themeButton.addEventListener('click', (event) => {
        renderThemeSettings(innerContentWrapper)
    })











});
      
