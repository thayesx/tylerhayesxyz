let photos = [];
let currentPhoto = 0;
let canUpdateCurrentPhoto = true;
// if (window.location.pathname) currentPhoto = window

$(document).ready(() => {
  images = $(".galleryBox");
  setCurrentPhoto();
}).keydown((event) => {
  console.log("current", currentPhoto);
  if (event.which == 39) {
    nextPhoto();
  }
  if (event.which == 37) {
    prevPhoto();
  }
}).scroll((event) => {
  if (canUpdateCurrentPhoto) 
    setCurrentPhoto();
  }
)

function setCurrentPhoto() {
  for (let i = 0; i < images.length; i++) {
    let img = images[i];
    let imgTopDistance = img
      .getBoundingClientRect()
      .top;
    if (imgTopDistance < 100 && imgTopDistance > 0) {
      currentPhoto = i;
    }
  }
}

function nextPhoto() {
  canUpdateCurrentPhoto = false;
  setTimeout(() => {
    canUpdateCurrentPhoto = true;
  }, 100);
  if (currentPhoto < images.length - 1) {
    currentPhoto++;
    if ($(images[currentPhoto]).hasClass("half")) 
      currentPhoto++;
    images[currentPhoto].scrollIntoView();
  }
}

function prevPhoto() {
  canUpdateCurrentPhoto = false;
  setTimeout(() => {
    canUpdateCurrentPhoto = true;
  }, 100);
  if (currentPhoto > 0) {
    currentPhoto--;
    if ($(images[currentPhoto]).hasClass("half")) 
      currentPhoto--;
    images[currentPhoto].scrollIntoView();
  }
}