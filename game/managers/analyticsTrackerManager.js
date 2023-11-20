class AnalyticsTrackerManager {
    
    constructor() {
        //get a unique id and store it in the localstorage.
        //retrieve from localStorage if available, otherwise create a new one.
        this.#initialize();
    }

    async #initialize() {
        const playerGUID = localStorage.getItem("playerGUID");
        if (playerGUID === null) { 
            // create a p5 httppost connection
            
            const postData = {createPlayer: true};
            
        } else {
        }
    }

    #retrievePlayerData() {

    }

    #storePlayerData() {

    }

    customEvent(name, dataObject) {
        //track a custom event. Make sure to include the playerGUID.
        
    }
}