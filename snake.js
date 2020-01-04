

/* Classe Principal do Jogo */
function SnakeGame(scrContext, width, height) {
    
    /* Estrutura HTML do Menu do Jogo */
    const menuStruct = "\
    <h1 class='title'>Cobrinha</h1>\
    <div class='button-set'>\
    <button id='btn-start' class='button'>Start</button><br>\
    <button id='btn-records' class='button'>Records</button><br>\
    <button id='btn-options' class='button'>Options</button><br>\
    </div>\
    ";

    this.state = "Menu";
    this.ctx = scrContext;
    this.width = width;
    this.height = height;
    this.clock = 100;

    /* Inicia o jogo */
    this.play = function() {
        this.init();
        this.resetLoop();
    }
    
    /* Prepara o jogo para ser jogado */
    this.init = function() {
        this.fillMenu();
        this.startGame = new StartGame(this.ctx, this.width, this.height);
        this.recordsGame = new RecordsGame(this.ctx, this.width, this.height);
        this.optionsGame = new OptionsGame(this.ctx, this.width, this.height);

        this.startGame.attachOverscreen(this.overscreen);
        this.startGame.setRecords(this.recordsGame);
        this.optionsGame.attachOverscreen(this.overscreen);
        this.optionsGame.setStartGame(this.startGame);
        this.recordsGame.attachOverscreen(this.overscreen);
    }

    /* Loop principal do Jogo e a alternância entre estados */
    this.resetLoop = function() {
        setInterval(()=> {
            lastState = this.state;
            switch(this.state) {
                case "Menu":
                    this.drawMenu();
                    break;
                case "Game":
                    this.state = this.startGame.play();
                    break;
                case "Options":
                    this.state = this.optionsGame.play();
                    break;
                case "Records":
                    this.state = this.recordsGame.play();
                    break;
            }
            if(lastState != this.state && this.state == "Menu")
                this.fillMenu();
        }, this.clock);
    }

    /* Desenha no Context do Menu */
    this.drawMenu = function() {
        ctx.fillStyle = "beige";
        ctx.fillRect(0, 0, this.width, this.height);
    }

    /* Anexa uma nova tela HTML sobre o canvas, chamada overscreen.
        Serve para utilizar elementos HTML por sobre o canvas.
        Onde são adicionados os botões do Menu */
    this.attachOverscreen = function(scr) {
        this.overscreen = scr;
    }
    
    /* Insere a estrutura HTML do Menu no Overscreen e 
        inicializa os input dos botões */
    this.fillMenu = function() {
        this.overscreen.innerHTML = menuStruct;
        
        let btnStart = document.getElementById("btn-start");
        let btnRecords = document.getElementById("btn-records");
        let btnOptions = document.getElementById("btn-options");
        
        btnStart.addEventListener("click", () => {
            this.startGame.reset();
            this.state = "Game";
        });
        btnRecords.addEventListener("click", () => {
            this.recordsGame.reset();
            this.state="Records";
        });
        btnOptions.addEventListener("click", () => {
            this.optionsGame.reset();
            this.state="Options";
        });
    }

    /* Limpa qualquer estrutura que esteja na overscreen */
    this.clearMenu = function() {
        this.overscreen.innerHTML = "";
    }
}

let screen = document.getElementById("screen");
let overScreen = document.getElementById("overscreen");
let ctx = screen.getContext("2d");
let width = screen.width;
let height = screen.height;

game = new SnakeGame(ctx, width, height);
game.attachOverscreen(overScreen);
game.play();