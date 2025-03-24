const board = document.getElementById("chessboard");

// Chess pieces (Unicode symbols)
const pieces = {
    r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟", //Black
    R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙" //White
};

// Chessboard setup (FEN-style notation)
let chessBoard = [
    ["R","N","B","Q","K","B","N","R"], // White
    ["P","P","P","P","P","P","P","P"], // White
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["p","p","p","p","p","p","p","p"], // Black
    ["r","n","b","q","k","b","n","r"] // Black
];

let selectedPiece = null;
let turn = "white"; // White moves first

function handleMove(row, col) {
    let piece = chessBoard[row][col];

    // Deselect if clicking the same piece again
    if (selectedPiece && selectedPiece.row === row && selectedPiece.col === col) {
        selectedPiece = null;
        drawBoard();
        return;
    }

    // Select a piece
    if (!selectedPiece && piece && isCurrentTurn(piece)) {
        selectedPiece = { row, col, piece };
        console.log(`Selected ${piece} at (${row}, ${col})`);
    } 
    // Move the selected piece
    else if (selectedPiece) {
        if (isValidMove(selectedPiece, row, col)) {
            chessBoard[row][col] = selectedPiece.piece;
            chessBoard[selectedPiece.row][selectedPiece.col] = "";
            turn = turn === "white" ? "black" : "white"; // Switch turns
        }
        selectedPiece = null;
    }

    drawBoard(); // Redraw board with updated selection
}

// Modify drawBoard() to highlight selected square
function drawBoard() {
    board.innerHTML = "";
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square", (row + col) % 2 === 0 ? "light" : "dark");
            square.dataset.row = row;
            square.dataset.col = col;

            let piece = chessBoard[row][col];
            if (piece) {
                square.textContent = pieces[piece]; // Display piece
            }

            // Highlight selected square
            if (selectedPiece && selectedPiece.row === row && selectedPiece.col === col) {
                square.classList.add("selected");
            }

            square.addEventListener("click", () => handleMove(row, col));
            board.appendChild(square);
        }
    }
}

// Check if it's the correct turn
function isCurrentTurn(piece) {
    return (turn === "white" && piece === piece.toUpperCase()) || 
           (turn === "black" && piece === piece.toLowerCase());
}

// Simple move validation (only allows any piece to move anywhere for now)
function isValidMove(selected, row, col) {
    return true; // Add real move rules here
}

// Initialize the board
drawBoard();
