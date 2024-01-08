class Tile {
    #x;
    #y;
    #size;
    #image;
    isDragging;
    #offsetX;
    #offsetY;

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
        console.log(position.x, position.y)
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
        this.#offsetX = 0;
        this.#offsetY = 0;
        this.tileType = tileType;
    }  
    
    //functions that determine if a tile is moving or not
    isDragging() {
        return this.isDragging;
    }

    startDragging() {
        this.isDragging = true;
    }

    stopDragging(value) {
        this.isDragging = false;
        this.#x = value.x
        this.#y = value.y
    }

    draw() {
        //tileGrid.getTileAtPosition(this.position);
        //static image that is displayed whenever a tile is not moving
        if (!this.isDragging) {
            image(this.#image, this.position.x - this.#offsetX, this.position.y - this.#offsetY, this.#size, this.#size);
        }
            //logic that gives tiles a grid-like movement, and displays it moving
            if (this.isDragging) {
                this.#offsetX = Math.round(mouseX % 80) - 40;
                this.#offsetY = Math.round(mouseY % 80) - 40;
                const targetX = (mouseX - 1/2 * this.#size) * 1/80;
                const targetY = (mouseY - 1/2 * this.#size) * 1/80;
                this.setPosition(createVector(targetX, targetY));
                image(this.#image, this.position.x - this.#offsetX, this.position.y - this.#offsetY, this.#size, this.#size);
        }
    }
}