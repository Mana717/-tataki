let score = 0;
let timeLeft = 30;
let level = 1;
let gameActive = false;
let gamePaused = false;
let gameTimer;
let moleTimer;
let highScore = 0; // localStorageはコードペンで使えない場合があるため

// DOM要素の取得
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const levelElement = document.getElementById('level');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const finalLevelElement = document.getElementById('finalLevel');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const holes = document.querySelectorAll('.hole');

// 初期化
updateDisplay();
highScoreElement.textContent = highScore;

function startGame() {
    if (gamePaused) {
        // 一時停止から復帰
        gamePaused = false;
        startBtn.textContent = 'ゲーム開始';
        pauseBtn.disabled = false;
        startMoleTimer();
        startGameTimer();
    } else {
        // 新しいゲーム開始
        score = 0;
        timeLeft = 30;
        level = 1;
        gameActive = true;
        gamePaused = false;
        
        gameOverElement.style.display = 'none';
        startBtn.textContent = 'ゲーム開始';
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        
        clearAllMoles();
        updateDisplay();
        startMoleTimer();
        startGameTimer();
    }
}

function pauseGame() {
    if (!gameActive) return;
    
    gamePaused = true;
    clearTimeout(gameTimer);
    clearTimeout(moleTimer);
    
    startBtn.textContent = '再開';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    
    clearAllMoles();
}

function resetGame() {
    gameActive = false;
    gamePaused = false;
    score = 0;
    timeLeft = 30;
    level = 1;
    
    clearTimeout(gameTimer);
    clearTimeout(moleTimer);
    clearAllMoles();
    
    gameOverElement.style.display = 'none';
    startBtn.textContent = 'ゲーム開始';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    
    updateDisplay();
}

function startGameTimer() {
    gameTimer = setTimeout(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        } else {
            // レベルアップ判定
            if (score >= level * 10) {
                level++;
                levelElement.textContent = level;
            }
            startGameTimer();
        }
    }, 1000);
}

function startMoleTimer() {
    if (!gameActive || gamePaused) return;
    
    const delay = Math.max(800 - (level - 1) * 100, 300); // レベルが上がるほど早く
    
    moleTimer = setTimeout(() => {
        showRandomMole();
        startMoleTimer();
    }, delay);
}

function showRandomMole() {
    // 既にもぐらがいる穴を除外
    const emptyHoles = Array.from(holes).filter(hole => !hole.querySelector('.mole'));
    if (emptyHoles.length === 0) return;
    
    const randomHole = emptyHoles[Math.floor(Math.random() * emptyHoles.length)];
    const mole = document.createElement('div');
    mole.className = 'mole';
    randomHole.appendChild(mole);
    
    // もぐらが自動で消える
    setTimeout(() => {
        if (mole && mole.parentNode) {
            mole.remove();
        }
    }, 1500 - level * 100); // レベルが上がるほど早く消える
}

function hitMole(hole) {
    if (!gameActive || gamePaused) return;
    
    const mole = hole.querySelector('.mole');
    if (mole) {
        // ヒット効果
        mole.classList.add('hit');
        score += level; // レベルに応じて得点
        scoreElement.textContent = score;
        
        // もぐらを削除
        setTimeout(() => {
            mole.remove();
        }, 300);
    }
}

function clearAllMoles() {
    holes.forEach(hole => {
        const mole = hole.querySelector('.mole');
        if (mole) {
            mole.remove();
        }
    });
}

function endGame() {
    gameActive = false;
    gamePaused = false;
    clearTimeout(gameTimer);
    clearTimeout(moleTimer);
    clearAllMoles();
    
    // ハイスコア更新
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
    }
    
    // ゲーム終了表示
    finalScoreElement.textContent = score;
    finalLevelElement.textContent = level;
    gameOverElement.style.display = 'block';
    
    startBtn.textContent = 'もう一度';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function updateDisplay() {
    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    levelElement.textContent = level;
    highScoreElement.textContent = highScore;
}
