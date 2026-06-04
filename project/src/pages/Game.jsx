import Board from "../components/Board";
import { useState, useEffect } from "react";
import "../styles/Game.css";

function addRandomTile(tiles) {
    const emptyTiles = [];

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (tiles.row[col] === 0) {
                emptyTiles.push([row, col]);
            }
        }
    }

    if (emptyTiles.length === 0) return tiles;

    const [row, col] =
        emptyTiles[Math.floor(Math.random() * emptyTiles.length)];

    const newTiles = tiles.map((r) => [...r]);
    newTiles[row][col] = Math.random() < 0.9 ? 2 : 4;

    return newTiles;
}

function createStartingBoard() {
    let tiles = [];
    tiles = addRandomTile(tiles);
    tiles = addRandomTile(tiles);
    return tiles;
}

function boardsAreEqual(boardA, boardB) {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (boardA[row][col] !== boardB[row][col]) {
                return false;
            }
        }
    }

    return true;
}

function slideAndMergeRowLeft(row) {
    const filteredRow = row.filter((value) => value !== 0);
    const mergedRow = [];

    for (let i = 0; i < filteredRow.length; i++) {
        if (filteredRow[i] === filteredRow[i + 1]) {
            mergedRow.push(filteredRow[i] * 2);
            i++;
        } else {
            mergedRow.push(filteredRow[i]);
        }
    }

    while (mergedRow.length < 4) {
        mergedRow.push(0);
    }

    return mergedRow;
}

function moveLeft(board) {
    return board.map((row) => slideAndMergeRowLeft(row));
}

function moveRight(board) {
    return board.map((row) =>
        slideAndMergeRowLeft([...row].reverse()).reverse()
    );
}

function transpose(board) {
    return board[0].map((_, colIndex) =>
        board.map((row) => row[colIndex])
    );
}

function moveUp(board) {
    const transposed = transpose(board);
    const moved = transposed.map((row) => slideAndMergeRowLeft(row));
    return transpose(moved);
}

function moveDown(board) {
    const transposed = transpose(board);
    const moved = transposed.map((row) =>
        slideAndMergeRowLeft([...row].reverse()).reverse()
    );
    return transpose(moved);
}

function Game() {

    const [tiles, setTiles] = useState(createStartingBoard());

    function resetGame() {
        setTiles(createStartingBoard());
    }

    useEffect(() => {
        function handleKeyDown(event) {
            let nextBoard;

            switch (event.key) {
                case "ArrowLeft":
                    nextBoard = moveLeft(board);
                    break;
                case "ArrowRight":
                    nextBoard = moveRight(board);
                    break;
                case "ArrowUp":
                    nextBoard = moveUp(board);
                    break;
                case "ArrowDown":
                    nextBoard = moveDown(board);
                    break;
                default:
                    return;
            }

            if (!boardsAreEqual(board, nextBoard)) {
                setBoard(addRandomTile(nextBoard));
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [board]);

    return (
        <div className="game">
            <h1>2048</h1>
            <button onClick={resetGame}>Restart</button>

            <div className="board">
                {board.flat().map((value, index) => (
                    <div
                        key={index}
                        className={`cell ${value !== 0 ? `tile-${value}` : ""}`}
                    >
                        {value !== 0 ? value : ""}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Game;