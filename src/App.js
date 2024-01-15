import './App.css';
import { useState } from 'react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0, draw: 0 });

  const [player1, setPlayer1] = useState({ name: " ", symbol: 'X' });
  const [player2, setPlayer2] = useState({ name: " ", symbol: 'O' });

  const calculateWinner = (squares) => {
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
        return squares[a];
      }
    }

    return null;
  };

  const handleClick = (i) => {
    if (board[i] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[i] = isXNext ? player1.symbol : player2.symbol;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setScore((prevScore) => ({
        ...prevScore,
        [newWinner]: prevScore[newWinner] + 1,
      }));
    } else if (newBoard.every((square) => square !== null)) {
      setScore((prevScore) => ({
        ...prevScore,
        draw: prevScore.draw + 1,
      }));
    }

    setIsXNext(!isXNext);
  };

  const renderSquare = (i) => (
    <button className="button" onClick={() => handleClick(i)}>
      {board[i] || 'Press'}
    </button>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  const handleInputChange = (event, player) => {
    const { name, value } = event.target;
    if (player === 1) {
      setPlayer1((prevPlayer) => ({ ...prevPlayer, [name]: value }));
    } else {
      setPlayer2((prevPlayer) => ({ ...prevPlayer, [name]: value }));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-200 rounded">
      <div className="text-center font-bold text-2xl mb-4">
        {winner
          ? `Winner: ${winner === player1.symbol ? player1.name : player2.name}`
          : `Next player: ${isXNext ? player1.name : player2.name} (${isXNext ? player1.symbol : player2.symbol})`}
      </div>
      <div className="text-center mb-4">
        <p className="text-lg">Score:</p>
        <p>{player1.name || 'Player 1'} ({player1.symbol}): {score[player1.symbol]}</p>
        <p>{player2.name || 'Player 2'} ({player2.symbol}): {score[player2.symbol]}</p>
        <p>Draw: {score.draw}</p>
      </div>
      <div className="grid grid-rows-3 gap-2">
        {[0, 1, 2].map((row) => (
          <div key={row} className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((col) => (
              <div key={col} className="col-span-1">
                {renderSquare(row * 3 + col)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <label className="block mb-2">Player 1 Name:
          <input
            type="text"
            value={player1.name}
            onChange={(e) => handleInputChange(e, 1)}
            className="form-input mt-1"
          />
        </label>
        <label className="block mb-2">Player 2 Name:
          <input
            type="text"
            value={player2.name}
            onChange={(e) => handleInputChange(e, 2)}
            className="form-input mt-1"
          />
        </label>
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
}

export default App;
