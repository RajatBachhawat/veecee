let roomId=null;
function redirectToRoom(button,input) {
  button.addEventListener("click",()=>{
    const user = auth.currentUser;
    const roomId = input.value;
    let url;
    if(user){
      url = `/conversation/${roomId}?name=${user.displayName}`;
      
      $(`<a href="${url}" target="_blank"></a>`)[0].click();
      // to avoid pop-up tabs
      window.location.reload();
    }
    else{
      $('#guest-name-modal').modal('show');
      const setNameButton = document.querySelector('#guest-name-submit');
      // Show modal for setting display name, if guest user
      setNameButton.addEventListener("click",(e)=>{
        // prevents appending '?' to current url
        e.preventDefault();

        const displayName = document.querySelector('#guest-name').value;
        
        url = `/conversation/${roomId}?name=${displayName}`;

        $(`<a href="${url}" target="_blank"></a>`)[0].click();
        // to avoid pop-up tabs
        window.location.reload();
      })
    }
  })
}

// Sets up the redirect links of join/create based on user login info
function setupRedirects(){
  // listen for go to room
  const joinRoomInput = document.querySelector('#input-meeting-url');
  const createRoomInput = document.querySelector('#create-meeting-url');
  const joinButton = document.querySelector('#join-url-button');
  const createButton = document.querySelector('#create-url-button');
  redirectToRoom(joinButton,joinRoomInput);
  redirectToRoom(createButton,createRoomInput);
}

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const persistentLinks = document.querySelectorAll('.persistent');

// Sets up the navbar links based on user login info
function setupNavbar(user){
  persistentLinks.forEach(item => item.style.display = 'block');
  if (user) {
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    
    // link Account to the user's profile
    const accountLink = document.querySelector('#account-link');
    let username = user.displayName;
    username = username.replace(/ /g, '-');
    accountLink.href = '/profile';
  }
  else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

// Writes the meeting URL to the read only text field
function setURL(){
  document.getElementById('create-meeting-url').value=roomId;
}

// Handles animated entry of the join room form
function enterJoinForm(){
  let joinForm = document.querySelector('.join-form');
  let createForm = document.querySelector('.create-form');

  joinForm.style.visibility="visible";

  createForm.classList.remove('animate__animated', 'animate_fadeInLeft');
  createForm.classList.add('animate__animated', 'animate__fadeOutRight');

  joinForm.classList.remove('animate__animated', 'animate__fadeOutRight');
  joinForm.classList.add('animate__animated', 'animate__fadeInLeft');
}

// Handles animated entry of the create room form
function enterCreateForm(){
  let joinForm = document.querySelector('.join-form');
  let createForm = document.querySelector('.create-form');

  createForm.style.visibility="visible";
  
  joinForm.classList.remove('animate__animated', 'animate_fadeInLeft');
  joinForm.classList.add('animate__animated', 'animate__fadeOutRight');

  createForm.classList.remove('animate__animated', 'animate__fadeOutRight');
  createForm.classList.add('animate__animated', 'animate__fadeInLeft');
  
  /* Assign randomly generated string as roomId */
  roomId=uuidv4();

  setURL();
}

// Helper for copyURL, updates clipboard with the string passed
function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(function() {
    /* clipboard successfully set */
    alert("Copied the invite!\n\n" + newClip);
  }, function() {
    /* clipboard write failed */
    alert("Could not copy!");
  });
}
// Copies the meeting URL on the text field to the clipboard
function copyURL() {
  /* Get the text field */
  let copyString = document.getElementById('create-meeting-url').value;
  const meetingURL = `${window.location.origin}/${copyString}`;
  updateClipboard(`Room ID: ${copyString}\nMeeting URL (paste this link to the browser to join meeting directly):\n${meetingURL}`);
}