class TileGrid {

    #tileSize;
    #tiles;
    #width;
    #height;

    constructor(width, height, tileSize) {
        this.#tileSize = tileSize;
        this.#width = width;
        this.#height = height;
        this.#generateTileGrid();
    }

    #generateTileGrid() {
        //tiles is a 2D array, meaning that it is an array of arrays. 
        //see https://www.freecodecamp.org/news/javascript-2d-arrays/ for more information about 2D arrays.
        this.#tiles = new Array();

        //generate tile grid here and place tiles in the 2D #tile array.
        for (let x = 0; x < this.#width; x++) {
            for (let y = 0; y < this.#height; y++) {
                if (!this.#tiles[x]) {
                    this.#tiles[x] = new Array();
                }

                let assetPicker = Math.floor(Math.random() * 4) + 1;  // Random number between 1 and 4 (inclusive)
                
                // Use a switch statement for better readability
                switch (assetPicker) {
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
                    default:
                        // Handle unexpected cases
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

        return this.getTileAtGridIndex(gridXPosition, gridYPosition);
    }

    getTileAtGridIndex(x, y) {
        if (x < 0 || x >= this.#width || y < 0 || y >= this.#height)
        {
            throw new Error("index outside of bounds of grid!");
        }
        
        return this.#tiles[x][y];
    }
}