/*
  credits: https://github.com/Alicunde/Videoconference-Dish-CSS-JS
*/

// Function to delete Camera
function removeCamera(Camera) {
  Camera.parentNode.removeChild(Camera);
  sceneReset();
}

// Function to add Camera
function addCamera(Camera) {
  let background = $('#scene');
  background.append(Camera);
  sceneReset();
}