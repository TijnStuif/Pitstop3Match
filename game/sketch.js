let tileGrid;
let draggingTile = null; // Variable to store the dragging tile
const tileWidth = 6, tileHeight = 6, tileSize = 80;

//preloads GameManager and the tileGrid
function preload() {
    new GameManager();
    tileGrid = new TileGrid(tileWidth, tileHeight, tileSize);
}

//sets up the canvas
function setup() {
    createCanvas(500, 500);
}

//draws the background and activates the draw function from tileGrid
function draw() {
    background(0, 150, 0);
    noStroke();
    tileGrid.draw();
}

//does all the logic for a touch start
function touchStarted(event) {
    const tile = tileGrid.getTileAtPosition(createVector(event.x, event.y));
    if (tile) {
        tile.startDragging();
        draggingTile = tile; // Set the draggingTile variable
    }
}

//does all the logic for a moving
function touchMoved(event) {
    if (draggingTile) {
        draggingTile.setPosition(createVector(event.x, event.y));
    }
}

//does all the logic for a touch ending
function touchEnded() {
    if (draggingTile) {
        draggingTile.stopDragging();
        draggingTile = null; // Reset the draggingTile variable after touch ends
    }
}