class Button {
    x;
    y;
    text;
    button;

    constructor(x, y, text, screenIndex, startsHidden) {
        this.text = text;
        this.button = createButton(text);
        this.button.position(x,y);
        if (startsHidden) {
            this.button.hide();
        }
        this.button.mousePressed(() => {
            if (tileGrid.levelCompleted) {
                tileGrid.goToNextLevel()
            }
            switchScreen(screenIndex);
            this.button.hide();
        });
    }
}