import { useState } from 'react'

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function calculateWinner(board) {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

function TicTacToe({ onBack }) {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [winner, setWinner] = useState(null)
  const [isDraw, setIsDraw] = useState(false)

  const handleCellClick = index => {
    if (board[index] || winner || isDraw) {
      return
    }

    const nextBoard = [...board]
    nextBoard[index] = currentPlayer
    setBoard(nextBoard)

    const nextWinner = calculateWinner(nextBoard)
    if (nextWinner) {
      setWinner(nextWinner)
      return
    }

    if (nextBoard.every(Boolean)) {
      setIsDraw(true)
      return
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
    setIsDraw(false)
  }

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? 'Draw!'
    : `Next turn: ${currentPlayer}`

  return (
    <section className="game-view">
      <div className="game-view-header">
        <div>
          <p className="game-category">Tic Tac Toe</p>
          <h2 className="game-title">Classic two-player grid</h2>
          <p className="game-summary">Player X and O alternate, with winner and draw detection.</p>
        </div>
        <div className="game-actions">
          <button className="btn btn-outline-secondary btn-sm" onClick={onBack}>
            Back to Hub
          </button>
          <button className="btn btn-primary btn-sm" onClick={resetGame}>
            Restart
          </button>
        </div>
      </div>

      <div className="status-bar">{status}</div>
      <div className="tic-grid">
        {board.map((cell, index) => (
          <button
            key={index}
            type="button"
            className="tic-cell btn btn-light"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="game-footer">
        <button className="btn btn-outline-primary" onClick={resetGame}>
          Play Again
        </button>
      </div>
    </section>
  )
}

export default TicTacToe
