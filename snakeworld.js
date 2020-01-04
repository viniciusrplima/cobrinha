
function Cell(x, y) {
    this.x = x;
    this.y = y;
}

function CopyCell(cell) {
    return new Cell(cell.x, cell.y);
}



function SnakeWorld(width, height) {

    this.snake = [];
    this.fruits = [];
    this.columns = 25;
    this.lines = 25;
    this.cellWidth = width / this.columns;
    this.cellHeight = height / this.lines;
    this.score = 0;
    this.movingTo = "up";

    this.clear = function() {
        this.snake = [];
        this.fruits = [];
        this.score = 0;
    }

    this.addSnakeCell = function(cell) {
        this.snake.push(cell);
    }

    this.addFruit = function(cell) {
        this.fruits.push(cell);
    }
    this.remFruit = function(index) {
        this.fruits[index] = this.fruits[this.fruits.length-1];
        this.fruits.pop();
    }
}