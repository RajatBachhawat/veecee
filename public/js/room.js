let roomURL=null;

// Writes the meeting URL to the read only text field
function setURL(){
  document.getElementById('create-meeting-url').value=roomURL;
}

// Handles entry of the join room form
function enterJoinForm(){
  let joinForm = document.querySelector('.join-form');
  let createForm = document.querySelector('.create-form');

  joinForm.style.visibility="visible";

  createForm.classList.remove('animate__animated', 'animate_fadeInLeft');
  createForm.classList.add('animate__animated', 'animate__fadeOutRight');

  joinForm.classList.remove('animate__animated', 'animate__fadeOutRight');
  joinForm.classList.add('animate__animated', 'animate__fadeInLeft');
}

// Handles entry of the create room form
function enterCreateForm(){
  let joinForm = document.querySelector('.join-form');
  let createForm = document.querySelector('.create-form');

  createForm.style.visibility="visible";
  
  joinForm.classList.remove('animate__animated', 'animate_fadeInLeft');
  joinForm.classList.add('animate__animated', 'animate__fadeOutRight');

  createForm.classList.remove('animate__animated', 'animate__fadeOutRight');
  createForm.classList.add('animate__animated', 'animate__fadeInLeft');
  
  /* can also just pass uuidv4() */
  roomURL=window.location.href+uuidv4();
  
  setURL();
}

// Copies the meeting URL on the text field to the clipboard
function copyURL() {
  /* Get the text field */
  let copyText = document.getElementById('create-meeting-url');

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}