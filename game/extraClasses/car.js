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
        this.speedMultiplier = width / tileGrid.pointRequirement
        this.size = 100;
    }

    checkEndLevel() {
        if (tileGrid.levelCompleted) {
            this.hide();
        }
    }

    checkBeginLevel() {
        if (!tileGrid.levelCompleted) {
            this.show();
        }
    }

    hide() {
        this.x = -1000;
        this.y = -1000;
    }

    showInLevel() {
        this.x = this.startX;
        this.y = this.startY;
    }

    calculatePosition() {
        this.x = 400 - (score * this.speedMultiplier);
    }  
}