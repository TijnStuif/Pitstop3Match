let tileGrid;
const tileWidth = 6, tileHeight = 6, tileSize = 80;

function preload() {
    new GameManager();
    tileGrid = new TileGrid(tileWidth, tileHeight, tileSize);
}

function setup() {
    createCanvas(800, 600);

}

function draw() {
    background(0);
    noStroke();
    tileGrid.draw();
}

function touchStarted(event) {
    const tile = tileGrid.getTileAtPosition(createVector(event.x, event.y));
    tile.visible = false;
}

function touchMoved(event) {

}

function touchEnded(event) {

}