let tileGrid;
let draggingTile = null; // Variable to store the dragging tile
let draggingTileX;
let draggingTileY;
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
    image(gameManager.getImage("GameBackground"), 0, 0, 500, 500);
    noStroke();
    tileGrid.draw();
}

//does all the logic for a touch start
function touchStarted(event) {
    draggingTileX = tileGrid.getGridX(event.x);
    draggingTileY = tileGrid.getGridY(event.y);
    const tile = tileGrid.getTileAtPosition(createVector(event.x, event.y));
    if (tile) {
        tile.startDragging();
        draggingTile = tile; // Set the draggingTile variable
    }
}

//does all the logic for a moving
function touchMoved(event) {
}

//does all the logic for a touch ending
function touchEnded(event) {
    if (draggingTile) {
        tileGrid.swapTiles(tileGrid.getGridX(event.x), tileGrid.getGridY(event.y), draggingTileX, draggingTileY);
        draggingTile.stopDragging(event);
    }
}