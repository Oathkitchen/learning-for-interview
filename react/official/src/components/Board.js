function Square({ value, onSquareClick, isWinner }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{
        backgroundColor: isWinner ? "yellow" : "white",
        color: isWinner ? "red" : "black",
      }}
    >
      {value}
    </button>
  );
}

export default function Board({ xIsNext, squares, onPlay, winner }) {
  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  return (
    <>
      {[0, 1, 2].map((num) => {
        const start = num * 3;
        return (
          <div className="board-row" key={num}>
            {Array.from({ length: 3 }, (_, i) => {
              const index = start + i;
              return (
                <Square
                  isWinner={winner && winner[1].includes(index)}
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}
