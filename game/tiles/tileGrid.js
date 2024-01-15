class TileGrid {

    gridPosX;
    gridPosY;
    #tileSize;
    #tiles;
    #width;
    #height;

    // Customizable levels and points needed to finish
    static levels = [
        {
            grid: [
                [0, 0, 1, 4, 2, 2],
                [0, 0, 1, 1, 3, 2],
                [0, 0, 3, 4, 1, 3],
                [0, 0, 4, 1, 3, 4],
                [0, 0, 1, 4, 1, 2],
                [0, 0, 2, 3, 1, 1],
                [0, 0, 0, 0, 0, 0]
            ],
            pointsNeeded: 1000,
            turnCounter: 10
        },
        {
            grid: [
                [0, 0, 1, 1, 2, 2],
                [0, 0, 1, 4, 3, 2],
                [0, 0, 3, 2, 4, 3],
                [0, 0, 4, 2, 2, 4],
                [0, 0, 3, 4, 3, 2],
                [0, 0, 2, 3, 2, 1],
                [0, 0, 0, 0, 0, 0]
            ],
            pointsNeeded: 1200,
            turnCounter: 10
        },
        // Follow this method for more levels
    ];

    currentLevel = 0    ; // Tracks the current level
    //pointsNeeded = this.levels[this.currentLevel].pointsNeeded;

    //constructor that determines the size of every tile in the grid.
    constructor(width, height, tileSize) {
        this.#tileSize = tileSize;
        this.#width = width;
        this.#height = height;
        this.currentLevel = 0; // Start from level 1
        this.pointsNeeded = TileGrid.levels[this.currentLevel].pointsNeeded;
        this.#generateTileGrid();
        this.nextLevelButton = createButton('Continue');
        this.nextLevelButton.position(200, 200);

        this.nextLevelButton.hide();

        this.nextLevelButton.mousePressed(() => {
            console.log('hi'); 
            if(this.getLevelIndex() == 1) {
                this.goToNextLevel();
            }
        })
        //this.nextLevelButton.hide();


        this.levelIndex = 0;
    }

    getLevelIndex() {
        return this.levelIndex;
    }

    setLevelIndex(newLevelIndex) {
        this.levelIndex = newLevelIndex;
    }

    //function that makes a tileMap, then loads an image for each respective tile
    #generateTileGrid() {
        const currentLevelGrid = TileGrid.levels[this.currentLevel].grid;

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

    // Add a function to move to the next level
    goToNextLevel() {
        console.log('hi it works :D');
        screenIndex = 2;
        this.#generateTileGrid();

        if (this.currentLevel < TileGrid.levels.length - 1) {
            this.currentLevel++;
            this.pointsNeeded = TileGrid.levels[this.currentLevel].pointsNeeded;
            this.#generateTileGrid();
        } else {
            // Handle game completion or loop back to the first level
            // For now, let's loop back to the first level
            this.currentLevel = 0;
            this.pointsNeeded = TileGrid.levels[this.currentLevel].pointsNeeded;
            this.#generateTileGrid();
        }
    }

    update(deltaTime) {
        // Add any update logic if needed
    }

    checkIfNextLevelIsUnlocked() {
        console.log(this.getLevelIndex());
        if(screenIndex == 3) {
                this.nextLevelButton.show();
        }
    }

    //draw all the tiles
    draw() {
        this.checkIfNextLevelIsUnlocked();

        for (let x = 0; x < this.#width; x++) {
            for (let y = this.#height - 2; y >= 0; y--) {
                if (this.#tiles[x][y] != null && !this.#tiles[x][y + 1] && this.#tiles[x][y].tileType !== 5) {
                    // Move the tile down if there is an empty space below
                    this.tileGravity(x, y, x, y + 1);
                }
            }
        }
        for (let x = 0; x < this.#width; x++) {
            for (let y = 2; y < this.#height; y++) {
                if (!this.#tiles[x][y]) {
                    continue;
                }
                if (this.#tiles[x][y] && this.#tiles[x-1] && this.#tiles[x-1][y] && this.#tiles[x+1] && this.#tiles[x+1][y]) {
                    if (this.#tiles[x][y].tileType == this.#tiles[x+1][y].tileType && this.#tiles[x][y].tileType == this.#tiles[x-1][y].tileType) {
                        this.distributePoints(x, y);
                        this.#tiles[x][y] = null
                        this.#tiles[x+1][y] = null
                        this.#tiles[x-1][y] = null
                    }
                }
                if (this.#tiles[x][y] && this.#tiles[y-1] && this.#tiles[x][y-1] && this.#tiles[y+1] && this.#tiles[x][y+1]) {
                    if (this.#tiles[x][y].tileType == this.#tiles[x][y+1].tileType && this.#tiles[x][y].tileType == this.#tiles[x][y-1].tileType) {
                        this.distributePoints(x, y);
                        this.#tiles[x][y] = null
                        this.#tiles[x][y+1] = null
                        this.#tiles[x][y-1] = null
                    }
                }   
                
                if (this.#tiles[x][y] != null)
                this.#tiles[x][y].draw();

                if (!this.#tiles[x][1] && !this.#tiles[x][2]) {
                    let randomTileType;
                    randomTileType = Math.floor(random(1,5))
                    switch (randomTileType) {
                        case 1:
                            this.#tiles[x][2] = new NormalTile(gameManager.getImage("Wheel"), this.#tileSize, x, 2, 1);
                            break;
                        case 2:
                            this.#tiles[x][2] = new NormalTile(gameManager.getImage("SteeringWheel"), this.#tileSize, x, 2, 2);
                            break;
                        case 3:
                            this.#tiles[x][2] = new NormalTile(gameManager.getImage("JerryCan"), this.#tileSize, x, 2, 3);
                            break;
                        case 4:
                            this.#tiles[x][2] = new SpecialTile(gameManager.getImage("StopSign"), this.#tileSize, x, 2, 4);
                    }
                    randomTileType = 0;
                }
            }
        }
    }

    distributePoints(x, y) {
        if (this.#tiles[x][y].tileType == 4) {
            score -= 50;
        } else {
            score += 100;
        }
    }

    getRandomTileType() {
        let randomTileType;
        randomTileType = 0;
        randomTileType = Math.floor(random(1,4));
        return randomTileType;
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

    swapTiles(x1, y1, x2, y2) {
        const isAdjacentX = (x1 === x2) && (Math.abs(y1 - y2) === 1);
        const isAdjacentY = (y1 === y2) && (Math.abs(x1 - x2) === 1);
        if (this.#tiles[x1][y1] && this.#tiles[x2][y2]) {
            if (isAdjacentX && this.#tiles[x1][y1].tileType !== 5 && this.#tiles[x2][y2].tileType !== 5 || 
                isAdjacentY && this.#tiles[x1][y1].tileType !== 5 && this.#tiles[x2][y2].tileType !== 5) {
                let temp = this.#tiles[x1][y1];
                this.#tiles[x1][y1] = this.#tiles[x2][y2];
                this.#tiles[x2][y2] = temp;
                temp = null;
                if (this.#tiles[x1][y1] != null) {
                    this.#tiles[x1][y1].setPosition(createVector(x1, y1));
                    turnCounter -= 1;
                }
    
                if (this.#tiles[x2][y2] != null) {
                    this.#tiles[x2][y2].setPosition(createVector(x2, y2));
                }
            }
        }
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
    }
}
