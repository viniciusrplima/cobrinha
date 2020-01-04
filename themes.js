
function OldSchoolTheme() {

    this.snakeColor = "green";
    this.fruitColor = "goldenrod";
    this.bgColor = "beige";
}

function NewAgeTheme() {

    this.snakeColor = "blue";
    this.fruitColor = "red";
    this.bgColor = "gray";
}

function PrimaryTheme() {

    this.snakeColor = "gray";
    this.fruitColor = "white";
    this.bgColor = "black";
}

function NewLookTheme() {

    this.snakeColor = "green";
    this.fruitColor = "red";
    this.bgColor = "#ddffdd";

    this.imgSnakeHead = new Image();
    this.imgSnakeHead.src = "assets/snake-head.png";
    this.imgMiddleNormal = new Image();
    this.imgMiddleNormal.src = "assets/snake-middle-new.png";
    this.imgMiddleTurn = new Image();
    this.imgMiddleTurn.src = "assets/snake-middle-new-turn.png";
    this.imgSnakeTail = new Image();
    this.imgSnakeTail.src = "assets/snake-tail.png";

    this.imgFruit = new Image();
    this.imgFruit.src = "assets/fruit.png";

    this.shs = 30; // Snake Head Size
    this.sts = 35; // Snake Tail Size
    this.fs = 27; // Fruit Size

    this.draw = function(ctx, cw, ch, snkWorld) {
        let snakeTail = snkWorld.snake[snkWorld.snake.length-1];
        let snakeMTail = snkWorld.snake[snkWorld.snake.length-2];

        // Draw Snake Body
        for(let i = 1; i < snkWorld.snake.length-1; i++) {
            this.printMiddleCell(ctx, cw, ch, snkWorld, i);
        }
        
        // Draw Head
        this.drawHead(ctx, cw, ch, snkWorld);

        // Draw Tail
        ctx.save();
        ctx.beginPath();
        ctx.translate(cw*snakeTail.x + cw/2, ch*snakeTail.y + ch/2);

        if(snakeMTail.x == snakeTail.x-1)
            ctx.rotate(Math.PI);
        else if(snakeMTail.y == snakeTail.y-1)
            ctx.rotate(3*Math.PI/2);
        else if(snakeMTail.y == snakeTail.y+1)
            ctx.rotate(Math.PI/2);

        ctx.drawImage(this.imgSnakeTail, -this.sts/2, -ch/2, this.sts, ch);
        ctx.restore();

        // Draw Fruits
        for(cell of snkWorld.fruits)
        {
            ctx.save();
            ctx.translate(cw * cell.x + cw/2, ch * cell.y + ch/2);
            ctx.drawImage(this.imgFruit, -this.fs/2, -this.fs/2, this.fs, this.fs);
            ctx.restore();
        }   
    }


    /* Rotaciona e analiza as contorções da cobra e desenha o corpo */
    this.printMiddleCell = function(ctx, cw, ch, snkWorld, index) {
        isTurn = true;
        cell = CopyCell(snkWorld.snake[index]);
        nextCell = CopyCell(snkWorld.snake[index+1]);
        prevCell = CopyCell(snkWorld.snake[index-1]);
        if(prevCell.x == nextCell.x || prevCell.y == nextCell.y)
                isTurn = false;

        ctx.save();

        if(isTurn) {
            ctx.translate(cw * cell.x + cw/2, ch * cell.y + ch/2);

            if(this.isInBorder(cell, snkWorld.columns, snkWorld.lines)) {
                cell.x += 2;
                cell.y += 2;
                nextCell.x += 2;
                nextCell.y += 2;
                prevCell.x += 2;
                prevCell.y += 2;

                cell.x %= snkWorld.columns;
                cell.y %= snkWorld.lines;
                nextCell.x %= snkWorld.columns;
                nextCell.y %= snkWorld.lines;
                prevCell.x %= snkWorld.columns;
                prevCell.y %= snkWorld.lines;
            }
            if(prevCell.x > cell.x || nextCell.x > cell.x) {
                if(prevCell.y < cell.y || nextCell.y < cell.y)
                    ctx.rotate(3*Math.PI/2);
            }
            else {
                if(prevCell.y > cell.y || nextCell.y > cell.y)
                    ctx.rotate(Math.PI/2);
                else if(prevCell.y < cell.y || nextCell.y < cell.y)
                    ctx.rotate(Math.PI);
            }

            ctx.drawImage(this.imgMiddleTurn, -cw/2, -ch/2, cw, ch);
        }
        else {
            ctx.translate(cw * cell.x + cw/2, ch * cell.y + ch/2);
            if(prevCell.x == nextCell.x)
                ctx.rotate(Math.PI/2)

            ctx.drawImage(this.imgMiddleNormal, -cw/2, -ch/2, cw, ch);
        }

        ctx.restore();
    }

    /* Rotaciona e desenha a cabeça da cobra */
    this.drawHead = function(ctx, cw, ch, snkWorld) {
        let snakeHead = snkWorld.snake[0];
        ctx.save();
        ctx.beginPath();
        ctx.translate(cw*snakeHead.x + cw/2, ch*snakeHead.y + ch/2);
        
        switch(snkWorld.movingTo) {
            case "up":
                ctx.rotate(3*Math.PI/2);
                break;
            case "left":
                ctx.rotate(Math.PI);
                break;
            case "down":
                ctx.rotate(Math.PI/2);
                break;
            case "right":
                break;
        }
        
        ctx.drawImage(this.imgSnakeHead, -this.shs/2, -this.shs/2, this.shs, this.shs);
        ctx.restore();
    }

    this.isInBorder = function(cell, columns, lines) {
        if(cell.x == 0 || cell.y == 0 || cell.x == columns-1 || cell.y == lines-1)
            return true;
        return false;
    }
}


