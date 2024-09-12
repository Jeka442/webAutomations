setInterval(() => {
  document.querySelectorAll(".drag").forEach((elm) => {
    setDraggable(elm);
  });

  function setDraggable(elmnt) {
    if (!elmnt.getAttribute("draggable")) {
      // Preserve the original width, height, and position of the element
      const originalWidth = elmnt.offsetWidth + 'px';
      const originalHeight = elmnt.offsetHeight + 'px';
      const originalRect = elmnt.getBoundingClientRect();
  
      // Create a placeholder div with the same dimensions and position
      const placeholder = document.createElement('div');
      placeholder.style.width = originalWidth;
      placeholder.style.height = originalHeight;
      placeholder.style.visibility = 'hidden'; // Invisible placeholder
      placeholder.style.position = 'relative'; // To keep the layout intact
  
      // Insert the placeholder before the original element
      elmnt.parentNode.insertBefore(placeholder, elmnt);
  
      // Set the original element's width and height before switching to fixed
      elmnt.style.width = originalWidth;
      elmnt.style.height = originalHeight;
  
      // Set the element to fixed positioning and move it
      elmnt.style.position = "fixed";
      elmnt.style.zIndex = "2147483647";
      elmnt.style.top = originalRect.top + 'px';
      elmnt.style.left = originalRect.left + 'px';
      elmnt.style.cursor = "grab";
  
      // Prevent default click behavior and bubbling
      elmnt.addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          e.preventDefault();
        },
        true
      );
  
      // Call the dragElement function to enable dragging
      dragElement(elmnt);
    }
  }
  
  

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    if (!elmnt.getAttribute("draggable")) {
      elmnt.addEventListener("mousedown", dragMouseDown);
      elmnt.setAttribute("draggable", true);
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:

      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement(e) {
      e.preventDefault();
      e.stopPropagation();
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}, 1000);
