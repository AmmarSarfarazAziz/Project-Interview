let container = document.querySelector("#container");
let activeShape = null;
let active = false;
let myShapes = document.querySelectorAll('.shape');

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

//the function triggered by event with a mouse is clicked and held to start the dragging of the object
function dragStart(e) {
    if (e.target !== e.currentTarget) {
        active = true;
        // shape being dragged
        activeShape = e.target;

        if (activeShape !== null) {
            if (!activeShape.xOffset) {
                activeShape.xOffset = 0;
            }

            if (!activeShape.yOffset) {
                activeShape.yOffset = 0;
            }

            if (e.type === "mousedown") {
                console.log("Node dragging has begun!");
                activeShape.initialX = e.clientX - activeShape.xOffset;

                activeShape.initialY = e.clientY - activeShape.yOffset;
            }
        }
    }
}

//function for when the mouse click has been released and the drag ends
function dragEnd(e) {
    if (activeShape !== null) {
        activeShape.initialX = activeShape.currentX;
        activeShape.initialY = activeShape.currentY;
    }

      active = false;
      activeShape = null;
}

//function for when the dragging event is occuring and the object is being dragged
function drag(e) {
    if (active) {
        if (e.type === "mousemove") {
          activeShape.currentX = e.clientX - activeShape.initialX;
          activeShape.currentY = e.clientY - activeShape.initialY;
        }

        activeShape.xOffset = activeShape.currentX;
        activeShape.yOffset = activeShape.currentY;

        let domRect = activeShape.getBoundingClientRect();

        let leftX = domRect.left;
        let rightX = domRect.right;
        let hCenter = domRect.left + ((domRect.right - domRect.left)/2);
        let vCenter = domRect.top + ((domRect.bottom - domRect.top)/2);

        console.log('LeftX: ' + leftX);
        console.log('RightX: ' + rightX);
        console.log('hCenter: ' + hCenter);
        console.log('vCenter: ' + vCenter);

        alignPage();


        //setTranslate(activeShape.currentX, activeShape.currentY, activeShape);
    }
}

//translation function to move the shape to new position at the end of the dragging event
function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}


//function to find the closest fellow node for alignment of the activeShape
function findClosestNode(activeShape){
    
}

//function to align node to page if needed
function alignPage(leftX, rightX, hCenter, vCenter){
    if((leftX - 0)< 5){
        setTranslate(0, activeShape.currentY, activeShape);
    }
    if((800-rightX)<5){
        setTranslate(800, activeShape.currentY, activeShape);
    }
    if(Math.abs(400-hCenter) < 5){
        setTranslate(400, activeShape.currentY, activeShape);
    }
    if(Math.abs(300-vCenter) < 5){
        setTranslate(activeShape.currentX, 300, activeShape);
    }
    else{
        setTranslate(activeShape.currentX, activeShape.currentY, activeShape); 
    }

}