<div class="game-container">
    <h1 class="game-title">🐹 もぐらたたき 🔨</h1>
    
    <div class="game-info">
        <div class="score">スコア: <span id="score">0</span></div>
        <div class="time">時間: <span id="time">30</span></div>
        <div class="level">レベル: <span id="level">1</span></div>
    </div>

    <div class="game-over" id="gameOver">
        <h2>ゲーム終了！</h2>
        <p>最終スコア: <span id="finalScore">0</span></p>
        <p>レベル: <span id="finalLevel">1</span></p>
        <p class="high-score">ハイスコア: <span id="highScore">0</span></p>
    </div>

    <div class="game-board" id="gameBoard">
        <div class="hole" onclick="hitMole(this)"></div>
        <div class="hole" onclick="hitMole(this)"></div>
        <div class="hole" onclick="hitMole(this)"></div>
        <div class="hole" onclick="hitMole(this)"></div>
        <div class="hole" onclick="hitMole(this)"></div>
        <div class="hole" onclick="hitMole(this)"></div>
        <div class="hole" onclick="hitMole(this)"></div>
        <div class="hole" onclick="hitMole(this)"></div>
        <div class="hole" onclick="hitMole(this)"></div>
    </div>

    <div class="control-buttons">
        <button class="btn" id="startBtn" onclick="startGame()">ゲーム開始</button>
        <button class="btn" id="pauseBtn" onclick="pauseGame()" disabled>一時停止</button>
        <button class="btn" onclick="resetGame()">リセット</button>
    </div>
</div>
