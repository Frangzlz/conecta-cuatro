export const checkWinner = (board) => {
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

export const checkDraw = (board) => {
  return board.every((row) => {
    return row.every(circleValue => circleValue !== null)
  })
}
