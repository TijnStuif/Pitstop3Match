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
        //all the logic when a button is pressed
        this.button.mousePressed(() => {
            //logs message when game is completed
            //sends player to next level if continue button is pressed
            if (tileGrid.currentLevel == 5 && screenIndex === 3) {
                tileGrid.goToNextLevel();
                return;
            }
            if (tileGrid.levelCompleted && mouseX > 250) {
                tileGrid.goToNextLevel();
            //checks if player completed a level and went back to the garage, and then updates the highest level beaten accordingly
            } else if (tileGrid.levelCompleted && mouseX < 250) {
                tileGrid.levelCompleted = false;
                if (tileGrid.highestLevelBeaten <= tileGrid.currentLevel) {
                tileGrid.highestLevelBeaten++;
                }
                tileGrid.currentLevel = tileGrid.highestLevelBeaten;
            }
            //sends player to the level that is displayed on the button with the currentLevel variable given with the constructor
            if (screenIndex === 5) {
                tileGrid.currentLevel = currentLevel;
            }
            //starts the main theme when the second screen is entered
            if (screenIndex === 0) {
                playSong(mainMenuTheme);
            }
            //resets level when any button is pressed, and switches screen to the buttonScreenIndex assigned with the constructor
            //also makes sure all buttons hide after being pressed
            tileGrid.resetLevel();
            switchScreen(buttonScreenIndex);
            this.button.hide();
        });
    }
}