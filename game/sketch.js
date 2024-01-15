let tile;
let tileGrid;
let draggingTile = null; // Variable to store the dragging tile
let draggingTileX;
let draggingTileY;
let score = 0;
let savedScore = 0;
let screenIndex;
let startScreenTimer = 0;
let turnCounter = 10;
let openGarageButton;
const tileWidth = 6, tileHeight = 6, tileSize = 80;

//preloads GameManager and the tileGrid
function preload() {
    new GameManager();
    tileGrid = new TileGrid(tileWidth, tileHeight, tileSize);
    dbConnection = new DatabaseConnection();
}

//sets up the canvas
function setup() {
    createCanvas(500, 500);
    switchScreen(0);
    dbConnection.createUser();
    openGarageButton = createButton("Open the Garage!");
    openGarageButton.position(350, 200);
    openGarageButton.mousePressed(() => {
        switchScreen(1);
    });
    openGarageButton.hide();
    goToLevelButton = createButton(`Go to level ${tileGrid.getLevelIndex()}`);
    goToLevelButton.position(350, 200);
    goToLevelButton.mousePressed(() => {
        switchScreen(2);
        goToLevelButton.hide();
    })
    goToLevelButton.hide();
}

//draws the background and activates the draw function from tileGrid
function draw() {
    if (screenIndex == 0) {
        image(gameManager.getImage("ClosedGarage"), 0, 0, 500, 500);
        openGarageButton.show();
    }

    if (screenIndex == 1) {
        openGarageButton.hide();
        image(gameManager.getImage("OpeningGarageGif"), 0, 0, 500, 500);
        startScreenTimer += 1;
        if (startScreenTimer > 280) {
            switchScreen(5);
        }
    }

    if (screenIndex == 2) {
        image(gameManager.getImage("GameBackground"), 0, 0, 500, 500);
        textSize(100);
        fill(255);
        text(score, 200, 150);
        if (score >= 100) {
            switchScreen(3);
            savedScore = score;
            score = 0;
        } else if (turnCounter == 0) {
            switchScreen(4);
            savedScore = score;
            score = 0;  
        }
        textSize(30);
        text(`turns left: ${turnCounter}`, 25, 50)
        tileGrid.draw();
    }

    if (screenIndex == 3) {
        clear();
        let currentLevel = tileGrid.getLevelIndex();
        fill(120);
        text(currentLevel, 300, 200)
        textSize(50);
        fill(0);
        text("you won!", 150, 50)
        text(`your score is: ${savedScore}`, 50, 100)
        text("continue", 250, 300)
        text("exit", 100, 300)
    }
    if (screenIndex == 4) {
        clear();
        textSize(50);
        fill(0);
        text("you lost!", 150, 50)
        text(`your score is: ${savedScore}`, 50, 100)
        text("continue", 250, 300)
        text("exit", 100, 300)
    }
    if (screenIndex == 5) {
        image(gameManager.getImage("OpenGarage"), 0, 0, 500, 500);
        goToLevelButton.show();
    }
    noStroke();
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

function switchScreen (screenSwitcher) {
    screenIndex = screenSwitcher
}