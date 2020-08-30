const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

const gameplay = (() => {
  const X = 1;
  const O = 2;
  const SPOT_EMPTY = 0;
  let turn = 1;
  let ended = false;

  const resetTurn = () => {
    turn = X;
  };

  const getTurn = () => turn;

  const switchTurn = () => {
    turn = turn === X ? O : X;
  };

  const isEnded = () => ended;

  const gameOver = () => {
    ended = true;
  };

  const thereIsAWinner = (table, row, column, symbol) => {
    // check for the row in the given "row, column"
    if (table[row].every((spot) => spot === symbol)) {
      return true;
    }
    // check for the column in the given "row, column"
    if ((table[0][column] === symbol)
        && (table[1][column] === symbol)
        && (table[2][column] === symbol)) {
      return true;
    }

    // check diagonals
    if (table[1][1] === symbol) {
      if ((table[0][0] === symbol && table[2][2] === symbol)
        || (table[0][2] === symbol && table[2][0] === symbol)) {
        return true;
      }
    }

    return false;
  };

  const boardFilled = (table) => table.every((subArr) => subArr.every((spot) => spot !== 0));

  return {
    getTurn,
    resetTurn,
    switchTurn,
    isEnded,
    gameOver,
    thereIsAWinner,
    boardFilled,
    X,
    O,
    SPOT_EMPTY,
  };
})();

const squares = Array.from(document.querySelectorAll('.square'));
squares.forEach((element) => {
  element.addEventListener('click', () => {
    if (!gameplay.isEnded()) {
      const row = Number(element.dataset.row);
      const column = Number(element.dataset.column);
      if (board[row][column] === gameplay.SPOT_EMPTY) {
        if (gameplay.getTurn() === gameplay.X) {
          board[row][column] = gameplay.X;
          element.querySelector('.cross').classList.remove('hide');
        } else {
          board[row][column] = gameplay.O;
          element.querySelector('.circle').classList.remove('hide');
        }

        if (gameplay.thereIsAWinner(board, row, column, board[row][column])
            || gameplay.boardFilled(board)) {
          document.getElementById('p-turn').textContent = 'Game ended';
          gameplay.gameOver();
        }

        gameplay.switchTurn();
        //console.table(board);
      }
    }
  });
});
