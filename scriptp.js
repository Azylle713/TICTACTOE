// Global variables
let currentPlayer = 'X';
let gameBoard = Array(30).fill('');
let gameActive = true;
let difficultyLevel = 'easy';
let playerWins = 0;
let computerWins = 0;
let playerConsecutiveWins = 0;
let computerConsecutiveWins = 0;
const roundsToWin = 5;
 
// Function to start human vs human mode
function startHumanVsHuman() {
    window.location.href = 'TIKTACTOEH.php';
}
 
// Function to toggle player
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}
 

 
 
// Function to make a move
function makeMove(cell) {
    const cellIndex = Array.from(cell.parentNode.children).indexOf(cell);
 
    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();
        togglePlayer();
 
        if (currentPlayer === 'O' && gameActive) {
            makeComputerMove();
        }
    }
}
 
// Function to set the difficulty level
function setDifficulty(level) {
    difficultyLevel = level;
    resetGame();
}
 
// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = Array(30).fill('');
    gameActive = true;
 
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });
 
    document.getElementById('status').textContent = '';
}
 
// Function to update the scoreboard text content
function updateScoreboard() {
    document.getElementById('score').textContent = `Player: ${playerWins} - Computer: ${computerWins}`;
}
 
// Function to update the score and check for race completion
function updateScore() {
    if (currentPlayer === 'X') {
        playerWins++;
        playerConsecutiveWins++;
        computerConsecutiveWins = 0; // Reset computer consecutive wins
    } else {
        computerWins++;
        computerConsecutiveWins++;
        playerConsecutiveWins = 0; // Reset player consecutive wins
    }
 
    updateScoreboard(); // Update the scoreboard
 
    if (playerWins === roundsToWin || computerWins === roundsToWin) {
        if (playerWins === roundsToWin) {
            document.getElementById('status').textContent = 'Player wins the game!';
        } else {
            document.getElementById('status').textContent = 'Computer wins the game!';
        }
 
        // Display congratulatory popup
        if (confirm(`${currentPlayer} wins the race to 5 wins! Do you want to play another game?`)) {
            resetGame();
            playerWins = 0; // Reset player wins
            computerWins = 0; // Reset computer wins
            updateScoreboard(); // Update the scoreboard with reset scores
            return; // Restart the game
        } else {
            gameActive = false; // End the game
            return; // Stop execution
        }
    }
 
    if (playerConsecutiveWins === roundsToWin) {
        document.getElementById('status').textContent = 'Player wins the match!';
        resetGame();
    }
 
    if (computerConsecutiveWins === roundsToWin) {
        document.getElementById('status').textContent = 'Computer wins the match!';
        resetGame();
    }
 
    // Update game history
    updateGameHistory(currentPlayer);
}
 
// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        // Rows
        [0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17],
        [18, 19, 20, 21, 22, 23], [24, 25, 26, 27, 28, 29],
        // Columns
        [0, 6, 12, 18, 24], [1, 7, 13, 19, 25], [2, 8, 14, 20, 26],
        [3, 9, 15, 21, 27], [4, 10, 16, 22, 28], [5, 11, 17, 23, 29],
        // Diagonals top-left - bot-right
        [1, 6], [2, 7, 12], [3, 8, 13, 18], [4, 9, 14, 19, 24], [5, 10, 15, 20, 25],
        [11, 16, 21, 26], [17, 22, 27], [23, 28],
        // Diagonals bot-left - top-right
        [18, 25], [12, 19, 26], [6, 13, 20, 27], [0, 7, 14, 21, 28], [1, 8, 15, 22, 29],
        [2, 9, 16, 23], [3, 10, 17], [4, 11],
    ];
 
    for (const pattern of winPatterns) {
        const cellsInPattern = pattern.map(index => gameBoard[index]);
        if (cellsInPattern[0] && cellsInPattern.every(cell => cell === cellsInPattern[0])) {
            document.getElementById('status').textContent = `${currentPlayer} wins!`;
            gameActive = false;
        }
    }
 
    if (!gameBoard.includes('') && gameActive) {
        document.getElementById('status').textContent = 'It\'s a tie!';
        gameActive = false;
    }
 
    if (!gameActive) {
        updateScore();
    }
}
 
// Function to make a move for the computer (easy mode)
function makeComputerMove() {
    if (difficultyLevel === 'easy') {
        makeRandomMove();
    } else if (difficultyLevel === 'normal') {
        makeMediumMove();
    } else if (difficultyLevel === 'hard') {
        makeHardMove();
    }
}
 
