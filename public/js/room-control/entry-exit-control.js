/*
  credits: https://github.com/Alicunde/Videoconference-Dish-CSS-JS
*/

// Function to delete Camera
function removeCamera(Container,Camera) {
  Camera.parentNode.removeChild(Camera);
  layoutReset(Container);
}

// Function to add Camera
function addCamera(Container,Camera) {
  let background = $(`#${Container}`);
  background.append(Camera);
  layoutReset(Container);
}