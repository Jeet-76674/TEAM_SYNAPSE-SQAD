import { useMemo, useState } from 'react'

const maxAttempts = 7

function generateTarget() {
  return Math.floor(Math.random() * 100) + 1
}

function GuessNumber({ onBack }) {
  const [target, setTarget] = useState(generateTarget)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState('Try to guess a number between 1 and 100.')
  const [attempts, setAttempts] = useState(0)
  const [status, setStatus] = useState('playing')

  const attemptText = useMemo(
    () => `${attempts} / ${maxAttempts} attempts`,
    [attempts],
  )

  const submitGuess = event => {
    event.preventDefault()
    if (status !== 'playing') {
      return
    }

    const value = Number(guess)
    if (!value || value < 1 || value > 100) {
      setFeedback('Enter a number between 1 and 100.')
      return
    }

    const nextAttempts = attempts + 1
    setAttempts(nextAttempts)

    if (value === target) {
      setFeedback(`Nice! ${value} is correct.`)
      setStatus('won')
      return
    }

    if (nextAttempts >= maxAttempts) {
      setFeedback(`You lost. The number was ${target}.`)
      setStatus('lost')
      return
    }

    setFeedback(value < target ? 'Too low. Try again.' : 'Too high. Try again.')
    setGuess('')
  }

  const restartGame = () => {
    setTarget(generateTarget())
    setGuess('')
    setFeedback('Try to guess a number between 1 and 100.')
    setAttempts(0)
    setStatus('playing')
  }

  return (
    <section className="game-view">
      <div className="game-view-header">
        <div>
          <p className="game-category">Guess the Number</p>
          <h2 className="game-title">Beat the hidden number</h2>
          <p className="game-summary">Use hints and the attempt counter to solve the secret number.</p>
        </div>
        <div className="game-actions">
          <button className="btn btn-outline-secondary btn-sm" onClick={onBack}>
            Back to Hub
          </button>
          <button className="btn btn-primary btn-sm" onClick={restartGame}>
            Restart
          </button>
        </div>
      </div>

      <div className="status-bar">{feedback}</div>
      <form className="guess-form" onSubmit={submitGuess}>
        <label className="form-label" htmlFor="guess-input">
          Your guess
        </label>
        <div className="guess-input-row">
          <input
            id="guess-input"
            className="form-control"
            type="number"
            min="1"
            max="100"
            value={guess}
            onChange={e => setGuess(e.target.value)}
            disabled={status !== 'playing'}
          />
          <button className="btn btn-success" type="submit" disabled={status !== 'playing'}>
            Guess
          </button>
        </div>
      </form>
      <div className="attempt-info">{attemptText}</div>
      <div className="game-footer">
        <button className="btn btn-outline-primary" onClick={restartGame}>
          {status === 'playing' ? 'Reset' : 'Play Again'}
        </button>
      </div>
    </section>
  )
}

export default GuessNumber
