(function init() {
    'use strict';
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const cellElements = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('board');
    const winningMessageElement = document.getElementById('winningMessage');
    const restartButton = document.getElementById('restartButton')
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
    let oTurn;

    startGame();

    restartButton.addEventListener('click', startGame);

    // startGame();
    function startGame() {
        oTurn = false
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', handleClick)
            cell.addEventListener('click', handleClick, { once: true })
        })
        setBoardHoverClass()
        winningMessageElement.classList.remove('show');
    }

    // handleClick();
    function handleClick(e) {
        const cell = e.target;
        const currentClass = oTurn ? O_CLASS : X_CLASS;
        // PlaceMark
        placeMark(cell, currentClass);

        if (checkWin(currentClass)) {
            //Check for win
            endGame(false);
        } else if (isDraw()) {
            //Check for draw
            endGame(true);
        } else {
            //Switch turns
            swapTurns();
            setBoardHoverClass();
        }
    }

    // endGame();
    function endGame(draw) {
        if (draw) {
            winningMessageTextElement.innerText = 'Draw!';
        } else {
            winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
        }
        winningMessageElement.classList.add('show');
    }

    // isDraw();
    function isDraw() {
        return [...cellElements].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
        })
    }

    // placeMark();
    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass)
    }

    // swapTurns();
    function swapTurns() {
        oTurn = !oTurn
    }

    // setBoardHoverClass();
    function setBoardHoverClass() {
        board.classList.remove(X_CLASS);
        board.classList.remove(O_CLASS);
        if (oTurn) {
            board.classList.add(O_CLASS);
        } else {
            board.classList.add(X_CLASS);
        }
    }

    // checkWin();
    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass)
            })
        })
    }
})();
