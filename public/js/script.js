/* global $, JitsiMeetJS */

const options = {
    hosts: {
        domain: 'beta.meet.jit.si',
        muc: 'conference.beta.meet.jit.si', // FIXME: use XEP-0030
        focus: 'focus.beta.meet.jit.si',
    },
    bosh: 'https://beta.meet.jit.si/http-bind', // FIXME: use xep-0156 for that
    websocket: 'wss://beta.meet.jit.si/xmpp-websocket', // FIXME: use xep-0156 for that
    websocketKeepAliveUrl: 'https://beta.meet.jit.si/_unlock',
    bridge: 'jitsi-videobridge.jitsi.example.com', // FIXME: use XEP-0030
    // The name of client node advertised in XEP-0115 'c' stanza
    clientNode: 'http://jitsi.org/jitsimeet',
    p2p: {
        enabled: false
    }
};

const confOptions = {
    p2p: {
        enabled: false
    }
};

let connection = null;
let hasJoinedConversation = false;
let room = null;
let num=0;

let localTracks = [];
const remoteTracks = {};
let messages = [];

/**
 * Handles local tracks.f
 * @param tracks Array with JitsiTrack objects
 */
function onLocalTracks(tracks) {
    localTracks = tracks;
    for (let i = 0; i < localTracks.length; i++) {
        localTracks[i].addEventListener(
            JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
            audioLevel => console.log(`Audio Level local: ${audioLevel}`));
        localTracks[i].addEventListener(
            JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
            () => console.log('local track muted'));
        localTracks[i].addEventListener(
            JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
            () => console.log('local track stoped'));
        localTracks[i].addEventListener(
            JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
            deviceId =>
                console.log(
                    `track audio output device was changed to ${deviceId}`));
        
        if (localTracks[i].getType() === 'video') {

            addCamera('scene',
                `<div class="camera" id="localCamera">\
                    <video autoplay="1" id="localVideo${i}" />\
                </div>`);

            $('#localCamera').append(`<div class="display-name-holder" id="localName"><span class="camera-names">${displayName} (You)</span></div>`);
            localTracks[i].attach($(`#localVideo${i}`)[0]);
        } else {
            $('#scene').append(
                `<audio autoplay='1' muted='false' id="localAudio${i}" />`);
            localTracks[i].attach($(`#localAudio${i}`)[0]);
        }
        if (hasJoinedConversation) {
            room.addTrack(localTracks[i]);
        }
    }
    if(hasJoinedRoom){
        // If user entered with video muted, reflect on button
        if(startVideoMuted){
            toggleVideoMute();
        }
        // If user entered with audio muted, reflect on button
        if(startAudioMuted){
            toggleAudioMute();
        }
        // Add onclick listeners to the audio/video mute buttons 
        toggleAVMuteButtons();
    }
}

/**
 * Handles remote tracks
 * @param track JitsiTrack object
 */

function onRemoteTrack(track) {
    if (track.isLocal()) {
        return;
    }
    const participantId = track.getParticipantId();
    console.log('remote::'+num+participantId);
    if (!remoteTracks[participantId]) {
        remoteTracks[participantId] = [];
    }
    const idx = remoteTracks[participantId].push(track);
    if(hasJoinedRoom) {
        showRemoteTrack(track,participantId,idx);
    }
}

/**
 * That function is executed when the conference is joined
 */
function onConferenceJoined() {
    console.log('conference joined!');
    hasJoinedConversation = true;
    for (let i = 0; i < localTracks.length; i++) {
        room.addTrack(localTracks[i]);
    }
}

/**
 *
 * @param id
 */
