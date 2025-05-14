import { useState } from "react";
import Board from "./components/Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true); // 新增状态变量
  const [moveStep, setMoveStep] = useState(new Map()) // 新增状态变量，记录每一步的点击位置

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winner = calculateWinner(currentSquares);

  function handlePlay(nextSquares, i) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setMoveStep(new Map(moveStep.set(nextHistory.length - 1, i + 1))) // 更新每一步的点击位置
    
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    // 把 step （0,1,2,3）转成（row, col）
    const step = moveStep.get(move);
    const row = Math.ceil(step / 3);
    const col = step % 3 === 0 ? 3 : step % 3;
    if (move > 0) {
      description = `Go to move # ${move} (Square: ${row} ${col})`;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : [...moves].reverse(); // 根据排序状态调整顺序

  let status;
  if (winner) {
    status = "Winner: " + winner[0];
    // 平局
  } else if (currentMove === 9) {
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winner={winner}
        />
      </div>
      <div className="game-info">
        <button onClick={() => setIsAscending(!isAscending)}>
          Toggle Order ({isAscending ? "Ascending" : "Descending"})
        </button>
        <ol>
          {sortedMoves}
          {!winner && <li>You are at move #{currentMove}</li>}
        </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return null;
}
