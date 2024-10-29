const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'red';
let gameActive = true;
const boardState = Array(6).fill(null).map(() => Array(7).fill(null));

const createCell = (row, col) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.col = col;
    cell.addEventListener('click', () => handleCellClick(col));
    board.appendChild(cell);
};

const createBoard = () => {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 6; row++) {
            createCell(row, col);
        }
    }
};

const handleCellClick = (col) => {
    if (!gameActive) return;

    for (let row = 5; row >= 0; row--) {
        if (!boardState[row][col]) {
            boardState[row][col] = currentPlayer;
            updateCell(row, col);
            if (checkWin(row, col)) {
                status.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`;
                gameActive = false;
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            status.textContent = `Current Player: ${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}`;
            return;
        }
    }
};

const updateCell = (row, col) => {
    const cell = board.children[row * 7 + col];
    cell.classList.add(currentPlayer);
};

const checkWin = (row, col) => {
    return (
        checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal \
        checkDirection(row, col, 1, -1)   // Diagonal /
    );
};

const checkDirection = (row, col, rowIncrement, colIncrement) => {
    let count = 1;

    count += countInDirection(row, col, rowIncrement, colIncrement);
    count += countInDirection(row, col, -rowIncrement, -colIncrement);

    return count >= 4;
};

const countInDirection = (row, col, rowIncrement, colIncrement) => {
    let count = 0;
    let r = row + rowIncrement;
    let c = col + colIncrement;

    while (r >= 0 && r < 6 && c >= 0 && c < 7 && boardState[r][c] === currentPlayer) {
        count++;
        r += rowIncrement;
        c += colIncrement;
    }

    return count;
};

const resetGame = () => {
    currentPlayer = 'red';
    gameActive = true;
    status.textContent = `Current Player: Red`;
    board.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        boardState[i].fill(null);
    }
    createBoard();
};

restartButton.addEventListener('click', resetGame);
createBoard();
resetGame();
