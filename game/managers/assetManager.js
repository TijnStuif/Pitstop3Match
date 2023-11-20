class AssetManager {
    static #instance;
    #images;
    constructor() {
        this.#images = new Map();
        this.#loadImages();
        window.assetManager = this;
    }

    #loadImages() {
        this.#images.set("diamond", loadImage("assets/images/diamond.svg"));
    }

    getImage(assetname) {
        try {
            return this.#images.get(assetname);
        } catch (exc) {
            throw new Error("file does not exist!");
        }
    }
}
