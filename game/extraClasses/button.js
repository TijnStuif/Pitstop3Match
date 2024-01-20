class Button {
    x;
    y;
    text;
    button;

    constructor(x, y, text, buttonScreenIndex, startsHidden, currentLevel) {
        this.text = text;
        this.button = createButton(text);
        this.button.position(x,y);
        if (startsHidden) {
            this.button.hide();
        }
        this.button.mousePressed(() => {
            if (tileGrid.levelCompleted && mouseX > 250) {
                console.log("we going to the next level")
                tileGrid.goToNextLevel();
            } else if (tileGrid.levelCompleted && mouseX < 250) {
                console.log("no")
                tileGrid.levelCompleted = false;
            }
            if (screenIndex === 5) {
                tileGrid.currentLevel = currentLevel;
            }
            tileGrid.resetLevel();
            switchScreen(buttonScreenIndex);
            this.button.hide();
        });
    }
}