function onUserLeft(id) {
    console.log('user left');
    if (!remoteTracks[id]) {
        return;
    }
    const tracks = remoteTracks[id];

    for (let i = 0; i < tracks.length; i++) {
        tracks[i].detach($(`#${id}${tracks[i].getType()}`));
    }
}
function onTrackRemoved(track)
{
    const participantId = track.getParticipantId();

    // if local user track, then no need to remove
    if(!participantId){
        return;
    }
    
    const type = track.getType();
    const idx = remoteTracks[participantId].indexOf(track);
    remoteTracks[participantId].splice(idx,1);
    
    if(hasJoinedRoom) {
        let id;
        if(type=='audio'){
            id = participantId + type + '1';
            Audio = document.getElementById(id);
            Audio.parentNode.removeChild(Audio)
        }
        else{
            id = participantId + type + '2';
            Camera = document.getElementById(id).parentNode;
            removeCamera('scene',Camera);
        }
    }

    console.log(`track removed!!!${track}`);
}

function onTrackMuted(track) {
    const participantId = track.getParticipantId();

    // if local user track, then no need to do anything
    if(!participantId){
        return;
    }
    
    const type = track.getType();
    const idx = remoteTracks[participantId].indexOf(track);
    if(hasJoinedRoom) {
        let id;
        if(type=='audio'){
            id = participantId + 'name';
            const displayNameElem = document.getElementById(id).querySelector('.mute-icon');
            if(track.isMuted())
                displayNameElem.innerHTML='<i class="fas fa-microphone-slash"></i>';
            else{
                displayNameElem.innerHTML='<i class="fas fa-microphone remote-mic"></i>';
            }
        }
        else{
            id = participantId + type + '2';
            const videoElem = document.getElementById(id);
            if(track.isMuted())
                videoElem.style.visibility='hidden';
            else
                videoElem.style.visibility='visible';
        }
    }
}

function onScreenShare() {
    
}
// Gets called when message received from a participant
function onMessageReceived(senderDisplayName,text) {
    messages.push({senderDisplayName,text});
    refreshMessageBox();
}
/**
 * That function is called when connection is established successfully
 */
function onConnectionSuccess() {
    room = connection.initJitsiConference(roomId, confOptions);
    room.setDisplayName(displayName);
    room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
    room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, onTrackRemoved);
    room.on(
        JitsiMeetJS.events.conference.CONFERENCE_JOINED,
        onConferenceJoined);
    room.on(JitsiMeetJS.events.conference.USER_JOINED, (id,user) => {
        console.log('user join '+user.getDisplayName());
        console.log(getParticipantById(id));
        remoteTracks[id] = [];
    });
    room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
    // room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, 
    //     track => console.log(`${track.getType()} - ${track.isMuted()}`));
    room.on(
        JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
        (userID, displayName) => console.log(`changed : ${userID} - ${displayName}`));
    // room.on(
    //     JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
    //     (userID, audioLevel) => console.log(`${userID} - ${audioLevel}`));
    room.on(
        JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED,
        () => console.log(`${room.getPhoneNumber()} - ${room.getPhonePin()}`));
    room.on(
        JitsiMeetJS.events.conference.PARTICIPANT_PROPERTY_CHANGED,
        (user, propertyKey, oldPropertyValue, propertyValue) => {
            console.log('participant property changed',getParticipantById(user._id)._properties.presenter);
        });
    room.on(
        JitsiMeetJS.events.conference.MESSAGE_RECEIVED,
        (id, text, ts) => {
            let senderDisplayName = text.split(delim,2)[0];
            let message = text.split(delim,2)[1];
            // If message sent by this user
            if(room.myUserId() == id)
                senderDisplayName = 'You';
            console.log(senderDisplayName+' sent '+message+' at '+ts);
            onMessageReceived(senderDisplayName,message);
        }
    )
    room.join();
}

/**
 * This function is called when the connection fail.
 */
function onConnectionFailed() {
    console.error('Connection Failed!');
}

/**
 * This function is called when the connection fail.
 */
function onDeviceListChanged(devices) {
    console.info('current devices', devices);
}

/**
 * This function is called when we disconnect.
 */
function disconnect() {
    console.log('disconnect!');
    connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
        onConnectionSuccess);
    connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_FAILED,
        onConnectionFailed);
    connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
        disconnect);
}

let isVideo = true;
let screenSharePermission;

