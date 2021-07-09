const themes = {
    'classic': 'red-blue-bg@2x.png',
    'light': 'light-bg@2x.png',
    'dark': 'dark-bg@2x.png',
    'funky': 'funky-bg@2x.png',
    'focus': 'focus-bg@2x.png'
}

window.addEventListener("load",()=>{
    const themeButtonsContainer = document.querySelector('#theme-container');
    const themeButtons = document.querySelectorAll('.theme');
    const body = document.querySelector('body');

    themeButtons.forEach(button => {
        button.addEventListener('click',()=>{
            const activeButton = themeButtonsContainer.querySelector('.active');
            activeButton.classList.remove('active');
            body.classList.remove(`${activeButton.id}-theme`);

            button.classList.add('active');
            body.classList.add(`${button.id}-theme`);
        })
    });
})