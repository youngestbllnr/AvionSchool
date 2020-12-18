console.log("LET'S PLAY TIC-TAC-TOE...");

const emptyBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

const positionsIndex = {
    "nw": "00",
    "n": "01",
    "ne": "02",
    "w": "10",
    "c": "11",
    "e": "12",
    "sw": "20",
    "s": "21",
    "se": "22"
}

let history = [
    [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
];

let currentTurn = "X";
let currentMoveIndex = 0;
let currentMove = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let scoreX = 0;
let scoreO = 0;

let isGameOver = false;

function createMove(mark, position) {
    //UPDATE CURRENT MOVE
    const indexRow = positionsIndex[position][0];
    const indexColumn = positionsIndex[position][1];
    currentMove[indexRow][indexColumn] = mark;

    //INCREMENT CURRENT MOVE INDEX
    currentMoveIndex++;

    //CREATE NEW MOVE
    let newMove = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    currentMove.forEach((row, rowIndex) => {
        row.forEach((boxValue, columnIndex) => {
            newMove[rowIndex][columnIndex] = boxValue;
        });
    });

    //APPEND TO HISTORY
    history.push(newMove);

    //LOG HISTORY
    console.log(`[${ currentTurn }] : MARKS BOX ON ROW ${ +indexRow + 1 }, COLUMN ${ +indexColumn + 1 }`);
}

function detectHorizontalWin() {
    if (currentMove !== emptyBoard) {
        let horizontal = ["", "", ""];

        currentMove.forEach((row, rowIndex) => {
            row.forEach((boxValue) => {
                horizontal[rowIndex] += boxValue.toUpperCase();
            });
        });

        horizontal.join(" / ");

        if (horizontal.includes("XXX")) {
            updateScore("X");
            return true;
        } else if (horizontal.includes("OOO")) {
            updateScore("O");
            return true;
        }
        return false;
    }
    return false;
}

function detectVerticalWin() {
    if (currentMove !== emptyBoard) {
        let vertical = ["", "", ""];

        currentMove.forEach((row) => {
            row.forEach((boxValue, columnIndex) => {
                vertical[columnIndex] += boxValue.toUpperCase();
            });
        });

        vertical.join(" / ");

        if (vertical.includes("XXX")) {
            updateScore("X");
            return true;
        } else if (vertical.includes("OOO")) {
            updateScore("O");
            return true;
        }
        return false;
    }
    return false;
}

function detectDiagonalWin() {
    if (currentMove != emptyBoard) {
        const diagonalA = currentMove[0][0] + currentMove[1][1] + currentMove[2][2];
        const diagonalB = currentMove[0][2] + currentMove[1][1] + currentMove[2][0];

        if (diagonalA === ("XXX") || diagonalB === ("XXX")) {
            updateScore("X");
            return true;
        } else if (diagonalA === ("OOO") || diagonalB === ("OOO")) {
            updateScore("O");
            return true;
        }
        return false;
    }
    return false;
}

function detectDraw() {
    if (currentMove !== emptyBoard) {
        if (currentMoveIndex >= 9) {
            //PRINT ALERTS
            alert(`[GAME OVER] : IT'S A DRAW!`);
            console.log(`[GAME OVER] : IT'S A DRAW!`);

            //GAME OVER
            isGameOver = true;

            //DISPLAY HISTORY
            console.log(history);

            //RESET TURN
            changeTurn("O");

            //DISPLAY PREVIOUS AND NEXT BUTTONS
            displayButtons(true);
        }
    }
}

function updateScore(winner) {
    //PRINT ALERTS
    alert(`[GAME OVER] : ${ winner.toUpperCase() } WINS!`);
    console.log(`[GAME OVER] : ${ winner.toUpperCase() } WINS!`);

    //GET SCORE BOARD VALUE ELEMENTS
    const scoreBoardValueX = document.querySelector('.score.x .value');
    const scoreBoardValueO = document.querySelector('.score.o .value');

    //UPDATE SCORE BASED ON WINNER
    if (winner === "X") {
        scoreX++;
        scoreBoardValueX.innerHTML = `${ scoreX }`;
    } else {
        scoreO++;
        scoreBoardValueO.innerHTML = `${ scoreO }`;
    }

    //GAME OVER
    isGameOver = true;

    //DISPLAY HISTORY
    console.log(history);

    //RESET TURN
    changeTurn("O");

    //DISPLAY PREVIOUS AND NEXT BUTTONS
    displayButtons(true);
}

function changeTurn(turn = currentTurn) {
    const scoreBoardX = document.querySelector('.score.x');
    const scoreBoardO = document.querySelector('.score.o');
    scoreBoardX.classList.remove("active");
    scoreBoardO.classList.remove("active");
    if (turn === "X") {
        scoreBoardO.classList.add("active");
        currentTurn = "O";
    } else {
        scoreBoardX.classList.add("active");
        currentTurn = "X";
    }
    return currentTurn;
}

function displayButtons(shouldDisplay) {
    const previousButton = document.getElementsByClassName('previous-btn')[0];
    const nextButton = document.getElementsByClassName('next-btn')[0];
    if (shouldDisplay) {
        previousButton.style.display = "block";
        nextButton.style.display = "block";
    } else {
        previousButton.style.display = "none";
        nextButton.style.display = "none";
    }
    return shouldDisplay;
}

function updateBoard() {
    //RETRIEVE MARKS FROM CURRENT MOVE
    let marks = [];
    currentMove.forEach((row) => {
        row.forEach((boxValue) => {
            marks.push(boxValue);
        });
    });

    const boxes = document.getElementsByClassName('box');

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = marks[i];
    }
}

