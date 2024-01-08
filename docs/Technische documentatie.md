### Je code is technisch gedocumenteerd en relevant voor collega's
Voor de technische documentatie gaan we verder kijken naar het bestand waar de #generateTileGrid zich in bevindt; dit is de tileGrid.js.
```javascript
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
                if (!this.#tiles[x][y]) {
                    continue;
                }
                
                if (this.#tiles[x][y] && this.#tiles[x-1] && this.#tiles[x-1][y] && this.#tiles[x+1] && this.#tiles[x+1][y]) {
                    if (this.#tiles[x][y].tileType == this.#tiles[x+1][y].tileType && this.#tiles[x][y].tileType == this.#tiles[x-1][y].tileType) {
                        this.#tiles[x][y] = null
                        this.#tiles[x+1][y] = null
                        this.#tiles[x-1][y] = null
                    }
                }
                if (this.#tiles[x][y] && this.#tiles[y-1] && this.#tiles[x][y-1] && this.#tiles[y+1] && this.#tiles[x][y+1]) {
                    if (this.#tiles[x][y].tileType == this.#tiles[x][y+1].tileType && this.#tiles[x][y].tileType == this.#tiles[x][y-1].tileType) {
                        this.#tiles[x][y] = null
                        this.#tiles[x][y+1] = null
                        this.#tiles[x][y-1] = null
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

    swapTileIndex() {
        if (this.#tiles[x][y].gridPosX == this.#tiles[x+1][y].gridposX) {
            let temp = this.#tiles[x][y]
            this.#tiles[x][y] = this.#tiles[x+1][y]
            this.#tiles[x+1][y] = temp
        }
    }
}
```

Aan het begin worden alle class variablen gedefinieerd; dit zijn de x-positie en de y-positie van een tile in de grid (gridPosX en gridPosY), de grootte van de tile (#tileSize), een 2D array waar alle tiles zich in bevinden (#tiles), en nog de breedte en de hoogte van de tiles (#width en #height). Hierna wordt een constructor aangeroepen die elke tile een breedte, een hoogte en een grootte geeft, en ook nog de functie #generateTileGrid. In deze functie wordt eerst de tileMap gedefinieerd. Dit is een 2D array waar alle posities in de #tiles array een waarde krijgen die 1, 2, 3 of 4 is. Hierna wordt voor elke x en y in de tileMap, gecheckt of deze een waarde heeft van 1 t/m 4. Elke waarde krijgt een ander plaatje (wiel, stuur, benzinetank en verkeersbord). Hierna wordt de draw functie opgroepen. Hierin wordt voor elke tile in de #tiles array, gecheckt of hij bestaat of niet. Dit wordt gedaan omdat als een match wordt gevonden, worden de tiles die gematcht hebben een null waarde, en bestaan ze dus niet meer. De matches worden gecheckt door de waarde in de tileMap te checken links en rechts, of onder en boven van de tile waar de draw functie op dat moment langsgaat. In de getTileAtPosition wordt de locatie van elke tile op de grid gecheckt en geplaatst in een gridXPosition en gridYPosition variable. In de volgende functie wordt door de x en y-waarde van een mousePressed/touchEvent gecontroleerd of deze x en y buiten de tileGrid liggen. Als dit zo is, dan wordt er een error in de console geplaatst dat er buiten de grid een actie wordt uitgevoerd. De functie getDraggingTile() kijkt voor elke tile in de tileGrid of deze momenteel bewogen wordt. Als de functie aangeeft dat een tile bewogen wordt, dan wordt dit vervolgens doorgegeven aan de tile class om deze de correcte movement te geven. De laatste functie (swapTileIndex()) wordt momenteel nog niet gebruikt, maar de functionaliteit zal ervoor zorgen dat als een tile verplaatst wordt, dat de tile zijn plaats vervangt met de tile waar de andere tile naartoe bewogen wordt (en dus posities verwisseld). De gehele class zorgt ervoor dat alle tiles op de goede plek beginnen en met de correcte afbeelding laten zien worden. 