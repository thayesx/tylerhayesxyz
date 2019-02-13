let transitionItemsDelay = 2800;
let i;
let transitionItems = [];

$(document).ready(() => {
  transitionItems = $(".transitionItem");
  startTransitionItems();
  animateLoop();
})

function startTransitionItems() {
  i = Math.floor((Math.random() * 100)) % transitionItems.length;
  let firstTransitionItem = transitionItems[i];
  show(firstTransitionItem);
  i++;
}

function animateLoop() {
  setTimeout(() => {
    showNextItem();
    animateLoop(transitionItems);
  }, transitionItemsDelay)
}

function showNextItem() {
  let prevItem = transitionItems[(i - 1) % transitionItems.length];
  let thisItem = transitionItems[i % transitionItems.length];
  hide(prevItem);
  show(thisItem);
  i++;
}

function show(obj) {
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