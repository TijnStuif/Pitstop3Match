class Tile {
    #x;
    #y;
    #size;
    #image;
    isDragging;

    get x() {
        return this.#x;
    }

    set x(value) {
        this.#x = value;
    }

    get y() {
        return this.#y;
    }

    set y(value) {
        this.#y = value;
    }

    get position() {
        return createVector(this.#x, this.#y).mult(this.#size);
    }

    setPosition(position) {
        this.#x = position.x;
        this.#y = position.y;
    }
    
    //constructor for a tile that gives it positioning, an image and a dragging boolean
    constructor(image, size, x, y, tileType) {
        this.#image = image;
        this.#size = size;
        this.#x = x;
        this.#y = y;
        this.isDragging = false;
        this.tileType = tileType;
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

    draggingTileMovement() {
        const snappedX = Math.floor(mouseX / this.#size) * this.#size;
        const snappedY = Math.floor(mouseY / this.#size) * this.#size;
    }

    draw() {
        //tileGrid.getTileAtPosition(this.position);
        //static image that is displayed whenever a tile is not moving
        if (!this.isDragging) {
            image(this.#image, this.position.x, this.position.y, this.#size, this.#size);
        }
        //logic that gives tiles a grid-like movement, and displays it moving
        if (this.isDragging) {
            // mouse coordinates, snapped to grid using math.floor
            const snappedX = Math.floor(mouseX / this.#size) * this.#size;
            const snappedY = Math.floor(mouseY / this.#size) * this.#size;
            
            image(this.#image, snappedX, snappedY, this.#size, this.#size);
        }
    }
}