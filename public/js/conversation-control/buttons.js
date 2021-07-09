const delim = '%|~'; // delimiter between displayName and text in messages

// Leave room
function leaveRoom() {
    // for (let i = 0; i < localTracks.length; i++) {
    //     localTracks[i].dispose();
    // }
    // room.leave();
    // connection.disconnect();
    window.location.href = '/';
}

// Refreshes the messages whenever someone sends one
function refreshMessageBox() {
    $('.message').remove();
    messages.forEach(message => {
        $('.messages-box').append(`<p class="message"><strong><i class="fas user-icon fa-user-circle"></i>    ${message.senderDisplayName}</strong><br>${message.text}</p>`);
    });
    height = $('.chat-window').height();
    $('.chat-window').animate({scrollTop: height},'slow');
}

window.addEventListener("load", function (event) {
    console.log('loaded!!');
    
    // Leave room when leave room button clicked
    $('#leaveroom-button').click(leaveRoom); // add a redirect to a end-call page
    // Leave room when tab killed
    $(window).on('beforeunload', leaveRoom);
    $(window).on('unload', leaveRoom);

    // Show the participants list when participants-button is clicked
    $('#participants-button').on("click",()=>{
        oldState=Number($('#participants-button').prop('value'));
        $('#participants-button').prop('value',String(1-oldState))
        if(oldState==0){
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
    // load all messages
    refreshMessageBox();

    // add listener to send button
    $('#send-message').on("click",()=>{
        const message=$('#text-message').val();
        console.log('this is the message:' + message)
        if(message!='')
            room.sendTextMessage(displayName+delim+message);
        $('#text-message').val('');
    })

    $('#join-button').on("click",()=>{
        window.location.href=`/${roomId}?name=${displayName}`;
    })
});