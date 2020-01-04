
/* Classe do jogo em si Acionado quando se clica em Start */
function StartGame(scrContext, width, height) {

    /* Estrutura HTML da HUD do jogo */
    const menuSctruct = "\
    <div id='hud' class='hud'>\
    <button id='game-return' class='hud-button'>Return to Menu</button>\
    <div id='score' class='hud-score'></div>\
    </div>\
    ";

    this.ctx = scrContext;
    this.width = width;
    this.height = height;
    this.score = 0;
    this.playingState = "Game";
    this.overscreen = null;
    this.theme = new CuttyLookTheme();
    this.records = null;

    /* Funcão de loop da classe StartGame */
    this.play = function() {
        this.renderizer.draw();
        this.updateHUD();
        this.updater.update();
        return this.playingState;
    }

    /* Função chamada quando se quer retornar ao Menu */
    this.returnToMenu = function() {
        this.playingState = "Menu";
        this.clearHUD();
    }

    /* Função para resetar os parametros e a HUD do jogo */
    this.reset = function() {
        this.score = 0;
        this.playingState = "Game";

        this.fillHUD();

        let btnReturn = document.getElementById("game-return");
        btnReturn.addEventListener("click", () => {this.returnToMenu();});

        this.snakeWorld = new SnakeWorld(this.width, this.height);
        this.updater = new GameUpdater(this.snakeWorld);
        this.renderizer = new GameRenderizer(this.ctx, this.width, this.height, this.snakeWorld);

        this.updater.reset();
        this.updater.setRenderizer(this.renderizer);
        this.renderizer.setTheme(this.theme);
        this.renderizer.attachOverscreen(this.overscreen);
        this.renderizer.attachParent(this);
        this.renderizer.setUpdater(this.updater);
    }

    /* Troca a classe responsável por fazer o update do jogo
        Ou seja, responsável pelas atualizações de frames e pela física */
    this.setUpdater = function(updater) {
        this.updater = updater;
    }

    /* Troca a classe responsável por fazer a renderização do jogo */
    this.setRenderizer = function(renderizer) {
        this.renderizer = renderizer;
    }

    /* Anexa uma tela Overscreen ao StartGame */
    this.attachOverscreen = function(overscr) {
        this.overscreen = overscr;
    }

    /* Insere a estrutura da HUD na Overscreen */
    this.fillHUD = function() {
        this.overscreen.innerHTML = menuSctruct;
    }
    /* Atualiza a HUD do Jogo */
    this.updateHUD = function() {
        let hudScore = document.getElementById("score");
        if(hudScore != null)
            hudScore.innerText = `${this.snakeWorld.score}`;
    }
    /* Limpa a Overscreen */
    this.clearHUD = function() {
        this.overscreen.innerHTML = "";
    }

    this.setTheme = function(theme) {
        this.theme = theme;
    }

    this.setRecords = function(rec) {
        this.records = rec;
    }
}