class AssetManager {
    static #instance;
    #images;
    constructor() {
        this.#images = new Map();
        this.#loadImages();
        window.assetManager = this;
    }

    #loadImages() {
        this.#images.set("FastCar", loadImage("assets/images/cars/FastCar.png"));
        this.#images.set("BeetleCar", loadImage("assets/images/cars/BeetleCar.png"));
        this.#images.set("ScrapCar", loadImage("assets/images/cars/ScrapCar.png"));
        this.#images.set("JerryCan", loadImage("assets/images/car_parts/JerryCan.png"));
        this.#images.set("SteeringWheel", loadImage("assets/images/car_parts/SteeringWheel.png"));
        this.#images.set("Wheel", loadImage("assets/images/car_parts/Wheel.png"));
        this.#images.set("StopSign", loadImage("assets/images/car_parts/StopSign.png"));
    }

    getImage(assetname) {
        try {
            return this.#images.get(assetname);
        } catch (exc) {
            throw new Error("file does not exist!");
        }
    }
}
