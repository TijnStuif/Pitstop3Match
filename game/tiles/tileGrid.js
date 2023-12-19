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
            [4, 4, 4, 2, 3, 3],
            [4, 1, 1, 3, 2, 1],
            [2, 2, 3, 4, 1, 3],
            [3, 1, 3, 2, 3, 4],
            [1, 3, 3, 4, 4, 2],
            [2, 4, 2, 3, 1, 1]
        ]
        //tiles is a 2D array, meaning that it is an array of arrays. 
        //see https://www.freecodecamp.org/news/javascript-2d-arrays/ for more information about 2D arrays.
        this.#tiles = new Array();

        //generate tile grid here and place tiles in the 2D #tile array.
        for (let x = 0; x < this.#width; x++) {
            for (let y = 2; y < this.#height; y++) {
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
                        this.#tiles[x][y] = new NormalTile(gameManager.getImage("StopSign"), this.#tileSize, x, y, 4);
                        break;
                }
            }
        }
    }

    update(deltaTime) {
        //handle results from player input here...
    }

    //draw all the tiles
    draw() {
        for (let x = 0; x < this.#width; x++) {
            for (let y = 0; y < this.#height; y++) {
                if (this.#tiles[x][y] && this.#tiles[x-1] && this.#tiles[x+1]) {
                    if (this.#tiles[x][y].tileType == this.#tiles[x+1][y].tileType && this.#tiles[x][y].tileType == this.#tiles[x-1][y].tileType) {
                        console.log("match detected on horizontal line")
                    }
                }
                if (this.#tiles[x][y] && this.#tiles[y-1] && this.#tiles[y+1]) {
                    if (this.#tiles[x][y].tileType == this.#tiles[x][y+1].tileType && this.#tiles[x][y].tileType == this.#tiles[x][y-1].tileType) {
                        console.log("match detected on vertical line")
                    }
                }
                if (this.#tiles[x][y] != null)
                this.#tiles[x][y].draw();
            }
        }
    }

    //function that checks the position of a tile and returns it
    getTileAtPosition(position) {
        const gridXPosition = Math.floor(position.x / this.#tileSize);
        const gridYPosition = Math.floor(position.y / this.#tileSize);

        this.gridPosX = gridXPosition;
        this.gridPosY = gridYPosition;

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
}