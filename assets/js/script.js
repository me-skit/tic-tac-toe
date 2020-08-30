const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

const gameplay = (() => {
  const X = 1;
  const O = 2;
  const SPOT_EMPTY = 0;
  let turn = 1;
  let ended = false;
  let scoreX = 0;
  let scoreO = 0;
  let last = X;

  const getLabel = (symbol) => {
    if (symbol === X) {
      return 'X';
    }

    return 'O';
  };

  const resetGame = (table) => {
    turn = last === X ? O : X;
    last = turn;
    ended = false;
    table.forEach((subArr) => subArr.fill(0));

    const crosses = Array.from(document.querySelectorAll('.cross'));
    crosses.forEach(cross => {
      cross.classList.add('hide');
    });

    const circles = Array.from(document.querySelectorAll('.circle'));
    circles.forEach(circle => {
      circle.classList.add('hide');
    });

    document.getElementById('p-turn').innerHTML = `Start: <b>${getLabel(turn)}</b> turn`;
    document.getElementById('btn-again').classList.add('hide');
  };

  const getTurn = () => turn;

  const switchTurn = () => {
    turn = turn === X ? O : X;
  };

  const isEnded = () => ended;

  const gameOver = () => {
    document.getElementById('btn-again').classList.remove('hide');
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

  const addScore = (symbol) => {
    if (symbol === X) {
      scoreX += 1;
      document.getElementById('score-x').textContent = scoreX;
    } else {
      scoreO += 1;
      document.getElementById('score-o').textContent = scoreO;
    }
  };

  return {
    getTurn,
    resetGame,
    switchTurn,
    isEnded,
    gameOver,
    thereIsAWinner,
    boardFilled,
    addScore,
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
          document.getElementById('p-turn').innerHTML = '<b>O</b> turn';
        } else {
          board[row][column] = gameplay.O;
          element.querySelector('.circle').classList.remove('hide');
          document.getElementById('p-turn').innerHTML = '<b>X</b> turn';
        }

        const symbol = board[row][column];
        const thereIsAwinner = gameplay.thereIsAWinner(board, row, column, symbol);
        if (thereIsAwinner || gameplay.boardFilled(board)) {
          document.getElementById('p-turn').textContent = 'Game ended: draw';
          if (thereIsAwinner) {
            gameplay.addScore(symbol);
            if (symbol === gameplay.X) {
              document.getElementById('p-turn').innerHTML = 'Game ended, winner: <b>X</b>';
            } else {
              document.getElementById('p-turn').innerHTML = 'Game ended, winner: <b>O</b>';
            }
          }
          gameplay.gameOver();
        }

        gameplay.switchTurn();
      }
    }
  });
});

document.getElementById('btn-again').addEventListener('click', () => gameplay.resetGame(board));
