let roomURL=null;

function setURL(){
  document.getElementById('create-meeting-url').value=roomURL;
}

function toggleVisibility(form) {
  document.querySelector('.form-holder').style.position="static";
  form.static
  if(form.style.visibility="visible")
    form.style.visibility="hidden";
  else
    form.style.visibility="visible";
}

function enterJoinForm(){
  let joinForm = document.querySelector('.join-form');
  let createForm = document.querySelector('.create-form');

  joinForm.style.visibility="visible";

  createForm.classList.remove('animate__animated', 'animate_fadeInLeft');
  createForm.classList.add('animate__animated', 'animate__fadeOutRight');

  joinForm.classList.remove('animate__animated', 'animate__fadeOutRight');
  joinForm.classList.add('animate__animated', 'animate__fadeInLeft');
}

function enterCreateForm(){
  let joinForm = document.querySelector('.join-form');
  let createForm = document.querySelector('.create-form');

  createForm.style.visibility="visible";
  
  joinForm.classList.remove('animate__animated', 'animate_fadeInLeft');
  joinForm.classList.add('animate__animated', 'animate__fadeOutRight');

  createForm.classList.remove('animate__animated', 'animate__fadeOutRight');
  createForm.classList.add('animate__animated', 'animate__fadeInLeft');

  roomURL=window.location.href+uuidv4();
  
  setURL();
}