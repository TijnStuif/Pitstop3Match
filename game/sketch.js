let tile;
let tileGrid;
let draggingTile = null; // Variable to store the dragging tile
let draggingTileX;
let draggingTileY;
let score = 0;
let savedScore = 0;
let screenIndex;
let startScreenTimer = 0;
let openGarageButton;
const tileWidth = 6, tileHeight = 6, tileSize = 80;

//preloads GameManager and the tileGrid
function preload() {
    new GameManager();
    tileGrid = new TileGrid(tileWidth, tileHeight, tileSize);
    dbConnection = new DatabaseConnection();
    dbConnection.createUser();
}

//sets up the canvas
function setup() {
    createCanvas(500, 500);
    switchScreen(0);
    openGarageButton = createButton("Open the Garage!");
    openGarageButton.position(350, 200);
    openGarageButton.mousePressed(() => {
        switchScreen(1);
        openGarageButton.hide();
    });
    openGarageButton.hide();
    goToLevel1Button = createButton("Level 1");
    goToLevel1Button.position(375, 150);
    goToLevel1Button.mousePressed(() => {
        switchScreen(2);
        goToLevel1Button.hide();
    })
    goToLevel1Button.hide();
    goToGarageButton = createButton("Go back to the garage");
    goToGarageButton.position(200, 300);
    goToGarageButton.mousePressed(() => {
        tileGrid.goToNextLevel();
        switchScreen(5);
        goToGarageButton.hide();
        tileGrid.nextLevelButton.hide();
    })
    goToGarageButton.hide();
}

//draws the background and activates the draw function from tileGrid
function draw() {
    if (screenIndex == 0) {
        image(gameManager.getImage("ClosedGarage"), 0, 0, 500, 500);
        openGarageButton.show();
    }

    if (screenIndex == 1) {
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
        if (score >= tileGrid.pointRequirement) {
            tileGrid.levelCompleted = true;
            switchScreen(3);
            savedScore = score;
            score = 0;
        } else if (tileGrid.turnCounter == 0) {
            switchScreen(4);
            savedScore = score;
            score = 0;  
        }
        textSize(30);
        text(`turns left: ${tileGrid.turnCounter}`, 10, 50)
        text(`score required: ${tileGrid.pointRequirement}`, 220, 50)
        tileGrid.draw();
    }

    if (screenIndex == 3) {
        clear();
        textSize(50);
        fill(0);
        text("congratulations", 50, 50);
        text(`you beat level ${tileGrid.currentLevel}`, 50, 100);
        text(`continue to level ${tileGrid.currentLevel + 1}?`, 50, 150);
        text(`return to the garage?`, 25, 250);
        goToGarageButton.show();

    }
    if (screenIndex == 4) {
        clear();
        textSize(50);
        fill(0);
        text("you lost!", 150, 50)
        text(`your score is: ${savedScore}`, 50, 100)
        text(`return to the garage?`, 25, 250);
        goToGarageButton.show();
    }
    if (screenIndex == 5) {
        image(gameManager.getImage("OpenGarage"), 0, 0, 500, 500);
        goToLevel1Button.show();
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