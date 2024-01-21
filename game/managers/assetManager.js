class AssetManager {
    static #instance;
    #images;
    #sound;
    constructor() {
        this.#images = new Map();
        this.#sound = new Map();
        this.#loadImages();
        this.#loadSound();
        window.assetManager = this;
    }

    #loadImages() {
        this.#images.set("FastCar", loadImage("assets/images/cars/FastCar.png"));
        this.#images.set("RaceCar", loadImage("assets/images/cars/RaceCar.png"));
        this.#images.set("BeetleCar", loadImage("assets/images/cars/BeetleCar.png"));
        this.#images.set("ScrapCar", loadImage("assets/images/cars/ScrapCar.png"));
        this.#images.set("JerryCan", loadImage("assets/images/car_parts/JerryCan.png"));
        this.#images.set("SteeringWheel", loadImage("assets/images/car_parts/SteeringWheel.png"));
        this.#images.set("Wheel", loadImage("assets/images/car_parts/Wheel.png"));
        this.#images.set("StopSign", loadImage("assets/images/car_parts/StopSign.png"));
        this.#images.set("GameBackground", loadImage("assets/images/background/GamescreenBackground.png"));
        this.#images.set("OpeningGarageGif", loadImage("assets/images/background/OpeningGarage.gif"));
        this.#images.set("OpenGarage", loadImage("assets/images/background/OpenGarage.png"));
        this.#images.set("ClosedGarage", loadImage("assets/images/background/ClosedGarage.png"));
        this.#images.set("YellowBlackSign", loadImage("assets/images/car_parts/YellowBlackSign.png"));
    }

    #loadSound() {
        this.#sound.set("MainMenuTheme", loadSound("assets/images/sound/Pitstop_main_menu.mp3"))
    }

    getImage(assetname) {
        try {
            return this.#images.get(assetname);
        } catch (exc) {
            throw new Error("file does not exist!");
        }
    }

    getSound(assetname) {
        try {
            return this.#sound.get(assetname);
        } catch (exc) {
            throw new Error("sound file does not exist.")
        }
    }
}
