let tileGrid;
const tileWidth = 6, tileHeight = 6, tileSize = 80;

function preload() {
    // Assuming GameManager constructor initializes something
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

function mousePressed() {
    const tile = tileGrid.getTileAtPosition(createVector(mouseX, mouseY));
    
    if (tile) {
        const offsetX = mouseX - tile.x;
        const offsetY = mouseY - tile.y;
        tile.startDragging(offsetX, offsetY);
    }
}

function mouseMoved() {
    const draggingTile = tileGrid.getDraggingTile();
    if (draggingTile) {
        draggingTile.setPosition(createVector(mouseX, mouseY));
    }
}

function mouseReleased() {
    const draggingTile = tileGrid.getDraggingTile();
    if (draggingTile) {
        draggingTile.stopDragging();
    }
}

function touchStarted(event) {
    const tile = tileGrid.getTileAtPosition(createVector(event.x, event.y));
    if (tile) {
        const offsetX = event.x - tile.position.x;
        const offsetY = event.y - tile.position.y;
        tile.startDragging(offsetX, offsetY);
    }
}

function touchMoved(event) {
    const draggingTile = tileGrid.getDraggingTile();
    if (draggingTile) {
        draggingTile.setPosition(createVector(event.x, event.y));
    }
}

function touchEnded(event) {
    const draggingTile = tileGrid.getDraggingTile();
    if (draggingTile) {
        draggingTile.stopDragging();
    }
}