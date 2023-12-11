class Tile {
    #x;
    #y;
    #size;
    #image;
    #isDragging;
    #startPosX;
    #startPosY;

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
        this.#x = (position.x);
        this.#y = (position.y);
    }
    
    constructor(image, size, x, y) {
        this.#image = image;
        this.#size = size;
        this.#x = x;
        this.#y = y;
        this.#isDragging = false;
        this.#startPosX = this.position.x;
        this.#startPosY = this.position.y;

    }  
    
    isDragging() {
        return this.#isDragging;
    }

    startDragging() {
        this.#isDragging = true;
        this.#startPosX = this.position.x;
        this.#startPosY = this.position.y;
    }

    stopDragging() {
        this.#isDragging = false;
        this.position.x = this.#startPosX - this.#x;
        this.position.y = this.#startPosY - this.#y;
    }

    draw() {
        if (!this.#isDragging) {
            image(this.#image, this.#startPosX, this.#startPosY, this.#size, this.#size);
        }
            if (this.#isDragging) {
                const targetX = (mouseX - 1/2 * this.#size) * 1/80;
                const targetY = (mouseY - 1/2 * this.#size) * 1/80;
                this.setPosition(createVector(targetX, targetY));
                this.#x += (targetX - this.#x);
                this.#y += (targetY - this.#y);
                image(this.#image, this.position.x, this.position.y, this.#size, this.#size);
        }
    }
}