import { useState } from 'react'
import { Circle } from './components/Circle.jsx'
import { Modal } from './components/Modal.jsx'
import { checkWinner, checkDraw } from './logic/board.js'
import './App.css'

const TURNS = {
  player1: '🔴',
  player2: '🟡'
}

function App () {
  const [board, setBoard] = useState([
    Array(7).fill(null),
    Array(7).fill(null),
    Array(7).fill(null),
    Array(7).fill(null),
    Array(7).fill(null),
    Array(7).fill(null)
  ])

  const [turn, setTurn] = useState(TURNS.player1)
  const [winner, setWinner] = useState(null)

  const updateBoard = (i, j) => {
    if (board[i][j]) return
    const newBoard = [...board]

    for (let r1 = 5; r1 >= 0; r1--) {
      if (board[r1][j] == null) {
        newBoard[r1][j] = turn
        setBoard(newBoard)
        break
      }
    }

    const newTurn = turn === TURNS.player1 ? TURNS.player2 : TURNS.player1
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkDraw(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard([
      Array(7).fill(null),
      Array(7).fill(null),
      Array(7).fill(null),
      Array(7).fill(null),
      Array(7).fill(null),
      Array(7).fill(null)
    ])
    setTurn(TURNS.player1)
    setWinner(null)
  }

  return (
    <main className='board-container'>
      <h1>Conecta 4</h1>
      <section className='board'>
        <div className='container'>
          {
            board.map((rows, i) => {
              return (
                <div key={i} className='rows'>
                  {
                    rows.map((columns, j) => {
                      return (
                        <Circle
                          key={`${i}` + j}
                          updateBoard={updateBoard}
                          value={columns}
                          i={i}
                          j={j}
                        >
                          {columns}
                        </Circle>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </section>

      <section className='turns'>
        <h2>Turno: {turn}</h2>
      </section>

      <button onClick={resetGame} className='btn'>Volver a jugar</button>

      {
        winner !== null && (
          <Modal>
            <h2>
              {
                winner === false
                  ? 'Empate'
                  : 'Ganador:'
              }
            </h2>
            <div>
              {winner && <Circle modal>{winner}</Circle>}
            </div>
            <div>
              <button onClick={resetGame} className='btn'>Volver a jugar</button>
            </div>
          </Modal>
        )
      }
    </main>
  )
}

export default App
