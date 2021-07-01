const roomId = "<%= roomId %>";

document.querySelector('.options-form').action=window.location.href;

const myVideo = document.getElementById('user-video');
myVideo.muted = true;

// Starts audio/video stream
function startStream(videoElem) {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(stream => {
    addVideoStream(myVideo, stream);
  })
}

// Adds stream to our video element
function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  })
}

// Stops video track of the stream
function stopVideo(videoElem) {
  const localstream=videoElem.srcObject;
  const tracks=localstream.getTracks();
  tracks[1].stop();
}

$('document').ready(()=>{
  // Start user-video when DOM ready
  startStream(myVideo);

  // Toggles state of the video when video-button clicked
  $('#video-button').click(()=>{
    $('#toggle-video').click();
    oldState=Number($('#video-button').prop('value'));
    $('#video-button').prop('value',String(1-oldState))
    const videoElem = $('#user-video').get(0);
    if(oldState==0){
      $('#video-button').html('<i class="fas fa-video-slash"></i>')
      $('#video-button').css({'background-color':'#ff2600','color':'white'});
      stopVideo(videoElem);
    }
    else{
      $('#video-button').html('<i class="fas fa-video"></i>')
      $('#video-button').css({'background-color':'#efefef','color':'#070C4D'});
      startStream(videoElem);
    }  
  })

  // Toggles state of the audio when video-button clicked
  $('#audio-button').click(()=>{
    $('#toggle-audio').click();
    oldState=Number($('#audio-button').prop('value'));
    $('#audio-button').prop('value',String(1-oldState));
    if(oldState==0){
      $('#audio-button').html('<i class="fas fa-microphone-slash"></i>');
      $('#audio-button').css({'background-color':'#ff2600','color':'white'});
    }
    else{
      $('#audio-button').html('<i class="fas fa-microphone"></i>')
      $('#audio-button').css({'background-color':'#efefef','color':'#070C4D'});
    }
  })
})