class Car {
    x;
    y;
    speedMultiplier;

    constructor(image, x, y) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.startLevelX = x;
        this.startLevelY = y;
        this.speedMultiplier = width / tileGrid.scoreRequirement
        this.size = 100;
    }

    //hides car when level ends
    checkEndLevel() {
        if (tileGrid.levelCompleted) {
            this.hide();
        }
    }

    //shows car when level begins
    checkBeginLevel() {
        if (!tileGrid.levelCompleted) {
            this.show()
        }
    }

    //hides the car from the player
    hide() {
        this.x = -1000;
        this.y = -1000;
    }

    //shows the car to the player
    show() {
        this.x = this.startX;
        this.y = this.startY;
    }

    //moves the car based on the score achieved by the player and the level the player is on
    calculatePosition() {
        this.x = 400 - (score * this.speedMultiplier);
    }  
}