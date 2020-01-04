
function GameUpdater(snakeWorld) {

    const key_left = 37;
    const key_up = 38;
    const key_right = 39;
    const key_down = 40;

    this.snakeWorld = snakeWorld;
    this.movingTo = "up";
    this.ended = false;

    this.renderizer = null;

    this.reset = function() {
        snakeWorld.clear();
        snakeWorld.addSnakeCell(new Cell(10, 20));
        snakeWorld.addSnakeCell(new Cell(10, 21));
        snakeWorld.addSnakeCell(new Cell(10, 22));
        snakeWorld.addFruit(new Cell(10, 15));

        this.resetInput();
        this.ended = false;
    }

    this.update = function() {

        if(this.ended) return;

        this.updateSnake();
        this.updateFruits();
    }

    this.updateSnake = function() {
        for(let i = snakeWorld.snake.length-1; i > 0; i--) {
            snakeWorld.snake[i].x = snakeWorld.snake[i-1].x;
            snakeWorld.snake[i].y = snakeWorld.snake[i-1].y;
        }
        
        switch(this.movingTo) {
            case "up":
                snakeWorld.snake[0].y -= 1;
                break;
            case "down":
                snakeWorld.snake[0].y += 1;
                break;
            case "left":
                snakeWorld.snake[0].x -= 1;
                break;
            case "right":
                snakeWorld.snake[0].x += 1;
                break;
        }
        
        this.limitSnake();
        this.testCollision();
    }

    this.limitSnake = function() {
        this.snakeWorld.snake[0].x += this.snakeWorld.columns;
        this.snakeWorld.snake[0].x %= this.snakeWorld.columns;
        this.snakeWorld.snake[0].y += this.snakeWorld.lines;
        this.snakeWorld.snake[0].y %= this.snakeWorld.lines;
    }

    this.updateFruits = function() {
        this.countFruitDelay++;
        snakeHead = this.snakeWorld.snake[0];
        snakeTail = this.snakeWorld.snake[this.snakeWorld.snake.length-1];
        for(let i = 0; i < this.snakeWorld.fruits.length; i++) {
            if(this.snakeWorld.fruits[i].x == snakeHead.x && this.snakeWorld.fruits[i].y == snakeHead.y) {
                this.snakeWorld.addSnakeCell(new Cell(snakeTail.x, snakeTail.y));
                this.snakeWorld.remFruit(i);
                this.newFruit();
                this.snakeWorld.score += 10;
            }
        }
    }

    this.newFruit = function() {
        posX = Math.floor(Math.random()*this.snakeWorld.columns);
        posY = Math.floor(Math.random()*this.snakeWorld.lines);
        this.snakeWorld.addFruit(new Cell(posX, posY));
    }

    this.resetInput = function() {
        document.addEventListener("keydown", (ev) => {
            switch(ev.keyCode) {
                case key_up: 
                    if(this.movingTo != "down")
                        this.movingTo = "up";
                    break;
                case key_down: 
                    if(this.movingTo != "up")
                        this.movingTo = "down";
                    break;
                case key_left: 
                    if(this.movingTo != "right")
                        this.movingTo = "left";
                    break;
                case key_right: 
                    if(this.movingTo != "left")
                        this.movingTo = "right";
                    break;
            }
            this.snakeWorld.movingTo = this.movingTo;
        })
    }

    this.testCollision = function() {
        snakeHead = this.snakeWorld.snake[0];

        for(let i = 1; i < this.snakeWorld.snake.length; i++) {
            snakeCell = this.snakeWorld.snake[i];
            if(snakeCell.x == snakeHead.x && snakeCell.y == snakeHead.y)
                this.endGame();
        }
    }

    this.setRenderizer = function(rdzer) {
        this.renderizer = rdzer;
    }

    this.endGame = function() {
        this.ended = true;
        this.renderizer.endGame();
    }

}
