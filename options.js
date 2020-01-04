
/* Classe do menu do opções do jogo */
function OptionsGame(scrContext, width, height) {

    this.ctx = scrContext;
    this.width = width;
    this.height = height;
    this.playingState = "Options";
    this.overscreen = null;
    this.startGame = null; // Objeto do jogo em si

    this.menuStruct = "\
    <div class='button-set'>\
        <div class='button right morePadding'>\
            <h3 class='center'>Options</h3>\
            <div class='label'>Tema:</div> <select class='options-select' id='select-theme'>\
                <option value='Old School'>Old School</option>\
                <option value='New Age'>New Age</option>\
                <option value='Primary'>Primary</option>\
                <option value='New Look'>New Look</option>\
                <option value='Cutty Look'>Cutty Look</option>\
            </select>\
            <button class='option-button' id='back'>Back</button>\
        </div>\
    </div>\
    ";

    this.theme = {
        bg_color: "beige", 
    };

    this.reset = function() {
        this.fillMenu();
        this.playingState = "Options";
    }

    this.play = function() {
        this.draw();
        return this.playingState;
    }

    this.draw = function() {
        this.ctx.fillStyle = this.theme.bg_color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    this.returnToMenu = function() {
        this.playingState = "Menu";
    }

    this.attachOverscreen = function(overscr) {
        this.overscreen = overscr;
    }

    this.setStartGame = function(startGame) {
        this.startGame = startGame;
    }

    this.updateOptions = function() {
        let theme = this.getOptTheme();
        //let speed = this.getOptSpeed();

        this.startGame.setTheme(theme);
        // this.startGame.setSpeed(speed);
    }

    this.getOptTheme = function() {
        let themeName = document.getElementById("select-theme").value;
        let objTheme = null;

        switch(themeName) {
            case "Old School":
                objTheme = new OldSchoolTheme();
                break;
            case "New Age":
                objTheme = new NewAgeTheme();
                break;
            case "Primary":
                objTheme = new PrimaryTheme();
                break;
            case "New Look":
                objTheme = new NewLookTheme();
                break;
            case "Cutty Look":
                objTheme = new CuttyLookTheme();
                break;        
        }

        console.log(themeName);

        return objTheme;
    }

    this.fillMenu = function() {
        if(this.overscreen != null)
            this.overscreen.innerHTML = this.menuStruct;
        
        let btnBack = document.getElementById("back");

        btnBack.addEventListener("click", () => {
            this.clearMenu();
            this.updateOptions();
            this.returnToMenu();
        })
    }
    this.clearMenu = function() {
        this.overscreen.innerHMTL = "";
    }
}