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