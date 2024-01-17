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