function screenShare() {
    screenSharePermission = false;

    // if user wants to screen-share but someone else is screen-sharing
    if(isVideo && isPresenting()){
        alert('Please wait. You cannot present when someone else is presenting');
        throw 'Error: Someone else is presenting';
    }

    isVideo = !isVideo;
    if (localTracks[1]) {
        localTracks[1].dispose();
        localTracks.pop();
    }

    JitsiMeetJS.createLocalTracks({
        devices: [ isVideo ? 'video' : 'desktop' ],
        constraints: {
            video: {
                width: { min: 320, ideal: 960, max: 1440 },
                height: { min: 240, ideal: 720, max: 1080 }
            }
        },
    })
        .then(tracks => {
            localTracks.push(tracks[0]);
            localTracks[1].addEventListener(
                JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                () => console.log('local track muted'));
            localTracks[1].addEventListener(
                JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                () => console.log('local track stopped'));
            localTracks[1].attach($('#localVideo1')[0]);
            room.addTrack(localTracks[1]);

            // if control reaches here, user has given screen-share permission
            if(!isVideo){
                screenSharePermission = true;
            }
            
            // switch to video
            if(isVideo){
                // if localVideo was muted before, then it should be muted after screen-share too
                if($('#video-button').prop('value')=='1') {
                    toggleVideoMute();
                }
                //remove the local user as presenter
                room.setLocalParticipantProperty('presenter','no');
            }
            // switch to screen-share
            else{
                //setting the local user as presenter
                room.setLocalParticipantProperty('presenter','yes');
                
            }
        })
        .then(()=>{
            // Change state of button according to video feed
            oldState=Number($('#screenshare-button').prop('value'));
            if(screenSharePermission && oldState==0){
                $('#screenshare-button').prop('value',String(1-oldState));
                $('#screenshare-button').css({'background-color': 'rgb(54, 221, 32)','color':'white'});
            }
            else{
                $('#screenshare-button').prop('value',String(1-oldState));
                $('#screenshare-button').css({'background-color':'#efefef','color':'#070C4D'});
            }
        })
        .catch(error => {
            console.log(error);
            // if permission to share screen denied, turn video back on
            if(!isVideo)
                screenShare();
        });
}

/**
 *
 * @param selected
 */
function changeAudioOutput(selected) { // eslint-disable-line no-unused-vars
    JitsiMeetJS.mediaDevices.setAudioOutputDevice(selected.value);
}

// JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
const initOptions = {
    disableAudioLevels: true,
    requireDisplayName: true,
    p2p: {
        enabled: false
    }
};

JitsiMeetJS.init(initOptions);

options.bosh += `?room=${roomId}`;
connection = new JitsiMeetJS.JitsiConnection(null, null, options);

connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
    onConnectionSuccess);
connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_FAILED,
    onConnectionFailed);
connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
    disconnect);

JitsiMeetJS.mediaDevices.addEventListener(
    JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
    onDeviceListChanged);

connection.connect();

if(hasJoinedRoom) {
    JitsiMeetJS.createLocalTracks(
        {
            devices: [ 'audio', 'video' ],
            constraints: {
                video: {
                    width: { min: 320, ideal: 960, max: 1440 },
                    height: { min: 240, ideal: 720, max: 1080 }
                }
            }, 
        })
        .then(onLocalTracks)
        .catch(error => {
            throw error;
        });
}

if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
    JitsiMeetJS.mediaDevices.enumerateDevices(devices => {
        const audioOutputDevices
            = devices.filter(d => d.kind === 'audiooutput');

        if (audioOutputDevices.length > 1) {
            $('#audioOutputSelect').html(
                audioOutputDevices
                    .map(
                        d =>
                            `<option value="${d.deviceId}">${d.label}</option>`)
                    .join('\n'));

            $('#audioOutputSelectWrapper').show();
        }
    });
}

function getParticipantById(id){
    participants=room.getParticipants();
    const participant=participants.find(pt=>pt._id===id);
    return participant;
}

function isPresenting() {
    participants=room.getParticipants();
    const participant=participants.find(pt=>pt._properties.presenter==='yes');
    return participant;
}
