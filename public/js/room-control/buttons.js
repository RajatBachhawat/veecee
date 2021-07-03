function changeName()
{
    //room.getParticipantById(localTracks[1].getParticipantId())._displayName = document.getElementById("txtName").value;
    //console.log('name changed yay to '+room.getParticipantById(localTracks[1].getParticipantId())._displayName);
    console.log('henlo');
    room.setDisplayName('dawg');
    // id = localTracks[1].getParticipantId();
    // console.log('id: ' + id);
    // console.log('parts: ');
    // console.log(room.getParticipants());
    // getParticipantById(id)._displayName='dawg';
}
// Toggle video
function toggleVideoMute()
{
  if(localTracks[1].isMuted()){
    localTracks[1].unmute();
  }
  else{
    localTracks[1].mute();
  }
}
// Toggle audio
function toggleAudioMute()
{
  if(localTracks[0].isMuted()){
    localTracks[0].unmute();
  }
  else{
    localTracks[0].mute();
  }
}

// Leave room
function leaveRoom() {
  for (let i = 0; i < localTracks.length; i++) {
    localTracks[i].dispose();
  }
  room.leave();
  connection.disconnect();
}

window.addEventListener("load", function (event) {
  console.log('loaded!!');
  // If video is muted at the start, show the correct icon
  if(startVideoMuted){
    $('#video-button').prop('value','1');
    $('#video-button').html('<i class="fas fa-video-slash"></i>')
    $('#video-button').css({'background-color':'#ff2600','color':'white'});
  }
  // If audio is muted at the start, show the correct icon
  if(startAudioMuted){
    $('#audio-button').prop('value','1');
    $('#audio-button').html('<i class="fas fa-microphone-slash"></i>')
    $('#audio-button').css({'background-color':'#ff2600','color':'white'});
  }

  // Toggles state of the video when video-button clicked
  $('#video-button').click(()=>{
    $('#toggle-video').click();
    oldState=Number($('#video-button').prop('value'));
    $('#video-button').prop('value',String(1-oldState))
    if(oldState==0){
      $('#video-button').html('<i class="fas fa-video-slash"></i>')
      $('#video-button').css({'background-color':'#ff2600','color':'white'});
    }
    else{
      $('#video-button').html('<i class="fas fa-video"></i>')
      $('#video-button').css({'background-color':'#efefef','color':'#070C4D'});
    }
    toggleVideoMute()
  })

  // Toggles state of the audio when audio-button clicked
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
    toggleAudioMute();
  })
  
  // Leave room when leave room button clicked
  $('#leaveroom-button').click(leaveRoom); // add a redirect to a end-call page
  // Leave room when tab killed
  $(window).on('beforeunload', leaveRoom);
  $(window).on('unload', leaveRoom);
  // Share screen when screen-share button is clicked
  $('#screenshare-button').click(screenShare);

}, false);