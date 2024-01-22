let tile;
let tileGrid;
let draggingTile = null; // Variable to store the dragging tile
let draggingTileX;
let draggingTileY;
let score = 0;
let savedScore = 0;
let screenIndex;
let startScreenTimer = 0;
let coinTotal = 0;
const tileWidth = 6, tileHeight = 6, tileSize = 80;

//preloads GameManager and the tileGrid
function preload() {
    new GameManager();
    tileGrid = new TileGrid(tileWidth, tileHeight, tileSize);
    dbConnection = new DatabaseConnection();
    dbConnection.createUser();
    mainMenuTheme = loadSound('assets/images/sound/Pitstop_main_menu.mp3');
}

//sets up the canvas, and all the buttons
function setup() {
    createCanvas(500, 500);
    switchScreen(0);
    openGarage = new Button(350, 150, "Open the garage", 1, false);
    nextLevel = new Button(300, 200, "Continue", 2, true, true);
    backToGarage = new Button(100, 200, "Back to garage", 5, true, false);
    level1 = new Button(375, 150, "Level 1", 2, true, 1);
    level2 = new Button(375, 170, "Level 2", 2, true, 2);
    level3 = new Button(375, 190, "Level 3", 2, true, 3);
    level4 = new Button(375, 210, "Level 4", 2, true, 4);
    level5 = new Button(375, 230, "Level 5", 2, true, 5);
    scrapCar = new Car(gameManager.getImage("ScrapCar"), 450, 50);
    checkEndSound(mainMenuTheme);
}

//draws the background and activates the draw function from tileGrid
function draw() {
    noStroke();
    console.log(draggingTile);
    if (tileGrid.gameCompleted) {
        clear();
        hideButtons();
        textSize(50);
        text("YOU WON!", 100, 200);
        image(gameManager.getImage("FastCar"), 150, 250, 100, 100);
        return;
    }
    if (screenIndex == 0) {
        image(gameManager.getImage("ClosedGarage"), 0, 0, 500, 500);
        openGarage.button.show();
    }
    if (screenIndex == 1) {
        image(gameManager.getImage("OpeningGarageGif"), 0, 0, 500, 500);
        startScreenTimer += 1;
        if (startScreenTimer > 130) {
            image(scrapCar.image, 100, 200, scrapCar.size * 2, scrapCar.size * 2);
            if (startScreenTimer > 280) {
                switchScreen(5);
            }
        }
    }

    if (screenIndex == 2) {
        hideButtons();
        image(gameManager.getImage("GameBackground"), 0, 0, 500, 500);
        image(scrapCar.image, scrapCar.x, scrapCar.y, scrapCar.size, scrapCar.size);
        scrapCar.calculatePosition();
        scrapCar.checkEndLevel();
        textSize(30);
        fill(0);
        text(`score obtained: ${score}`, 220, 75);
        if (score >= tileGrid.scoreRequirement) {
            tileGrid.levelCompleted = true;
            savedScore = score;
            coinTotal += Math.floor(score / 10);
            score = 0;
            switchScreen(3);
        } else if (tileGrid.turnCounter == 0) {
            savedScore = score;
            coinTotal += Math.floor(score / 10);
            score = 0;
            switchScreen(4);
        }
        textSize(30);
        text(`turns left: ${tileGrid.turnCounter}`, 10, 50)
        text(`score required: ${tileGrid.scoreRequirement}`, 220, 50)
        tileGrid.draw();
    }

    if (screenIndex == 3) {
        clear();
        textSize(50);
        fill(0);
        text("congratulations", 50, 50);
        text(`you beat level ${tileGrid.currentLevel}`, 50, 100);
        text(`continue to level ${tileGrid.currentLevel + 1}?`, 50, 150);
        nextLevel.button.show();
        backToGarage.button.show();
    }
    if (screenIndex == 4) {
        clear();
        textSize(50);
        fill(0);
        text("you lost!", 150, 50)
        text(`your score is: ${savedScore}`, 50, 100)
        backToGarage.button.show();
    }
    if (screenIndex == 5) {
        image(gameManager.getImage("OpenGarage"), 0, 0, 500, 500);
        image(scrapCar.image, 100, 200, scrapCar.size * 2, scrapCar.size * 2);
        fill(255);
        textSize(30);
        text(`total coins: ${coinTotal}`, 150, 200)
        if (tileGrid.currentLevel === 1) {
            level1.button.show();
        }
        if (tileGrid.currentLevel === 2) {
            level1.button.show();
            level2.button.show();
        }
        if (tileGrid.currentLevel === 3) {
            level1.button.show();
            level2.button.show();
            level3.button.show();
        }
        if (tileGrid.currentLevel === 4) {
            level1.button.show();
            level2.button.show();
            level3.button.show();
            level4.button.show();
        }
        if (tileGrid.currentLevel === 5 || tileGrid.currentLevel === 0) {
            level1.button.show();
            level2.button.show();
            level3.button.show();
            level4.button.show();
            level5.button.show();
        }
        nextLevel.button.hide();
    }
}

function hideButtons() {
    backToGarage.button.hide();
    level1.button.hide();
    level2.button.hide();
    level3.button.hide();
    level4.button.hide();
    level5.button.hide();
    nextLevel.button.hide();
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
        tileGrid.swap(tileGrid.getGridX(event.x), tileGrid.getGridY(event.y), draggingTileX, draggingTileY);
        draggingTile.stopDragging(event);
    }
}

function switchScreen (screenSwitcher) {
    screenIndex = screenSwitcher
}

function playSong (songName) {
    songName.play();
}

function checkEndSound (songName) {
    songName.onended(loopSound)
}

function loopSound(songName) {
    songName.loop();
  }
