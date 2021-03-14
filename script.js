let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); // renderiza o desenho num plano 2D
let box = 32; // 32 px cada quadrado
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right"; // a direção que a cobra começa
let food = {
    // Math.floor retira a parte flutuante do Math.random
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// desenhar um canva
function criarBG() {
    context.fillStyle = "lightgreen"; // preenche com algum estilo
    context.fillRect(0, 0, 16 * box, 16 * box); // desenha o retangulo
}

function criarCobrinha() {
    // vamos trabalhar com o FOR já que vamos manipular uma Array
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// desenhar a comida
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// evento de escuta
document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    // plano cartesiano para que a cobra apareça novamente quando sair do plano
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    //encerrar o jogo se a posiçao 0 chocar com a posiçao 1 do corpo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    //pontos de partida
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //coordenadas que se seguem
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //a comida muda de posição quando a cobra come e cobra aumenta
    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    //retirar o último elemento da Array
    //snake.pop();

    //adicionar a cabeça da cobra para aumentar de tamanho
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
