let tileGrid;
let draggingTile = null; // Variable to store the dragging tile
const tileWidth = 6, tileHeight = 6, tileSize = 80;

function preload() {
    new GameManager();
    tileGrid = new TileGrid(tileWidth, tileHeight, tileSize);
}

function setup() {
    createCanvas(500, 500);
}

function draw() {
    background(0, 150, 0);
    noStroke();
    tileGrid.draw();
}

function touchStarted(event) {
    const tile = tileGrid.getTileAtPosition(createVector(event.x, event.y));
    if (tile) {
        tile.startDragging();
        draggingTile = tile; // Set the draggingTile variable
    }
}

function touchMoved(event) {
    if (draggingTile) {
        draggingTile.setPosition(createVector(event.x, event.y));
    }
}

function touchEnded() {
    if (draggingTile) {
        draggingTile.stopDragging();
        draggingTile = null; // Reset the draggingTile variable after touch ends
    }
}