function CuttyLookTheme() {

    this.snakeColor = "Pink";
    this.fruitColor = "red";
    this.bgColor = "#ffddee";

    this.imgSnakeHead = new Image();
    this.imgSnakeHead.src = "assets/snake-head-cutty.png";
    this.imgMiddleNormal = new Image();
    this.imgMiddleNormal.src = "assets/snake-middle-cutty.png";
    this.imgMiddleTurn = new Image();
    this.imgMiddleTurn.src = "assets/snake-middle-cutty-turn.png";
    this.imgSnakeTail = new Image();
    this.imgSnakeTail.src = "assets/snake-tail-cutty.png";

    this.imgFruit = new Image();
    this.imgFruit.src = "assets/fruit.png";

    this.shs = 30; // Snake Head Size
    this.sts = 35; // Snake Tail Size
    this.fs = 27; // Fruit Size

    this.draw = function(ctx, cw, ch, snkWorld) {
        let snakeTail = snkWorld.snake[snkWorld.snake.length-1];
        let snakeMTail = snkWorld.snake[snkWorld.snake.length-2];

        // Draw Snake Body
        for(let i = 1; i < snkWorld.snake.length-1; i++) {
            this.printMiddleCell(ctx, cw, ch, snkWorld, i);
        }
        
        // Draw Head
        this.drawHead(ctx, cw, ch, snkWorld);

        // Draw Tail
        ctx.save();
        ctx.beginPath();
        ctx.translate(cw*snakeTail.x + cw/2, ch*snakeTail.y + ch/2);

        if(snakeMTail.x == snakeTail.x-1)
            ctx.rotate(Math.PI);
        else if(snakeMTail.y == snakeTail.y-1)
            ctx.rotate(3*Math.PI/2);
        else if(snakeMTail.y == snakeTail.y+1)
            ctx.rotate(Math.PI/2);

        ctx.drawImage(this.imgSnakeTail, -this.sts/2, -ch/2, this.sts, ch);
        ctx.restore();

        // Draw Fruits
        for(cell of snkWorld.fruits)
        {
            ctx.save();
            ctx.translate(cw * cell.x + cw/2, ch * cell.y + ch/2);
            ctx.drawImage(this.imgFruit, -this.fs/2, -this.fs/2, this.fs, this.fs);
            ctx.restore();
        }   
    }


    /* Rotaciona e analiza as contorções da cobra e desenha o corpo */
    this.printMiddleCell = function(ctx, cw, ch, snkWorld, index) {
        isTurn = true;
        cell = CopyCell(snkWorld.snake[index]);
        nextCell = CopyCell(snkWorld.snake[index+1]);
        prevCell = CopyCell(snkWorld.snake[index-1]);
        if(prevCell.x == nextCell.x || prevCell.y == nextCell.y)
                isTurn = false;

        ctx.save();

        if(isTurn) {
            ctx.translate(cw * cell.x + cw/2, ch * cell.y + ch/2);

            if(this.isInBorder(cell, snkWorld.columns, snkWorld.lines)) {
                cell.x += 2;
                cell.y += 2;
                nextCell.x += 2;
                nextCell.y += 2;
                prevCell.x += 2;
                prevCell.y += 2;

                cell.x %= snkWorld.columns;
                cell.y %= snkWorld.lines;
                nextCell.x %= snkWorld.columns;
                nextCell.y %= snkWorld.lines;
                prevCell.x %= snkWorld.columns;
                prevCell.y %= snkWorld.lines;
            }
            if(prevCell.x > cell.x || nextCell.x > cell.x) {
                if(prevCell.y < cell.y || nextCell.y < cell.y)
                    ctx.rotate(3*Math.PI/2);
            }
            else {
                if(prevCell.y > cell.y || nextCell.y > cell.y)
                    ctx.rotate(Math.PI/2);
                else if(prevCell.y < cell.y || nextCell.y < cell.y)
                    ctx.rotate(Math.PI);
            }

            ctx.drawImage(this.imgMiddleTurn, -cw/2, -ch/2, cw, ch);
        }
        else {
            ctx.translate(cw * cell.x + cw/2, ch * cell.y + ch/2);
            if(prevCell.x == nextCell.x)
                ctx.rotate(Math.PI/2)

            ctx.drawImage(this.imgMiddleNormal, -cw/2, -ch/2, cw, ch);
        }

        ctx.restore();
    }

    /* Rotaciona e desenha a cabeça da cobra */
    this.drawHead = function(ctx, cw, ch, snkWorld) {
        let snakeHead = snkWorld.snake[0];
        ctx.save();
        ctx.beginPath();
        ctx.translate(cw*snakeHead.x + cw/2, ch*snakeHead.y + ch/2);
        
        switch(snkWorld.movingTo) {
            case "up":
                ctx.rotate(3*Math.PI/2);
                break;
            case "left":
                ctx.rotate(Math.PI);
                break;
            case "down":
                ctx.rotate(Math.PI/2);
                break;
            case "right":
                break;
        }
        
        ctx.drawImage(this.imgSnakeHead, -this.shs/2, -this.shs/2, this.shs, this.shs);
        ctx.restore();
    }

    this.isInBorder = function(cell, columns, lines) {
        if(cell.x == 0 || cell.y == 0 || cell.x == columns-1 || cell.y == lines-1)
            return true;
        return false;
    }
}
