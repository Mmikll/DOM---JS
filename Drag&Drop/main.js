const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");

//Drag and Drops Elements
const dragstartFunc = (e) => {
  e.dataTransfer.setData("text", e.target.id); //crucial part
  //e.dataTransfer.setDragImage("imageObject", x, y); change image when it drags
};

const dragoverFunc = (e) => {
  if (!e.target.classList.contains("dropped")) {
    e.preventDefault();
  }
  //   if (e.target.classList.contains("dropped")) {
  //     e.target.classList.add("droppable-hover");
  //   }
};

const dragEnt = (e) => {
  if (!e.target.classList.contains("dropped")) {
    e.target.classList.add("droppable-hover");
  }
};

const dragLeave = (e) => {
  e.target.classList.remove("droppable-hover");
};

const dropFunc = (e) => {
  e.preventDefault();
  const draggableElementData = e.dataTransfer.getData("text");
  const droppableElementData = e.target.getAttribute("data-draggable-id");
  if (draggableElementData === droppableElementData) {
    e.target.classList.add("dropped");
    const draggableElement = document.getElementById(draggableElementData);
    e.target.style.backgroundColor = draggableElement.style.color;
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    e.target.insertAdjacentHTML(
      "afterbegin",
      `<i class="fa fa-${draggableElementData}"></i>`
    );
  }

  e.target.classList.remove("droppable-hover");
};

///Drag & Drops Elements

draggableElements.forEach((elem) => {
  elem.addEventListener("dragstart", dragstartFunc);
  //otrher dragg functions
  // elem.addEventListener("drag", drag);
  // elem.addEventListener("dragend", dragEnd);
});

droppableElements.forEach((elem) => {
  elem.addEventListener("dragenter", dragEnt);
  elem.addEventListener("dragover", dragoverFunc);
  elem.addEventListener("dragleave", dragLeave);
  elem.addEventListener("drop", dropFunc);
});
