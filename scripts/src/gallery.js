let images = [];
let imgPointer = 0;
let canSetImgPointer = true;

let rightArrowKey = 39;
let downArrowKey = 40;
let leftArrowKey = 37;
let upArrowKey = 38;

let leftBar;
let rightBar;

$(document).ready(() => {
  images = $(".galleryBox");
  leftBar = $("#leftBar");
  rightBar = $("#rightBar");
  setImgPointer();
}).keydown((event) => {
  if (event.which == upArrowKey || event.which == leftArrowKey) {
    prevPhoto();
    event.preventDefault();
  }
  if (event.which == downArrowKey || event.which == rightArrowKey) {
    nextPhoto();
    event.preventDefault();
  }
}).scroll(() => {
  if (canSetImgPointer) 
    setImgPointer();
  }
)

function setImgPointer() {
  // Determine last photo viewed based on proximity to top of viewport
  for (let i = 0; i < images.length; i++) {
    let img = images[i];
    let imgTopDistance = img
      .getBoundingClientRect()
      .top;
    if (imgTopDistance < 100 && imgTopDistance > -800) {
      imgPointer = i;
    }
  }
  isFirstOrLast();
}

function isFirstOrLast() {
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
  blockImgPointerUpdate();
  if (imgPointer < images.length - 1) {
    if ($(images[imgPointer]).hasClass("half") && imgPointer < images.length - 2) 
      imgPointer += 2;
    else 
      imgPointer++;
    images[imgPointer].scrollIntoView();
  }
  isFirstOrLast();
}

function prevPhoto() {
  blockImgPointerUpdate();
  if (imgPointer > 0) {
    if ($(images[imgPointer]).hasClass("half") && imgPointer > 1) 
    imgPointer -= 2;
    else 
    imgPointer--;
    images[imgPointer].scrollIntoView();
  }
  isFirstOrLast();
}

function blockImgPointerUpdate() {
  canSetImgPointer = false;
  setTimeout(() => {
    canSetImgPointer = true;
  }, 100);
};