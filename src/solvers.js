/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

/////

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {

  var solutionArray = [];
  var rowArray;

  var newFilledArray = function  (value, end) {
    var newArray = [];
    for ( var i = 0; i < end; i++) {
      newArray[i] = value;
    }
    return newArray;
  }

  for ( var row = 0; row < n; row++) {
    rowArray = newFilledArray(0, n);
    rowArray[row] = 1
    solutionArray.push(rowArray);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutionArray));
  return solutionArray;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var f = [];
  function factorial (n) {
    if (n == 0 || n == 1)
      return 1;
    if (f[n] > 0)
      return f[n];
    return f[n] = factorial(n-1) * n;
  }

  var solutionCount = factorial(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

window.cloneMatrix = function (matrix) {
  // body...
  var newMatrix = [];
  for (var i = 0; i < matrix.length; i++) {
    newMatrix.push(matrix[i].slice());
  };
  return newMatrix;
}

window.cloneBoard = function  (board) {
  return new Board(cloneMatrix(board.rows()));
};

window.createDeadBoard = function(n) {
  var deadBoard = [];
  var emptyRow = [];
  for (var i = 0; i < n; i++) {
    emptyRow[i] = 0;
  };
  for (i = 0; i < n; i++) {
    deadBoard.push(emptyRow.slice());
  };
  return deadBoard;
}


window.placeNQueens = function (n, solutions, theBoard, deadBoard) {

  solutions = solutions || {};
  theBoard = theBoard || new Board({'n':n});

  if (!deadBoard) {
    deadBoard = createDeadBoard(n);
  }

  if(n===0) {
    var key = JSON.stringify(theBoard.rows());
    solutions[key] = theBoard.rows();
  } else {
    for (var row = 0; row < theBoard.get('n'); row++) {
      for (var col = 0; col < theBoard.get('n'); col++) {

        if (deadBoard[row][col] === 0 ) {
          var newBoard = cloneBoard(theBoard);
          var newdeadBoard = cloneMatrix(deadBoard);

          if (attemptToPlaceQueen(newBoard, row, col, newdeadBoard)) {
            placeNQueens(n - 1 , solutions, newBoard, newdeadBoard);
          }
        }
      }
    }
  }
  return solutions;
};

window.markRowDead = function(row, deadBoard) {
  for (var i = 0; i < deadBoard[row].length ; i++) {
    deadBoard[row][i] = 1;
  }
};

window.markColumnDead = function(column, deadBoard) {
  for (var i = 0; i < deadBoard.length ; i++) {
    deadBoard[i][column] = 1;
  }
};

window.getMajorDiagonalIndex = function(rowIndex, colIndex) {
  return colIndex - rowIndex;
};

window.getMinorDiagonalIndex = function(rowIndex, colIndex) {
  return colIndex + rowIndex;
};

window.markMajorDiagonalDead = function(rowAt, columnAt, deadBoard) {
  var column = getMajorDiagonalIndex(row, column);

  for (var row = 0; row < deadBoard.length; row++, column++) {
    deadBoard[row][column] = 1;
  }

};

window.markMinorDiagonalDead = function(row, column, deadBoard) {
  var column = getMinorDiagonalIndex(row, column);

  for (var row = 0; row < deadBoard.length; row++, column--) {
    if ( column < deadBoard.length) {
      deadBoard[row][column] = 1;
    }
  }
};

window.attemptToPlaceQueen = function(theBoard, row, col, deadBoard) {
  if (theBoard.get(row)[col] === 0) {
    theBoard.togglePiece(row, col);
    if(theBoard.hasAnyQueenConflictsOn(row, col)) {
      theBoard.togglePiece(row, col);
      return false;
    } else {
      markRowDead(row, deadBoard);
      markColumnDead(col, deadBoard);
      markMajorDiagonalDead(row, col, deadBoard);
      markMinorDiagonalDead(row, col, deadBoard);
      return true;
    }
  } else {
    return false;
  }
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutions;

  solutions = placeNQueens(n);

  var solutionCount = Object.keys(solutions).length; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


