class Tile {
    #x;
    #y;
    #size;
    #image;
    #visible;
    #isDragging;
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
        this.#x = position.x - this.#offsetX;
        this.#y = position.y - this.#offsetY;
    }

    get visible() {
        return this.#visible;
    }

    set visible(value) {
        this.#visible = value;
    }

    
    constructor(image, size, x, y) {
        this.#image = image;
        this.#size = size;
        this.#x = x;
        this.#y = y;
        this.#visible = true;
        this.#isDragging = false;
        this.#offsetX = 0;
        this.#offsetY = 0;
    }  
    
    isDragging() {
        return this.#isDragging;
    }

    startDragging(offsetX, offsetY) {
        this.#isDragging = true;
        this.#offsetX = offsetX;
        this.#offsetY = offsetY;
    }

    stopDragging() {
        this.#isDragging = false;
    }

    draw() {
        if (this.#visible) {
            if (this.#isDragging) {
                this.#x = mouseX - this.#offsetX;
                this.#y = mouseY - this.#offsetY;
            }
            image(this.#image, this.position.x, this.position.y, this.#size, this.#size);
        }
    }
}