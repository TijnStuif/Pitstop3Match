# Eerste expert review blok 2 Sprint 3.

## K5 Je hebt object georiënteerd geprogrammeerd en maak gebruik van objectgeoriënteerde technieken zoals abstraction, inheritance en encapsulation. 

Tijn:


Abstraction:

Abstraction is het verbergen van code die een gebruiker niet hoeft te snappen, in een makkelijk begrijpbaar iets, zoals een functie bijvoorbeeld. Wij hebben abstraction gebruikt om processen als het verwisselen van tiles en doorgaan naar het volgende level, enorm eenvoudig te maken om opnieuw te gebruiken. Neem bijvoorbeeld deze functie:

    ```javascript
    // Add a function to move to the next level
    goToNextLevel() {
        switchScreen(2);
        this.#generateTileGrid();

        if (this.currentLevel < TileGrid.levels.length && this.levelCompleted) {
            this.currentLevel++;
            this.startLevelValueCheck();
            this.#generateTileGrid();
        } else {
            // Handle game completion or loop back to the first level
            // For now, let's loop back to the first level
            this.currentLevel = 1;
            this.startLevelValueCheck();
            this.#generateTileGrid();
        }
        this.setLevelIndex(this.currentLevel)
    }
    ```

Deze functie zorgt ervoor dat alle logica om naar een volgend level te gaan, heel eenvoudig onder 1 functie staat. Dit maakt het gemakkelijk om de goToNextLevel functie te gebruiken, elke keer als de speler een level haalt. Het is makkelijk te gebruiken, en scheelt regels code als de functie vaker gebruikt wordt.

    ```javascript
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
                    tileGrid.turnCounter -= 1;
                }
    
                if (this.#tiles[x2][y2] != null) {
                    this.#tiles[x2][y2].setPosition(createVector(x2, y2));
                }
            }
        }
    }
    ```

Door deze functie te maken, is de core mechanic van tiles omwisselen, vrij makkelijk te hergebruiken. Een gebruiker hoeft alleen maar de x-coordinaat en y-coordinaat van 2 tiles te weten. Vervolgens kijkt de functie of de tiles naast elkaar liggen (zo niet, dan kunnen ze ook niet omgewisseld worden), en daarna wisselt de functie beide tiles van plek, als beide tiles niet de tileType (5) bevatten van de staticTile. Ook wordt een waarde van 1 vana de turnCounter in het level afgehaald als er een verwiseling plaatsvindt.


Inheritance:

Inheritance is het overerven van bepaalde variablen en functies uit een class naar een andere class. Wij hebben voornamelijk gebruik gemaakt van inheritance om onze tile class verder uit te breiden. Zo kunnen we voor tiles die zich anders gedragen dan een 'normale' tile. Een normale tile kan zich bewegen, omwisselen, naar beneden vallen met zwaartekracht en verdwijnen als er een match is. Alleen wij hebben nog twee andere soorten tiles die wij gebruiken in ons spel. Dit zijn de static tile en de special tile. Hieronder is te zien hoe de code van de special tile en de normal tile eruit zien.

    ```javascript
    class SpecialTile extends NormalTile {
        constructor(image, size, x, y, tileType) {
            super(image, size, x, y, tileType);
        }
    }
    ```

    ```javascript
    class NormalTile extends Tile {
        constructor(image, size, x, y, tileType) {
            super(image, size, x, y, tileType);
        }
        //functions that determine if a tile is moving or not
        isDragging() {
            return this.isDragging;
        }
    
        startDragging() {
            this.isDragging = true;
        }
    
        stopDragging() {
            this.isDragging = false;
        }
    }
    ```

Zoals hier te zien is, neemt de special tile eigenlijk alle eigenschappen over van de normal tile (de normal tile is bijna identiek aan tile, behalve dan dat de normalTile de functies krijgt om te checken of een tile wordt bewogen of niet). Zo kan bij een nieuwe instance van SpecialTile, de lijn: let ... = new SpecialTile. Wij maken gebruik van de tileType om verschillende tiles van elkaar te identificeren. Het 'speciale' van de special tile is dan ook dat het minpunten geeft als je een match compleet maakt met 3 special tiles. Naast de special tile hadden we ook de static tile. Hieronder is te zien hoe de code van de static tile eruit ziet.

    ```javascript
    class StaticTile extends Tile {
        constructor(image, size, x, y, tileValue) {
            super(image, size, x, y, tileValue);
        }
    }
    ```

