let current_slot = null; //hovering.
let status_click = false; //current holding.
let current_itemId = null; //which box I am going to drop it into.
let current_itemType = null; //what type of item is already in that box.
let current_itemValue = null; //How many items are in that box(value).

const items = document.querySelectorAll('.item'); //grabs every item in the screen with class ".item".

items.forEach((item) => {
  item.addEventListener('click', moveItem); //allows you to move the item into diffrent slots "left and right".
  item.addEventListener('contextmenu', moveItem);
  item.setAttribute('draggable', false); // turns off normal dragging.
});

function moveItem() {
  event.preventDefault(); // stops browser from reopening the page when moving an item.
  const item = this; // item you clicked on.
  let waitItem = null;

  let ghostItem = item.cloneNode(true); // takes a copy of the item and follows your currsor.
  ghostItem.setAttribute('class', 'ghostItem'); // make a "new" copy that follows.
  item.classList.add('invisible'); // makes the orginal item invisible.

  let shiftX = ghostItem.getBoundingClientRect().left + 20; // positioning with your mouse
  let shiftY = ghostItem.getBoundingClientRect().top + 20; // positioning with your mouse

  ghostItem.style.position = 'absolute'; // makes the ghost(item) float ontop
  ghostItem.style.zIndex = 1000; // adds the ghost(item) to the screen
  document.body.append(ghostItem);

  ghostItem.onclick = function (event) { //when you click when holding the item.
    if (current_itemId && current_itemId != item.parentNode.id) {
      let area = document.getElementById(current_itemId);
      let free_space = !!!area.firstElementChild;

      if (free_space) { // places the item into the box if the box is free.
        area.append(item);
      } else if (current_itemType == item.id) { // if the id is the same it'll add them together making the number larger, while removing the extra item.
        let destiny = area.firstElementChild.lastElementChild.innerHTML;
        let origin = item.lastElementChild.innerHTML;
        let total = parseInt(destiny) + parseInt(origin);
        area.firstElementChild.lastElementChild.innerHTML = total;
        item.remove();
      } else { //if the item is diffrent it'll swap the item with the held item.
        item.parentNode.append(area.firstElementChild); 
        area.append(item);
      }
    }
    item && item.classList.remove('invisible'); //shows the real items. 
    ghostItem.remove(); //deletes the ghost item.
    status_click = !status_click; // stops the holding mode.
  };

  ghostItem.oncontextmenu = function (event) {
    event.preventDefault(); // prevents a item to be places in the orginal/default spot
    if (current_itemId && current_itemId != item.parentNode.id) { 
      let area = document.getElementById(current_itemId);
      let free_space = !!!area.firstElementChild;
      if (free_space) { //make a free space if the item held is use up in all spots
        let newItem = item.cloneNode(true);
        newItem.addEventListener('click', moveItem); // listens for moving items
        newItem.addEventListener('contextmenu', moveItem); // allows the item to move
        newItem.setAttribute('draggable', false); // turns off items that arn't true        
        if (parseInt(item.lastElementChild.innerHTML) == 1) {
          ghostItem.remove();
          status_click = !status_click; //allows you to place and will subtract 1 from the amount of items help such as 64 and placing a single block makin it 63
          item.remove();
        } else {
          item.lastElementChild.innerHTML =
            parseInt(item.lastElementChild.innerHTML) - 1; //removes the ghost item and the "invisable" item.
          ghostItem.lastElementChild.innerHTML =
            parseInt(ghostItem.lastElementChild.innerHTML) - 1;
        }
        newItem.lastElementChild.innerHTML = 1;
        area.append(newItem);
        newItem.classList.remove('invisible');
      } else if (current_itemType == item.id) {
        if (parseInt(item.lastElementChild.innerHTML) == 1) {
          ghostItem.remove();
          status_click = !status_click;
          item.remove();
        }
        let destiny = parseInt(
          area.firstElementChild.lastElementChild.innerHTML
        );const charc = document.getElementById("player");
        let origin = parseInt(item.lastElementChild.innerHTML);
        let ghost = parseInt(ghostItem.lastElementChild.innerHTML);

        area.firstElementChild.lastElementChild.innerHTML = destiny + 1;
        item.lastElementChild.innerHTML = origin - 1;
        ghostItem.lastElementChild.innerHTML = ghost - 1;
      }
    }
  };

  status_click = !status_click;

  if (status_click) {
    moveAt(event.pageX, event.pageY);
  }

  function moveAt(pageX, pageY) {
    ghostItem.style.left = pageX - shiftX + 'px';
    ghostItem.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    if (status_click) {
      moveAt(event.pageX, event.pageY);
    }
    ghostItem.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    ghostItem.hidden = false;

    if (!elemBelow) return;
    let droppableBelow = elemBelow.closest('.slot');
    if (current_slot != droppableBelow) {
      if (current_slot) { //if open
        leaveDroppable(current_slot); //
      }
      current_slot = droppableBelow; //add into a inventory slot
      if (current_slot) {
        enterDroppable(current_slot);
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove); // for the ghost block to follow the cursor.
}

function enterDroppable(elem) {
  current_itemId = elem.id;
  if (elem.firstElementChild) {
    current_itemType = elem.firstElementChild.id;
    child = elem.firstElementChild;
    current_itemValue = child.lastElementChild.innerHTML;
  } 
}

function leaveDroppable(elem) {
  current_itemId = null;
  current_itemType = null;
  current_itemValue = null;
  free_space = false;
}
function character_overlay() {

  var selector = document.getElementById('character-selected');
  
  // 2. Get the value (the image URL) from that element
  var newImage = selector.value;
  
  // 3. Apply that URL to the 'src' of the display image
  document.getElementById('displayArea').src = newImage;
}

window.addEventListener('keydown', function(event) {
  if (event.key.toLowerCase() === 'm') {
    const overlay = document.getElementById('overlay-container');
    const iframe = document.getElementById('overlay-iframe');

    overlay.style.display = 'block';
  }
});
