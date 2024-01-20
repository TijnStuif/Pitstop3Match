class Tile {
    #x;
    #y;
    #size;
    #image;
    isDragging = false;

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

    //sets position of a tile based on the x and y values given in the constructor
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
        this.tileType = tileType;
    }  

    draw() {
        //static image that is displayed whenever a tile is not moving
        if (!this.isDragging) {
            image(this.#image, this.position.x, this.position.y, this.#size, this.#size);
        }
        //logic that gives tiles a grid-like movement, and displays it moving
        if (this.isDragging) {
            const snappedX = Math.floor(mouseX / this.#size) * this.#size;
            const snappedY = Math.floor(mouseY / this.#size) * this.#size;
            image(this.#image, snappedX, snappedY, this.#size, this.#size);
        }
    }
}