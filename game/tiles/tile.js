class Tile {
    #x;
    #y;
    #size;
    #image;
    #visible;

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

    get visible() {
        return this.#visible;
    }

    set visible(value) {
        this.#visible = value;
    }

    draw() {
        if (this.#visible) {
            image(this.#image, this.position.x, this.position.y, this.#size, this.#size);
        }
    }

    constructor(image, size, x, y) {
        this.#image = image;
        this.#size = size;
        this.#x = x;
        this.#y = y;
        this.#visible = true;
    }    
}