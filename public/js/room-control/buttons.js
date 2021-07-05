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
  $('#screenshare-button').on("click",()=>{
    try{
      screenShare();
    }
    catch(e){
      console.error(e);
    }
  });

  // Show the participants list when participants-button is clicked
  $('#participants-button').on("click",()=>{
    oldState=Number($('#participants-button').prop('value'));
    $('#participants-button').prop('value',String(1-oldState))
    if(oldState==0){
      // Make sure to close chat-window if open
      $('.chat-window').remove();
      $('#chat-button').prop('value','0');

      $('#scene').css('right','20%');
      layoutReset('scene');
      $('#options').append(`<div class="participants-window"></div>`);
      $('.participants-window').append(`<h4>Participants</h4>`);
      $('.participants-window').append(`<h5><i class="fas user-icon fa-user-circle"></i>  ${displayName}</h5>`);
      participants=room.getParticipants();
      let participantDisplayNames=[];
      for (let index = 0; index < participants.length; index++) {
        const element = participants[index];
        const displayName = element._displayName;
        participantDisplayNames.push(displayName);        
        $('.participants-window').append(`<h5><i class="fas user-icon fa-user-circle"></i>  ${displayName}</h5>`);
      }
    }
    else{
      $('#scene').css('right','0');
      layoutReset('scene');
      $('.participants-window').remove();
    }
  });

  // Show the chats when chat-button is clicked
  $('#chat-button').on("click",()=>{
    oldState=Number($('#chat-button').prop('value'));
    $('#chat-button').prop('value',String(1-oldState))
    if(oldState==0){
      // Make sure to close participant-window if open
      $('.participants-window').remove();
      $('#participants-button').prop('value','0');

      $('#scene').css('right','20%');
      layoutReset('scene');
      $('#options').append(`<div class="chat-window"></div>`);
      $('.chat-window').html(
        `
        <h4>Chat</h4>
        <form id="chat-form">
            <div class="form-group">
              <button type="button" form="chat-form" class="btn" id="send-message"><i class="fas fa-paper-plane"></i></button>
              <textarea class="form-control" id="text-message" rows="3" cols="40"></textarea>
            </div>
        </form>`
        );
      // Send message to other users
      $('#send-message').on("click",()=>{
        const message=$('#text-message').val();
        console.log('this is the message:' + message)
        if(message!='')
          room.sendTextMessage(message);
        $('#text-message').val('');
        console.log(`sent message ${message}`);
      })
    }
    else{
      $('#scene').css('right','0');
      layoutReset('scene');
      $('.chat-window').remove();
    }
  });

});