Zoals hier te zien neemt de static tile alles over van de tile class in plaats van de normal tile class. Hierdoor krijgt de static tile alle functies met betrekking tot beweging niet mee. Ook geven wij een andere waarde voor tileValue mee, net zoals bij de special tile.

Door het overerven van variables en functies van andere classes, kunnen de opeenvolgende classes sneller geschreven worden, zonder bepaalde logica 2x te moeten schrijven. Dit helpt om bestanden korter te maken, en deze overzichterlijker te maken voor ons.

Encapsulation:

Encapsulation is het verbergen van functies en onnodige variablen voor de gebruiker in een class. De gebruiker hoeft alleen te weten hoe de class heet, en welke variablen nodig zijn voor de constructor. Dit zorgt dat iemand een object uit een class kan maken, zonder dat deze persoon iets van de class begrijpt. Ik heb 2 classes gemaakt die van dit concept gebruik maken.

    ```javascript
    class Button {
        x;
        y;
        text;
        button;

        constructor(x, y, text, screenIndex, startsHidden) {
            this.text = text;
            this.button = createButton(text);
            this.button.position(x,y);
            if (startsHidden) {
            this.button.hide();
            }
            this.button.mousePressed(() => {
                if (tileGrid.levelCompleted) {
                    tileGrid.goToNextLevel();
                }
                switchScreen(screenIndex);
                this.button.hide();
            });
        }
    }
    ```

Dit is een class die het maken van een button, enorm makkelijk maakt. Het stopt alle logica, zoals het maken van een button, het geven van een positie en een functie die gebruikt wordt als de knop gedrukt wordt, weg in de constructor waar de gebruiker voor de rest niks mee hoeft te kunnen. Om de button te maken hoeft de gebruiker alleen maar (als voorbeeld): let exitLevel = new Button(200, 200, "exit level", 5, true) neer te zetten (5 bij screenIndex omdat dat het scherm is van de garage). Hieronder volgt de 2e class:

    ```javascript
    class Car {
        x;
        y;
        speedMultiplier;

        constructor(image, x, y) {
            this.image = image;
            this.x = x;
            this.y = y;
            this.startX = x;
            this.startY = y;
            this.speedMultiplier = width / tileGrid.pointRequirement;
            this.size = 100;
        }

        checkEndLevel() {
            if (tileGrid.levelCompleted) {
                this.hide();
            }
        }

        checkBeginLevel() {
            if (!tileGrid.levelCompleted) {
                this.show();
            }
        }

        hide() {
            this.x = -1000;
            this.y = -1000;
        }

        show() {
            this.x = this.startX;
            this.y = this.startY;
        }

        calculatePosition() {
            this.x = 400 - (score * this.speedMultiplier);
        }  
    }
    ```

Deze class maakt meer gebruik van class-eigen functies. Dit maakt het gebruik van encapsulation nog nuttiger, omdat een gebruiker heel makkelijk de functies kan aanroepen ergens anders in de code. Deze zullen dan precies doen wat er in de naam van de functie staat (zoals de auto laten zien of weglaten). De auto instancen is ook heel erg simpel. De gebruiker hoeft alleen maar coordinaten en een plaatje door te voeren in de constructor.

Rick:
(Abstraction:

)
(Inheritance:

)
(Encapsulation

)

## K6 Je hebt een genormaliseerde relationele database ontworpen en gebruikt om informatie uit je project in op te slaan, op te halen en te bewerken. 
Tijn:

Rick:
## K7 Je hebt je werk beschreven met behulp van UML-technieken
Tijn:
Ik heb een class diagram gemaakt van de gehele game, waarin verbanden en overervingen worden weergegeven, en alle attributes en methods staan bij de classes. 

![Class diagram pitstop](blok2ClassDiagram.png)

Rick:

