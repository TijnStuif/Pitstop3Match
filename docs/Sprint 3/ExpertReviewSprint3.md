# Eerste expert review blok 2 Sprint 3.

## K5 Je hebt object georiënteerd geprogrammeerd en maak gebruik van objectgeoriënteerde technieken zoals abstraction, inheritance en encapsulation. 
Tijn:
(Abstraction:

)
(Inheritance:
    Wij hebben voornamelijk gebruik gemaakt van inheritance om onze tile class verder uit te breiden. Zo kunnen we voor tiles die zich anders gedragen dan een 'normale' tile. Een normale tile kan zich bewegen, omwisselen, naar beneden vallen met zwaartekracht en verdwijnen als er een match is. Alleen wij hebben nog twee andere soorten tiles die wij gebruiken in ons spel. Dit zijn de static tile en de special tile. Hieronder is te zien hoe de code van de special tile en de normal tile eruit zien.

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
)
(Encapsulation

)

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

Rick:

