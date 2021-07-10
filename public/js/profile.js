const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const updateDisplayNameBox = document.querySelector('#update-display-name');
const saveButton = document.querySelector('#save-button');

// listen for auth status change
auth.onAuthStateChanged(user=>{
    if(user) {
        console.log('user logged in: ',user);
        updateDisplayNameBox.value = user.displayName;
        setupNavbar(user);
    }
    else{
        console.log('user logged out');
        setupNavbar();
    }
})

// Log out
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.href = "/";
});


// Sets up the navbar links based on user login info
function setupNavbar(user){
  if (user) {
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    
    // link Account to the user's profile
    const accountLink = document.querySelector('#account-link');
    let username = user.displayName;
    username = username.replace(/ /g, '-');
    accountLink.href = `/profile/${username}`;
  }
  else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

// Makes the name input box editable
function makeEditable() {
    updateDisplayNameBox.readOnly=false;
    saveButton.disabled=false;
}

// Changes the current user's name to the what is typed in the input box
function changeDisplayName(){
    let user = auth.currentUser;
    const newName = updateDisplayNameBox.value;
    user.updateProfile({displayName: newName})
    .then(()=>{
        updateDisplayNameBox.readOnly=true;
        saveButton.disabled=true;
        alert('Name change was successful!');
    })
    .catch(error=>{
        console.log(error);
    });
}