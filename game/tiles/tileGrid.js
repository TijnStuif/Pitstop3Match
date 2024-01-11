class TileGrid {

    gridPosX;
    gridPosY;
    #tileSize;
    #tiles;
    #width;
    #height;

    //constructor that determines the size of every tile in the grid.
    constructor(width, height, tileSize) {
        this.#tileSize = tileSize;
        this.#width = width
        this.#height = height
        this.#generateTileGrid();
    }

    //function that makes a tileMap, then loads an image for each respective tile
    #generateTileGrid() {

        const tileMap = [
            [0, 0, 1, 4, 2, 2],
            [0, 0, 1, 1, 4, 2],
            [0, 0, 3, 4, 1, 3],
            [0, 0, 4, 2, 3, 4],
            [0, 0, 3, 4, 4, 2],
            [0, 0, 2, 3, 1, 1]
        ]
        //tiles is a 2D array, meaning that it is an array of arrays. 
        //see https://www.freecodecamp.org/news/javascript-2d-arrays/ for more information about 2D arrays.
        this.#tiles = new Array();

        //generate tile grid here and place tiles in the 2D #tile array.
        for (let x = 0; x < this.#width; x++) {
            for (let y = 0; y < this.#height; y++) {
                if (!this.#tiles[x]) {
                    this.#tiles[x] = new Array();
                }

                const tileValue = tileMap[x][y];
                
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
                }
            }
        }
    }

    update(deltaTime) {

    }
    

    //draw all the tiles
    draw() {
            for (let x = 0; x < this.#width; x++) {
                for (let y = this.#height - 2; y >= 0; y--) {
                    if (this.#tiles[x][y] != null && !this.#tiles[x][y + 1]) {
                        // Move the tile down if there is an empty space below
                        this.swapTiles(x, y, x, y + 1);
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
                        console.log(score)
                    }
                }
                if (this.#tiles[x][y] && this.#tiles[y-1] && this.#tiles[x][y-1] && this.#tiles[y+1] && this.#tiles[x][y+1]) {
                    if (this.#tiles[x][y].tileType == this.#tiles[x][y+1].tileType && this.#tiles[x][y].tileType == this.#tiles[x][y-1].tileType) {
                        this.distributePoints(x, y);
                        this.#tiles[x][y] = null
                        this.#tiles[x][y+1] = null
                        this.#tiles[x][y-1] = null
                        console.log(score)
                    }
                }   
                
                if (this.#tiles[x][y] != null)
                this.#tiles[x][y].draw();
                
                if (!this.#tiles[x][1] && !this.#tiles[x][2]) {
                    let randomTileType;
                    randomTileType = Math.floor(random(1,4))
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
            score -= 50
        } else {
            score += 100
        }
    }
    getRandomTileType() {
        let randomTileType;
        randomTileType = 0;
        randomTileType = Math.floor(random(1,4))
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
        if (x < 0 || x >= this.#width || y < 0 || y >= this.#height)
        {
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