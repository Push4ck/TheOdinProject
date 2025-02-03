const gridContainer = document.getElementById("grid");
const clearButton = document.getElementById("clear");
const changeColorButton = document.getElementById("changeColor");
const rainbowColorButton = document.getElementById("rainbowColor");
const gridSizeSlider = document.getElementById("gridSize");
const gridSizeValue = document.getElementById("gridSizeValue");
const colorPicker = document.getElementById("colorPicker");

let gridSize = 16; // Default grid size
let isRainbowMode = false; // Track if rainbow mode is active
let currentColor = "black"; // Default color for change color button
let rainbowIndex = 0; // Index for rainbow color cycling

// Create grid based on the size
function createGrid(size) {
  gridContainer.innerHTML = ""; // Clear any existing grid
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // Create grid items
  for (let i = 0; i < size * size; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.addEventListener("mouseover", colorGridItem);
    gridContainer.appendChild(gridItem);
  }
}

// Color grid item on mouseover
function colorGridItem(e) {
  if (isRainbowMode) {
    e.target.style.backgroundColor = getRainbowColor();
  } else {
    e.target.style.backgroundColor = currentColor;
  }
}

// Get a smooth rainbow color (cycling through the colors)
function getRainbowColor() {
  const rainbowColors = [
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#00FF00", // Green
    "#0000FF", // Blue
    "#4B0082", // Indigo
    "#8B00FF", // Violet
  ];

  const color = rainbowColors[rainbowIndex];
  rainbowIndex = (rainbowIndex + 1) % rainbowColors.length; // Cycle back to the first color

  return color;
}

// Clear the grid
function clearGrid() {
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.style.backgroundColor = "white";
  });
}

// Change the grid size dynamically
function updateGridSize() {
  gridSize = gridSizeSlider.value;
  gridSizeValue.textContent = gridSize;
  createGrid(gridSize);
}

// Function to set the active button
function setActiveButton(button) {
  // Remove 'active' class from all buttons
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => btn.classList.remove("active"));

  // Add 'active' class to the clicked button
  button.classList.add("active");
}

// Event Listeners
clearButton.addEventListener("click", clearGrid);

changeColorButton.addEventListener("click", () => {
  isRainbowMode = false;
  colorPicker.click(); // Open the color picker when the button is clicked
  setActiveButton(changeColorButton); // Highlight the active button
});

// When color is selected from the color picker
colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
  isRainbowMode = false;
  setActiveButton(changeColorButton); // Highlight the active button
});

rainbowColorButton.addEventListener("click", () => {
  isRainbowMode = !isRainbowMode;
  setActiveButton(rainbowColorButton); // Highlight the active button
});

gridSizeSlider.addEventListener("input", updateGridSize);

// Initialize the grid
createGrid(gridSize);
