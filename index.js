let transitionItemsDelay = 2800;
let i;
let transitionItems = [];

$(document).ready(() => {
  transitionItems = $(".transitionItem");
  startTransitionItems();
  animateLoop();
})

function startTransitionItems() {
  i = Math.floor((Math.random() * 100)) % (transitionItems.length - 1);
  show(transitionItems[i]);
  i++;
}

function animateLoop() {
  setTimeout(() => {
    showNextItem(i);
    if (i < transitionItems.length - 1) 
      i++;
    else 
      i = 0;
    animateLoop(transitionItems);
  }, transitionItemsDelay)
}

function showNextItem(i) {
  let prevItem = i == 0
    ? transitionItems[transitionItems.length - 1]
    : transitionItems[i - 1];
  let thisItem = transitionItems[i];

  hide(prevItem);
  show(thisItem);
}

function show(obj) {
  console.log("show", obj);
  let thisObj = $(obj);
  if (!thisObj.hasClass("show")) {
    thisObj.addClass("show");
  }
}

function hide(obj) {
  let thisObj = $(obj);
  if (thisObj.hasClass("show")) {
    thisObj.removeClass("show");
  }
}