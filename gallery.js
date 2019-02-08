let photos = [];
let currentPhoto = 0;
let canUpdateCurrentPhoto = true;

$(document).ready(() => {
  images = $(".galleryBox");
  setCurrentPhoto();
}).keydown((event) => {
  if (event.which == 39) {
    nextPhoto();
  }
  if (event.which == 37) {
    prevPhoto();
  }
}).scroll(() => {
  if (canUpdateCurrentPhoto) 
    setCurrentPhoto();
  }
)

function setCurrentPhoto() {
  if (!images) 
    return;
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
  if (!images) 
    return;
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
  if (!images) 
    return;
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