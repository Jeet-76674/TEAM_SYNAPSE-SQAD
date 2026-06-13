import { useEffect, useRef, useState } from 'react'

const icons = ['⚡', '🌙', '🍀', '🔥', '🎲', '🍎', '🎯', '💎']

function shuffleCards() {
  const doubled = [...icons, ...icons].map((value, index) => ({
    id: `${value}-${index}`,
    value,
    flipped: false,
    matched: false,
  }))
  return doubled.sort(() => Math.random() - 0.5)
}

function MemoryGame({ onBack }) {
  const [cards, setCards] = useState(shuffleCards)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [moves, setMoves] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const timeoutRef = useRef(null)

  const hasWon = cards.every(card => card.matched)

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setIsChecking(true)
      if (firstChoice.value === secondChoice.value) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.value === firstChoice.value
              ? { ...card, matched: true }
              : card,
          ),
        )
        resetTurn()
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstChoice.id || card.id === secondChoice.id
                ? { ...card, flipped: false }
                : card,
            ),
          )
          resetTurn()
        }, 900)
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [firstChoice, secondChoice])

  const handleCardClick = card => {
    if (
      isChecking ||
      card.flipped ||
      card.matched ||
      (firstChoice && firstChoice.id === card.id)
    ) {
      return
    }

    setCards(prev =>
      prev.map(item =>
        item.id === card.id ? { ...item, flipped: true } : item,
      ),
    )

    if (!firstChoice) {
      setFirstChoice(card)
      return
    }

    setSecondChoice(card)
    setMoves(prev => prev + 1)
  }

  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setIsChecking(false)
    timeoutRef.current = null
  }

  const restartGame = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setCards(shuffleCards())
    setMoves(0)
    resetTurn()
  }

  return (
    <section className="game-view">
      <div className="game-view-header">
        <div>
          <p className="game-category">Memory Game</p>
          <h2 className="game-title">Match pairs before time runs out</h2>
          <p className="game-summary">Flip cards and find all the matching pairs in as few moves as possible.</p>
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

      <div className="status-bar">
        Moves: {moves} · {hasWon ? 'You matched all cards!' : 'Find every pair'}
      </div>

      <div className="memory-grid">
        {cards.map(card => (
          <button
            key={card.id}
            type="button"
            className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            <span className="card-front">?</span>
            <span className="card-back">{card.value}</span>
          </button>
        ))}
      </div>

      <div className="game-footer">
        <button className="btn btn-outline-primary" onClick={restartGame}>
          {hasWon ? 'Play Again' : 'Restart Game'}
        </button>
      </div>
    </section>
  )
}

export default MemoryGame
