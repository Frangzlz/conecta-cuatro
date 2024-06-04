import { useState } from 'react'
import './App.css'

const TURNS = {
  player1: '🔴',
  player2: '🟡'
}

const Circle = ({ children, updateBoard, i, j }) => {
  const handleClick = () => {
    // console.log(i, j)
    updateBoard(i, j)
  }

  return (
    <span className='circle' onClick={handleClick}>
      {children}
    </span>
  )
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

  const checkWinner = (board) => {
    const checkDirection = (row, col, rowDir, colDir) => {
      const player = board[row][col]
      if (!player) return null

      for (let i = 1; i < 4; i++) {
        const newRow = row + i * rowDir
        const newCol = col + i * colDir

        if (
          newRow < 0 ||
          newRow >= board.length ||
          newCol < 0 ||
          newCol >= board[0].length ||
          board[newRow][newCol] !== player
        ) {
          return null
        }
      }
      return player
    }

    for (let row = 0; row < board.length; row++) {
      for (let column = 0; column < board[0].length; column++) {
        if (
          checkDirection(row, column, 1, 0) || // Vertical
          checkDirection(row, column, 0, 1) || // Horizontal
          checkDirection(row, column, 1, 1) || // Diagonal descendente
          checkDirection(row, column, 1, -1) // Diagonal ascendente
        ) {
          return board[row][column]
        }
      }
    }
    return null
  }

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

    const winner = checkWinner(newBoard)
    if (winner) {
      alert('Ganador')
    }
  }

  return (
    <>
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
                        <Circle key={j} updateBoard={updateBoard} i={i} j={j}>
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
      {
        turn
      }
    </>
  )
}

export default App
