import { useEffect, useState } from 'react'
import './App.css'
import TicTacToe from './components/TicTacToe'
import MemoryGame from './components/MemoryGame'
import GuessNumber from './components/GuessNumber'

const gameConfig = [
  {
    id: 'tic-tac-toe',
    name: 'Tic Tac Toe',
    description: 'Classic two-player grid game with winner and draw detection.',
  },
  {
    id: 'memory',
    name: 'Memory Game',
    description: 'Match the cards and find all the pairs in the shortest time.',
  },
  {
    id: 'guess-number',
    name: 'Guess the Number',
    description: 'Guess the hidden number with hints and limited attempts.',
  },
]

function App() {
  const [activeGame, setActiveGame] = useState(null)
  const [theme, setTheme] = useState(() => {
    return window.localStorage.getItem('lounge-theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('lounge-theme', theme)
  }, [theme])

  const renderGame = () => {
    if (activeGame === 'tic-tac-toe') {
      return <TicTacToe onBack={() => setActiveGame(null)} />
    }
    if (activeGame === 'memory') {
      return <MemoryGame onBack={() => setActiveGame(null)} />
    }
    if (activeGame === 'guess-number') {
      return <GuessNumber onBack={() => setActiveGame(null)} />
    }
    return null
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Luxe Game Lounge</p>
          <h1>Play multiple mini-games in one place</h1>
          <p className="app-intro">
            Enjoy a clean hub experience with Tic Tac Toe, Memory Game, and Guess the Number.
          </p>
        </div>
        <div className="app-header-actions">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm theme-toggle"
            onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </header>

      {activeGame ? (
        <main>{renderGame()}</main>
      ) : (
        <main className="game-hub">
          <div className="hub-intro card shadow-sm">
            <h2>Game Hub</h2>
            <p>
              Choose a game card to start playing. Each game supports restart options, score feedback, and mobile-friendly controls.
            </p>
          </div>

          <section className="game-grid">
            {gameConfig.map(({ id, name, description }) => (
              <article key={id} className="game-card card shadow-sm">
                <div className="card-body">
                  <span className="card-label">{name}</span>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
                <div className="card-footer">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={() => setActiveGame(id)}
                  >
                    Play
                  </button>
                </div>
              </article>
            ))}
          </section>
        </main>
      )}
    </div>
  )
}

export default App
