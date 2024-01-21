class GameManager {
    #analyticsTrackerManager;
    #assetManager;
    
    constructor() {
        this.#analyticsTrackerManager = new AnalyticsTrackerManager();
        this.#assetManager = new AssetManager();
        window.gameManager = this;
    }

    getImage(assetname) {
        return this.#assetManager.getImage(assetname);
    }

    getSound(assetname) {
        return this.#assetManager.getSound(assetname);
    }
}