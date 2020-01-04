
function GameRenderizer(scrContext, width, height, snakeWorld) {

    this.endScrStruct = "\
    <div class='button-set button'>\
    <h3>Game Over</h3>\
    <div style='display:inline;'>Score:</div> <div id='score' style='display:inline;'></div>\
    <div id='newrecord'></div>\
    <br>\
    <button id='replay' class='over-button'>Play Again</button>\
    <button id='back' class='over-button'>Back</button>\
    </div>\
    ";

    this.regRecordStruct = "\
    <h5>New Record</h5>\
    <div class='label'>Your Name:</div> <input id='name' type='text' width='100' maxlength='16'>\
    <button id='register' class='over-button'>Register</button>\
    ";

    this.ctx = scrContext;
    this.width = width;
    this.height = height;
    this.snakeWorld = snakeWorld;
    this.cw = snakeWorld.cellWidth;
    this.ch = snakeWorld.cellHeight;

    this.theme = new OldSchoolTheme();
    this.ended = false;
    this.overscreen = null;
    this.parent = null;
    this.updater = null;


    this.setTheme = function(theme) {
        this.theme = theme;
    }

    this.draw = function() {
        if(this.ended) return;

        this.clearScreen();

        if(this.theme.draw == null) {
            for(cell of this.snakeWorld.snake)
                this.drawCell(cell, this.theme.snakeColor);
            for(fruit of this.snakeWorld.fruits)
                this.drawCell(fruit, this.theme.fruitColor);
        }
        else {
            this.theme.draw(this.ctx, this.cw, this.ch, snakeWorld);
        }
    }

    this.clearScreen = function() {
        this.ctx.fillStyle = this.theme.bgColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    this.drawCell = function(cell, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(cell.x * this.cw, cell.y * this.ch, this.cw, this.ch);
    }

    this.attachOverscreen = function(overscr) {
        this.overscreen = overscr;
    }

    this.attachParent = function(parent) {
        this.parent = parent;
    }

    this.setUpdater = function(updater) {
        this.updater = updater;
    }

    this.endGame = function() {
        this.ended = true;
        this.fillEndScreen();
    }

    this.fillEndScreen = function() {
        this.overscreen.innerHTML = this.endScrStruct;

        let btnBack = document.getElementById("back");
        let btnReplay = document.getElementById("replay");

        btnBack.addEventListener("click", () => {
            this.parent.returnToMenu();
        })
        btnReplay.addEventListener("click", () => {
            this.parent.reset();
        })

        this.fillNewRecord();
    }

    this.fillNewRecord = function() {
        let regNewRecord = document.getElementById("newrecord");

        regNewRecord.innerHTML = this.regRecordStruct;

        let btnRegister = document.getElementById("register");
        btnRegister.addEventListener("click", () => {
            this.registerRecord();
            this.clearNewRecord();
        });
    }

    this.clearNewRecord = function() {
        let regNewRecord = document.getElementById("newrecord");

        regNewRecord.innerHTML = "";
    }

    this.registerRecord = function() {
        let name = document.getElementById("name").value;
        let score = parseInt(document.getElementById("score").innerText);

        this.parent.records.registerRecord(new Record(name, score));
    }
}