function mark(box, position) {
    if (!isGameOver && box.innerHTML === "") {
        //PUT A MARK ON THE BOX
        const mark = document.createTextNode(currentTurn);
        box.appendChild(mark);

        //SAVE MOVE TO HISTORY
        createMove(currentTurn, position);

        //DETECT WINS
        if (detectHorizontalWin()) {
            return true;
        } else if (detectVerticalWin()) {
            return true;
        } else if (detectDiagonalWin()) {
            return true;
        } else if (detectDraw()) {
            return true;
        }

        //UPDATE CURRENT TURN
        changeTurn();
    }
}

function previous() {
    if (isGameOver) {
        const previousButton = document.getElementsByClassName('previous-btn')[0];
        const nextButton = document.getElementsByClassName('next-btn')[0];

        //CHECK IF PREVIOUS BUTTON SHOUD BE DISABLED
        if (currentMoveIndex < 1) {
            previousButton.disabled = true;
        } else {
            //CHECK IF NEXT BUTTON SHOULD BE ENABLED
            if (currentMoveIndex === (history.length - 1)) {
                nextButton.disabled = false;
            }

            //UPDATE CURRENT MOVE
            currentMoveIndex -= 1;
            currentMove = [...history[currentMoveIndex]];

            //RECHECK IF PREVIOUS BUTTON SHOUD BE DISABLED
            if (currentMoveIndex === 0) {
                previousButton.disabled = true;
            } else {
                previousButton.disabled = false;
            }

            updateBoard();
        }
    }
}

function next() {
    if (isGameOver) {
        const previousButton = document.getElementsByClassName('previous-btn')[0];
        const nextButton = document.getElementsByClassName('next-btn')[0];

        //CHECK IF NEXT BUTTON SHOUD BE DISABLED
        if (currentMoveIndex >= (history.length - 1)) {
            nextButton.disabled = true;
        } else {
            //CHECK IF NEXT BUTTON SHOULD BE ENABLED
            if (currentMoveIndex < 1) {
                previousButton.disabled = false;
            }

            //UPDATE CURRENT MOVE
            currentMoveIndex += 1;
            currentMove = [...history[currentMoveIndex]];

            //RECHECK IF NEXT BUTTON SHOUD BE DISABLED
            if (currentMoveIndex === (history.length - 1)) {
                nextButton.disabled = true;
            } else {
                nextButton.disabled = false;
            }

            updateBoard();
        }
    }
}

function reset() {
    if (confirm("Are you sure? This will restart the game and clear all moves history, scores will remain.")) {
        //RESET GAME
        isGameOver = false;

        //CLEAR BOARD
        let boxes = document.getElementsByClassName('box');
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML = "";
        };

        //CLEAR HISTORY
        history = [
            [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]
        ];

        //RESET TURN
        changeTurn("O");

        //RESET CURRENT MOVE
        currentMove = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        //HIDE BUTTONS
        displayButtons(false);

        console.log("LET'S PLAY AGAIN!");
    }
}