class TileGrid {

    gridPosX;
    gridPosY;
    #tileSize;
    #tiles;
    #width;
    #height;

    constructor(width, height, tileSize) {
        this.#tileSize = tileSize;
        this.#width = width
        this.#height = height
        this.#generateTileGrid();
    }

    #generateTileGrid() {

        const tileMap = [
            [1, 4, 4, 2, 3, 3],
            [4, 1, 1, 3, 2, 1],
            [2, 2, 3, 4, 1, 3],
            [3, 1, 1, 2, 3, 4],
            [1, 3, 3, 4, 4, 2],
            [2, 4, 3, 3, 1, 1]
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
                        this.#tiles[x][y] = new NormalTile(gameManager.getImage("Wheel"), this.#tileSize, x, y);
                        break;
                    case 2:
                        this.#tiles[x][y] = new NormalTile(gameManager.getImage("SteeringWheel"), this.#tileSize, x, y);
                        break;
                    case 3:
                        this.#tiles[x][y] = new NormalTile(gameManager.getImage("JerryCan"), this.#tileSize, x, y);
                        break;
                    case 4:
                        this.#tiles[x][y] = new NormalTile(gameManager.getImage("StopSign"), this.#tileSize, x, y);
                        break;
                }
            }
        }
    }

    update(deltaTime) {
        //handle results from player input here...
    }

    draw() {
        for (let x = 0; x < this.#width; x++) {
            for (let y = 0; y < this.#height; y++) {
                this.#tiles[x][y].draw();
            }
        }
    }

    getTileAtPosition(position) {
        const gridXPosition = Math.floor(position.x / this.#tileSize);
        const gridYPosition = Math.floor(position.y / this.#tileSize);

        this.gridPosX = gridXPosition;
        this.gridPosY = gridYPosition;

        return this.getTileAtGridIndex(gridXPosition, gridYPosition);
    }

    getTileAtGridIndex(x, y) {
        if (x < 0 || x >= this.#width || y < 0 || y >= this.#height)
        {
            throw new Error("index outside of bounds of grid!");
        }
        
        return this.#tiles[x][y];
    }

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
}