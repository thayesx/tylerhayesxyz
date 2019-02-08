let images = [];
let imgPointer = 0;
let canSetImgPointer = true;

$(document).ready(() => {
  images = $(".galleryBox");
  setImgPointer();
}).keydown((event) => {
  if (event.which == 39) {
    nextPhoto();
  }
  if (event.which == 37) {
    prevPhoto();
  }
}).scroll(() => {
  if (canSetImgPointer) 
    setImgPointer();
  }
)

function setImgPointer() {
  for (let i = 0; i < images.length; i++) {
    let img = images[i];
    let imgTopDistance = img
    .getBoundingClientRect()
    .top;
    if (imgTopDistance < 800 && imgTopDistance >= 0) {
      imgPointer = i;
    }
  }
  isFirstOrLast();
}

function isFirstOrLast() {
  let leftBar = $("#leftBar");
  let rightBar = $("#rightBar");
  if (imgPointer == 0) {
    if (!leftBar.hasClass("hide"))
      leftBar.addClass("hide");
  }
  else if (imgPointer == images.length - 1) {
    if (!rightBar.hasClass("hide"))
      rightBar.addClass("hide");
  }
  else {
    if (leftBar.hasClass("hide"))
      leftBar.removeClass("hide");
    if (rightBar.hasClass("hide"))
      rightBar.removeClass("hide");
  }
}

function nextPhoto() {
  canSetImgPointer = false;
  setTimeout(() => {
    canSetImgPointer = true;
  }, 100);
  if (imgPointer < images.length - 1) {
    imgPointer++;
    if ($(images[imgPointer]).hasClass("half")) 
      imgPointer++;
    images[imgPointer].scrollIntoView();
  }
  isFirstOrLast();
}

function prevPhoto() {
  canSetImgPointer = false;
  setTimeout(() => {
    canSetImgPointer = true;
  }, 100);
  if (imgPointer > 0) {
    imgPointer--;
    if ($(images[imgPointer]).hasClass("half")) 
      imgPointer--;
    images[imgPointer].scrollIntoView();
  }
  isFirstOrLast();
}