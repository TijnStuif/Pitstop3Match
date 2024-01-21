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
            if (tileGrid.gameCompleted) {
                fill(0);
                console.log("you won wahoo!");
                return;
            }
            if (tileGrid.levelCompleted && mouseX > 250) {
                tileGrid.goToNextLevel();
            } else if (tileGrid.levelCompleted && mouseX < 250) {
                tileGrid.levelCompleted = false;
                tileGrid.currentLevel = tileGrid.highestLevelBeaten;
            }
            if (screenIndex === 5) {
                tileGrid.currentLevel = currentLevel;
            }
            if (screenIndex === 0) {
                playSong(mainMenuTheme);
            }
            tileGrid.resetLevel();
            switchScreen(buttonScreenIndex);
            this.button.hide();
        });
    }
}