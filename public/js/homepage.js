let roomId=null;

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
    alert("Copied the text: " + newClip);
  }, function() {
    /* clipboard write failed */
    alert("Could not copy!");
  });
}
// Copies the meeting URL on the text field to the clipboard
function copyURL() {
  /* Get the text field */
  let copyString = document.getElementById('create-meeting-url').value;
  /* Prepend the base url*/ 
  copyString = `${window.location.href}${copyString}`;
  updateClipboard(copyString);
}