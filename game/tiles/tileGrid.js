class TileGrid {

    gridPosX;
    gridPosY;
    #tileSize;
    #tiles;
    #width;
    #height;

    // Customizable levels and scores needed to finish
    static levels = [
        {
            grid: [
                [0, 0, 1, 3, 2, 2],
                [0, 0, 1, 1, 3, 2],
                [0, 0, 3, 3, 1, 3],
                [0, 0, 3, 1, 3, 2],
                [0, 0, 1, 2, 1, 2],
                [0, 0, 2, 3, 1, 1],
                [0, 0, 0, 0, 0, 0]
            ],
            scoreRequirement: 1500,
            turnCounter: 10
        },
        {
            grid: [
                [0, 0, 3, 1, 3, 3],
                [0, 0, 1, 4, 3, 2],
                [0, 0, 3, 2, 4, 3],
                [0, 0, 4, 2, 2, 4],
                [0, 0, 3, 4, 3, 4],
                [0, 0, 2, 3, 2, 1],
                [0, 0, 0, 0, 0, 0]
            ],
            scoreRequirement: 2000,
            turnCounter: 15
        },
        {
            grid: [
                [0, 0, 1, 4, 2, 2],
                [0, 0, 2, 1, 3, 2],
                [0, 0, 3, 4, 4, 3],
                [0, 0, 2, 1, 2, 4],
                [0, 0, 3, 3, 1, 2],
                [0, 0, 5, 3, 1, 1],
                [0, 0, 0, 0, 0, 0]
            ],
            scoreRequirement: 1750,
            turnCounter: 15
        },
        {
            grid: [
                [0, 0, 5, 1, 3, 5],
                [0, 0, 1, 4, 1, 3],
                [0, 0, 3, 3, 4, 3],
                [0, 0, 4, 3, 2, 4],
                [0, 0, 3, 4, 1, 3],
                [0, 0, 5, 4, 3, 5],
                [0, 0, 0, 0, 0, 0]
            ],
            scoreRequirement: 2500,
            turnCounter: 20
        },
        {
            grid: [
                [0, 0, 2, 1, 3, 5],
                [0, 0, 1, 4, 1, 5],
                [0, 0, 3, 3, 4, 5],
                [0, 0, 4, 3, 2, 5],
                [0, 0, 3, 4, 1, 5],
                [0, 0, 2, 4, 3, 5],
                [0, 0, 0, 0, 0, 0]
            ],
            scoreRequirement: 2500,
            turnCounter: 20
        },
        // Follow this method for more levels
    ];

    //constructor that determines the size of every tile in the grid.
    constructor(width, height, tileSize) {
        this.#tileSize = tileSize;
        this.#width = width;
        this.#height = height;
        this.currentLevel = 1; // Start from level 1
        this.levelCompleted = false;
        this.startLevelValueCheck();
        this.scoreRequirement;
        this.turnCounter;
        this.#generateTileGrid();
    }

    getLevelIndex() {
        return this.currentLevel;
    }

    setLevelIndex(newLevelIndex) {
        this.currentLevel = newLevelIndex;
    }

    //function that makes a tileMap, then loads an image for each respective tile
    #generateTileGrid() {
        const currentLevelGrid = TileGrid.levels[this.currentLevel - 1].grid;

        this.#tiles = new Array();

        //generate tile grid here and place tiles in the 2D #tile array.
        for (let x = 0; x < this.#width; x++) {
            for (let y = 0; y < this.#height; y++) {
                if (!this.#tiles[x]) {
                    this.#tiles[x] = new Array();
                }

                const tileValue = currentLevelGrid[x][y];

                switch (tileValue) {
                    case 1:
                        this.#tiles[x][y] = new NormalTile(gameManager.getImage("Wheel"), this.#tileSize, x, y, 1);
                        break;
                    case 2:
                        this.#tiles[x][y] = new NormalTile(gameManager.getImage("SteeringWheel"), this.#tileSize, x, y, 2);
                        break;
                    case 3:
                        this.#tiles[x][y] = new NormalTile(gameManager.getImage("JerryCan"), this.#tileSize, x, y, 3);
                        break;
                    case 4:
                        this.#tiles[x][y] = new SpecialTile(gameManager.getImage("StopSign"), this.#tileSize, x, y, 4);
                        break;
                    case 5:
                        this.#tiles[x][y] = new StaticTile(gameManager.getImage("YellowBlackSign"), this.#tileSize, x, y, 5);
                        break;
                }
            }
        }
    }

    resetLevel() {
        if (screenIndex !== 2) {
            return;
        }
        switchScreen(2);
        this.startLevelValueCheck;
        this.#generateTileGrid();
        scrapCar.checkBeginLevel();
    }

    // Add a function to move to the next level
    goToNextLevel() {
        switchScreen(2);
        this.#generateTileGrid();

        if (this.currentLevel < TileGrid.levels.length && this.levelCompleted) {
            this.currentLevel++;
            this.startLevelValueCheck();
            this.#generateTileGrid();
            scrapCar.checkBeginLevel();
            this.levelCompleted = false;
            scrapCar.speedMultiplier = width / this.scoreRequirement;

        } else {
            // Handle game completion or loop back to the first level
            // For now, let's loop back to the first level
            this.currentLevel = 1;
            this.startLevelValueCheck();
            this.#generateTileGrid();
            scrapCar.checkBeginLevel();
            scrapCar.speedMultiplier = 0.5;
            this.levelCompleted = false;
        }
        this.setLevelIndex(this.currentLevel)
    }

    checkIfNextLevelIsUnlocked() {
        if(screenIndex == 3 && this.levelCompleted) {
                nextLevel.button.show();
        }
    }

    startLevelValueCheck() {
        this.scoreRequirement = TileGrid.levels[this.currentLevel - 1].scoreRequirement;
        this.turnCounter = TileGrid.levels[this.currentLevel - 1].turnCounter;
    }

    //draw all the tiles
    draw() {
        this.checkIfNextLevelIsUnlocked();
        this.simulateGravity();
        this.refillAllTiles();
        for (let x = 0; x < this.#width; x++) {
            for (let y = 2; y < this.#height; y++) {
                if (!this.#tiles[x][y]) {
                    continue;
                } 
                
                if (this.#tiles[x][y] != null)
                this.#tiles[x][y].draw();
            }
        }
    }


    distributeScore(matchAmount, tileType) {
        if (tileType === 4) {
            score -= 25 * matchAmount;
        } else {
            score += 50 * matchAmount;
        }
    }

    getGridX(x) {
        return Math.floor(x / this.#tileSize);
    }

    getGridY(y) {
        return Math.floor(y / this.#tileSize);
    }

    //function that checks the position of a tile and returns it
    getTileAtPosition(position) {
        let gridXPosition = Math.floor(position.x / this.#tileSize);
        let gridYPosition = Math.floor(position.y / this.#tileSize);

        return this.getTileAtGridIndex(gridXPosition, gridYPosition);
    }

    //checks if a touchEvent is outside of the grid
    getTileAtGridIndex(x, y) {
        if (x < 0 || x >= this.#width || y < 0 || y >= this.#height) {
            throw new Error("index outside of bounds of grid!");
        }
        
        return this.#tiles[x][y];
    }

    //function that gives tiles a moving function
    getDraggingTile() {
        for (let x = 0; x < this.#width; x++) {
            for (let y = 0; y < this.#height; y++) {
                const tile = this.#tiles[x][y];
                if (tile.isDragging()) {
                    return tile;
                }
            }
        }
        return null;
    }

    checkForMatch(x, y) {
        if (!this.doesTileExist(x, y)) return false;

        const tileType = this.#tiles[x][y].tileType;
        if (tileType == 5) return false;
        let horizontalMatchLength = 1;
        let verticalMatchLength = 1;
        let horizontalMatchedTiles = [];
        let verticalMatchedTiles = [];
        //checks matches to the right
        if (this.doesTileMatch(x + 1, y, tileType)) {
            horizontalMatchLength++;
            horizontalMatchedTiles.push({x: x + 1, y: y});

            if (this.doesTileMatch(x + 2, y, tileType)) {
                horizontalMatchLength++;
                horizontalMatchedTiles.push({x: x + 2, y: y});
            }
        }
        //checks matches to the left
        if (this.doesTileMatch(x - 1, y, tileType)) {
            horizontalMatchLength++;
            horizontalMatchedTiles.push({x: x - 1, y: y});

            if (this.doesTileMatch(x - 2, y, tileType)) {
                horizontalMatchLength++;
                horizontalMatchedTiles.push({x: x - 2, y: y});
            }
        }
        //checks matches above
        if (this.doesTileMatch(x, y + 1, tileType)) {
            verticalMatchLength++;
            verticalMatchedTiles.push({x: x, y: y + 1});

            if (this.doesTileMatch(x, y + 2, tileType)) {
                verticalMatchLength++;
                verticalMatchedTiles.push({x: x, y: y + 2});
            }
        }
        //checks matches below
        if (this.doesTileMatch(x, y - 1, tileType)) {
            verticalMatchLength++;
            verticalMatchedTiles.push({x: x, y: y - 1});

            if (this.doesTileMatch(x, y - 2, tileType)) {
                verticalMatchLength++;
                verticalMatchedTiles.push({x: x, y: y - 2});
            }
        }

        let matchFound = false;
        if (horizontalMatchLength >= 3) {
            for (const tile of horizontalMatchedTiles) {
                this.clearTile(tile.x, tile.y);
            }
            matchFound = true;
            this.distributeScore(horizontalMatchLength, tileType)
        }
        if (verticalMatchLength >= 3) {
            for (const tile of verticalMatchedTiles) {
                this.clearTile(tile.x, tile.y);
            }
            matchFound = true;
            this.distributeScore(verticalMatchLength, tileType)
        }
        if (matchFound) {
            this.clearTile(x, y)
        }
        return matchFound;
    }

    clearTile(x, y) {
        this.#tiles[x][y] = null;
    }

    doesTileExist(x, y) {
        try {
        return this.#tiles[x][y];
        } catch {
            return false;
        }
    }

    doesTileMatch(x, y, tileType) {
        if (!this.doesTileExist(x, y)) return false;
        const otherTileType = this.#tiles[x][y].tileType;
        return otherTileType === tileType;
    }


    swap(x1, y1, x2, y2) {
        const isAdjacentX = (x1 === x2) && (Math.abs(y1 - y2) === 1);
        const isAdjacentY = (y1 === y2) && (Math.abs(x1 - x2) === 1);
        if (!this.#tiles[x1][y1] || !this.#tiles[x2][y2]) return;

        if (!isAdjacentX && !isAdjacentY) return;

        if (this.#tiles[x1][y1].tileType === 5 || this.#tiles[x2][y2].tileType === 5) return;

        //swap the tiles in grid using temporary position
        let temp = this.#tiles[x1][y1];
        this.#tiles[x1][y1] = this.#tiles[x2][y2];
        this.#tiles[x2][y2] = temp;
        temp = null;

        this.#tiles[x1][y1].setPosition(createVector(x1, y1));
        this.turnCounter -= 1;

        this.#tiles[x2][y2].setPosition(createVector(x2, y2));
        this.checkForMatch(x1, y1);
        this.checkForMatch(x2, y2);
    }

    tileGravity(x1, y1, x2, y2) {
        let temp = this.#tiles[x1][y1];
        this.#tiles[x1][y1] = this.#tiles[x2][y2];
        this.#tiles[x2][y2] = temp;
        temp = null;
        if (this.#tiles[x1][y1] != null) {
            this.#tiles[x1][y1].setPosition(createVector(x1, y1));
        }
    
        if (this.#tiles[x2][y2] != null) {
            this.#tiles[x2][y2].setPosition(createVector(x2, y2));
        }
        this.checkForMatch(x1, y1);
        this.checkForMatch(x2, y2);
    }

    simulateGravity() {
        for (let x = 0; x < this.#width; x++) {
            for (let y = this.#height - 1; y > 1; y--) {
                this.checkGravity(x, y);
            }
        }
    }

    checkGravity(x, y) {
        if (y >= 5) return;
        if (!this.doesTileExist(x, y)) return;
        if (this.#tiles[x][y].tileType === 5) return;
        while (!this.doesTileExist(x, y + 1) && y < 6) {
            this.#tiles[x][y].setPosition(createVector(x, y + 1))
            this.#tiles[x][y + 1] = this.#tiles[x][y];
            this.#tiles[x][y] = null;
            const foundMatch = this.checkForMatch(x, y + 1)
            if (foundMatch) break;
            y += 1;
        }
    }

    spawnTile(x) {
        const randomTileType = Math.floor(random(1,5));
        let tile = null;
        switch (randomTileType) {
            case 1:
                tile = new NormalTile(gameManager.getImage("Wheel"), this.#tileSize, x, 2, 1);
                break;
            case 2:
                tile = new NormalTile(gameManager.getImage("SteeringWheel"), this.#tileSize, x, 2, 2);
                break;
            case 3:
                tile = new NormalTile(gameManager.getImage("JerryCan"), this.#tileSize, x, 2, 3);
                break;
            case 4:
                tile = new SpecialTile(gameManager.getImage("StopSign"), this.#tileSize, x, 2, 4);
        }
        this.#tiles[x][2] = tile;
        if (!this.checkForMatch(x, 2)) {
            this.checkGravity(x, 2);
        }
        if (!this.doesTileExist(x, 2)) {
            this.spawnTile(x);
        }
    }

    refillAllTiles() {
        for(let x = 0; x < this.#width; x++) {
            if (!this.doesTileExist(x, 2)) {
                this.spawnTile(x)
            }
        }
    }
}
