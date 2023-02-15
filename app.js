const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let size = 10;
let isErasing = false;
let lastMouseX, lastMouseY;

//erase

const eraseButton = document.getElementById("eraseButton");
// eraseButton.addEventListener("click", function () {
//   isErasing = !isErasing; //toggle the erase state on each click
//   eraseButton.style.background = isErasing ? "red" : "blue";
// });

// //add a mouse down event listener to start erasing
// canvas.addEventListener("mousedown", function (event) {
//   if (isErasing) {
//     lastMouseX = event.clientX - canvas.offsetLeft;
//     lastMouseY = event.clientY - canvas.offsetTop;
//     ctx.globalCompositeOperation = "destination-out";
//   }
// });

//add mouse event to erase

//draw on canvas
function draw(e) {
  if (!isDrawing) return;

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.lineWidth = size;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = currentColor;
  ctx.stroke();

  // update lastX and lastY variables
  lastX = e.offsetX;
  lastY = e.offsetY;
  // hue = (hue + 1) % 360;
}

//Clear Canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearCanvas);

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

//Color
let currentColor = "black";

const colorInput = document.getElementById("color-picker");
colorInput.addEventListener("change", () => {
  currentColor = colorInput.value;
});

const sizeSlider = document.getElementById("size-slider");
sizeSlider.addEventListener("input", () => {
  size = sizeSlider.value;
});

const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", () => {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "drawing.png";
  link.click();
});
