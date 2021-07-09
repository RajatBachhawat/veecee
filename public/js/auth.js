// listen for auth status change
auth.onAuthStateChanged(user=>{
    if(user) {
        console.log('user logged in: ',user);
        setupRedirects(user);
        setupNavbar(user);
    }
    else{
        console.log('user logged out');
        setupRedirects();
        setupNavbar();
    }
})

// Sign-up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-pass'].value;
    const name = signupForm['signup-name'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // close the signup modal & reset form
        $('#modal-signup-form').modal('hide');
        signupForm.reset();
    })
    .then((result) => {
        const user = auth.currentUser;
        return user.updateProfile({
            displayName: name
        })
    })
    .catch((error) => {
        error.message.replace(".", "");
        alert(error.message + " (" + error.code + ")");
        document.getElementById("signup-pass").value = "";
    });
});

// Log out
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// Log-in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-pass'].value;

    // sign up the user
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // close the signup modal & reset form
        $('#modal-login-form').modal('hide');
        loginForm.reset();
    });
});