const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let size = 10;

function draw(e) {
  if (!isDrawing) return;

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.lineWidth = size;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  // update lastX and lastY variables
  lastX = e.offsetX;
  lastY = e.offsetY;
  // hue = (hue + 1) % 360;
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

const colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener("change", () => {
  hue = parseInt(colorPicker.value.slice(1), 16);
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
