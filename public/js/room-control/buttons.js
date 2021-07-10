const delim = '%|~'; // delimiter between displayName and text in messages

// Add remote track to the DOM
function showRemoteTrack(track,participantId,idx) {
    track.addEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
        audioLevel => console.log(`Audio Level remote: ${audioLevel}`));
    track.addEventListener(
        JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
        (track) => {
            console.log(track.getParticipantId(),track.getType(),track.isMuted());
            onTrackMuted(track);
        })
    track.addEventListener(
        JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
        () => console.log('remote track stopped'));
    track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
        deviceId =>
            console.log(
                `track audio output device was changed to ${deviceId}`));
    const id = participantId + track.getType() + idx;
    if (track.getType() === 'video') {
        // initialising the mute icon
        let muteIcon = '<i class="fas fa-microphone remote-mic"></i>';
        const audioTrack = remoteTracks[participantId][0];
        if(audioTrack.isMuted()) {
            muteIcon = '<i class="fas fa-microphone-slash"></i>';
        }

        addCamera('scene',
            `<div class="camera" id="${participantId}camera">\
                <video autoplay="1" poster="images/user.png" id="${id}" />\
            </div>`);
        
            $(`#${participantId}camera`).append(`<div class="display-name-holder" id="${participantId}name"><span class="mute-icon">${muteIcon}</span><span class="camera-names">${getParticipantById(participantId).getDisplayName()}</span></div>`)
    } else {
        $('#scene').append(
            `<audio autoplay='1' id="${id}" />`);
    }
    
    track.attach($(`#${id}`)[0]);
    console.log('yo '+remoteTracks[participantId]);
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
    window.location.href = `/conversation/${roomId}?name=${displayName}`;
}

function toggleAVMuteButtons() {
// Toggles state of the video-button when video-button clicked
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

    // Toggles state of the audio-button when audio-button clicked
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
}

// Refreshes the messages whenever someone sends one
function refreshMessageBox() {
    // if chat window is open, then refresh
    if($('#chat-button').prop('value')=='1'){
        $('.message').remove();
        messages.forEach(message => {
            $('.messages-box').append(`<p class="message"><strong><i class="fas user-icon fa-user-circle"></i>    ${message.senderDisplayName}</strong><br>${message.text}</p>`);
        });
        height = $('.chat-window').height();
        $('.chat-window').animate({scrollTop: height},'slow');
    }
    // if not open, display notification
    else{
        $('.rounded-circle').removeClass('visually-hidden');
    }
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
            $('.participants-window').append(`<div class="window-title"><h4>Participants</h4></div>`);
            $('.participants-window').append(`<h5><i class="fas user-icon fa-user-circle"></i>    ${displayName} (You)</h5>`);
            participants=room.getParticipants();
            let participantDisplayNames=[];
            for (let index = 0; index < participants.length; index++) {
                const element = participants[index];
                const displayName = element._displayName;
                participantDisplayNames.push(displayName);                
                $('.participants-window').append(`<h5><i class="fas user-icon fa-user-circle"></i>    ${displayName}</h5>`);
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
                <div class="window-title">
                    <h4>Chat</h4>
                </div>
                <div class="messages-box"></div>
                <div class="chat-form-container">
                    <form id="chat-form">
                            <div class="form-group">
                                <button type="button" form="chat-form" class="btn" id="send-message"><i class="fas fa-paper-plane"></i></button>
                                <textarea class="form-control" id="text-message" rows="4" cols="40"></textarea>
                            </div>
                    </form>
                </div>`
                );
            // Refresh messages as soon as chat-window is opened
            refreshMessageBox();
            // Dismisses badge as soon as chat-window is opened
            $('.rounded-circle').addClass('visually-hidden');
            // Send message to other users on clicking send button
            $('#send-message').on("click",()=>{
                const message=$('#text-message').val();
                console.log('this is the message:' + message)
                if(message!='')
                    room.sendTextMessage(displayName+delim+message);
                $('#text-message').val('');
            })
        }
        else{
            $('#scene').css('right','0');
            layoutReset('scene');
            $('.chat-window').remove();
        }
    });
});