// Function to make a random move
function makeRandomMove() {
    const emptyCells = gameBoard.reduce((acc, value, index) => {
        if (value === '') {
            acc.push(index);
        }
        return acc;
    }, []);
 
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCellIndex = emptyCells[randomIndex];
 
    gameBoard[randomCellIndex] = currentPlayer;
    const cell = document.querySelectorAll('.cell')[randomCellIndex];
    cell.textContent = currentPlayer;
    checkWinner();
    togglePlayer();
}
 
// Function to make a medium difficulty move
function makeMediumMove() {
    let computerMove = findWinningMove('O');
 
    if (!computerMove) {
        computerMove = findWinningMove('X');
 
        if (!computerMove) {
            computerMove = prioritizeCenterOrEdges();
        }
    }
 
    gameBoard[computerMove] = currentPlayer;
    const cell = document.querySelectorAll('.cell')[computerMove];
    cell.textContent = currentPlayer;
    checkWinner();
    togglePlayer();
}
 
// Function to prioritize center or edges
function prioritizeCenterOrEdges() {
    // Prioritize center and edges over corners
    const emptyCells = getEmptyCells(gameBoard);
    const centerAndEdges = emptyCells.filter(index => [4, 1, 3, 5, 7].includes(index));
    return centerAndEdges.length > 0 ? centerAndEdges[Math.floor(Math.random() * centerAndEdges.length)] : emptyCells[Math.floor(Math.random() * emptyCells.length)];
}
 
// Function to find a winning move
function findWinningMove(player) {
    for (const pattern of winPatterns) {
        const cellsInPattern = pattern.map(index => gameBoard[index]);
 
        if (cellsInPattern.filter(cell => cell === player).length === 2) {
            const emptyCellIndex = pattern.find(index => gameBoard[index] === '');
            if (emptyCellIndex !== undefined) {
                return emptyCellIndex;
            }
        }
    }
 
    return null;
}
 
//hard
function makeHardMove(){
    const availableSpots = emptySquares();

    //Check if can win on next move
    for (let i = 0; i < availableSpots.length; i++){
        const cloneBoard = origBoard.slice();
        cloneBoard[availableSpots[i]] = aiPlayer;
        if (checkWin(cloneBoard, aiPlayer)){
            console.log(availableSpots[i] + ' is my winning move');
            return availableSpots[i];
        }
    }

    //Check if player can win on next move then block if true
    const opponentPlayer = getOpponentPlayer(currentPlayer);
    for (let i = 0; i < availableSpots.length; i++) {
        const cloneBoard = gameBoard.slice();
        cloneBoard[availableSpots[i]] = opponentPlayer;
        if (checkWin(cloneBoard, opponentPlayer)) {
            console.log(availableSpots[i] + ' is my blocking move');
            gameBoard[availableSpots[i]] = currentPlayer;
            const cell = document.querySelectorAll('.cell')[availableSpots[i]];
            cell.textContent = currentPlayer;
            checkWinner();
            togglePlayer();
            return;
        }
    }

    // Try to set up a future winning move
    // (place mark in a spot that creates a potential winning combination)
    for (let i = 0; i < availableSpots.length; i++){
        const cloneBoard = origBoard.slice();
        cloneBoard[availableSpots[i]] = aiPlayer;
        for (j = 0; j < availableSpots.length; j++){
            const cloneCloneBoard = cloneBoard.slice();
            cloneCloneBoard[availableSpots[j]] = aiPlayer;
            if (checkWin(cloneCloneBoard, aiPlayer)){
                    console.log(availableSpots[j] + ' is my winning strategic move');
                    return availableSpots[j];
            }
        }
    }

    // Try to block a future winning move
    // (place mark in a spot that creates a potential winning combination from the player)
    for (let i = 0; i < availableSpots.length; i++){
        const cloneBoard = origBoard.slice();
        cloneBoard[availableSpots[i]] = huPlayer;
        for (j = 0; j < availableSpots.length; j++){
            const cloneCloneBoard = cloneBoard.slice();
            cloneCloneBoard[availableSpots[j]] = huPlayer;
            if (checkWin(cloneCloneBoard, huPlayer)){
                    console.log(availableSpots[j] + ' is my blocking strategic move');
                    return availableSpots[j];
            }
        }
    }

    //if no for the first 3 condition then random move
    return randomSquare();
}
 
// Function to get opponent player
function getOpponentPlayer(player) {
    return player === 'X' ? 'O' : 'X';
}
 
 
// Function to go back to the previous page
function goBack() {
    window.history.back();
}


// Add this function to toggle play/pause for the music
function toggleMusic() {
    var music = document.getElementById('backgroundMusic');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}