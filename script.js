const colors = ['red', 'blue', 'green', 'yellow'];
const gamePattern = [];
let userPattern = [];
let level = 0;
let gameStarted = false;

const squares = document.querySelectorAll('.square');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const message = document.getElementById('message');

// Função para tocar um som
function playSound(color) {
    // Aqui você pode adicionar a lógica para tocar o som
    // Exemplo: const audio = new Audio(`sounds/${color}.mp3`);
    // audio.play();
}

// Função para animar um quadrado
function animateSquare(square, colorClass) {
    square.classList.add(colorClass);
    setTimeout(() => {
        square.classList.remove(colorClass);
    }, 300);
}

// Função para iniciar o jogo
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        startBtn.disabled = true;
        resetBtn.disabled = false;
        nextSequence();
    }
}

// Função para reiniciar o jogo
function resetGame() {
    gamePattern.length = 0;
    userPattern.length = 0;
    level = 0;
    gameStarted = false;
    startBtn.disabled = false;
    resetBtn.disabled = true;
    message.textContent = '';
}

// Função para gerar a próxima sequência
function nextSequence() {
    userPattern = [];
    level++;
    message.textContent = `Level ${level}`;
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    animateSequence();
}

// Função para animar a sequência
function animateSequence() {
    let i = 0;
    const interval = setInterval(() => {
        const square = document.querySelector(`.${gamePattern[i]}`);
        playSound(gamePattern[i]);
        animateSquare(square, `${gamePattern[i]}-light`); // Usando variação mais clara da cor
        i++;
        if (i >= gamePattern.length) {
            clearInterval(interval);
        }
    }, 600);
}

// Função para lidar com os cliques do usuário
function handleClick() {
    const clickedColor = this.getAttribute('id');
    userPattern.push(clickedColor);
    playSound(clickedColor);
    animateSquare(this, `${clickedColor}-dark`); // Usando variação mais escura da cor
    checkAnswer(userPattern.length - 1);
}

// Função para verificar a resposta do usuário
function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

// Função para lidar com o fim do jogo
function gameOver() {
    playSound('wrong');
    message.textContent = 'Game Over! Press Reset to play again.';
    resetGame();
}

// Adicionando event listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
squares.forEach(square => {
    square.addEventListener('click', handleClick);
});
