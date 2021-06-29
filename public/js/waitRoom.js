const roomId = "<%= roomId %>";

document.querySelector('.join-form').action=window.location.href;

const myVideo = document.getElementById('user-video');
myVideo.muted = true;

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream);
})

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  })
}