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
  };

  for ( var row = 0; row < n; row++) {
    rowArray = newFilledArray(0, n);
    rowArray[row] = 1;
    solutionArray.push(rowArray);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutionArray));
  return solutionArray;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var f = [];
  function factorial (n) {
    if (n === 0 || n == 1)
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
  var solutions = placeNQueens(n);
  var solution;
  if (n === 2 || n === 3) {
    var empty = []
    solution = [];
    for (var i = 0; i < n; i++) {
      solution.push(empty);
    };
  } else {
    var solution = solutions[Object.keys(solutions)[0]];
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

window.cloneMatrix = function (matrix) {
  // body...
  var newMatrix = [];
  for (var i = 0; i < matrix.length; i++) {
    newMatrix.push(matrix[i].slice());
  }
  return newMatrix;
};

window.cloneBoard = function  (board) {
  return new Board(cloneMatrix(board.rows()));
};

window.cloneDeadBoard = function (deadBoard) {

  return {'cols': deadBoard.cols,
    'majorDiags': deadBoard.majorDiags,
    'minorDiags': deadBoard.minorDiags
  };
}

window.createDeadBoard = function(n) {
  return {'cols': 0, 'majorDiags': 0, 'minorDiags': 0};
};


window.placeNQueens = function (n, size, deadBoard) {
  var count = 0;
  size = size || n;

  // theBoard = theBoard || new Board({'n':n});
  if (!deadBoard) {
    deadBoard = createDeadBoard(n);
  }

  if(n===0) {
    return 1;
  } else {
    var row = size - n;
    for (var col = 0; col < size; col++) {

      var majorDiagIndex = getMajorDiagonalIndex(row, col, size);
      var minorDiagIndex = getMinorDiagonalIndex(row, col);

      var colMask = Math.pow(2, col);
      var majorDiagMask = Math.pow(2, majorDiagIndex);
      var minorDiagMask = Math.pow(2, minorDiagIndex);


      if ( ((~deadBoard.cols) & colMask) &&
              ((~deadBoard.majorDiags) & majorDiagMask) &&
              ((~deadBoard.minorDiags) & minorDiagMask) ){

        var newDeadBoard = cloneDeadBoard(deadBoard);

        placeQueen(row, col, size, newDeadBoard);
        count += placeNQueens(n - 1 , size, newDeadBoard);
      }
    }
  }
  return count;
};

window.markColumnDead = function(column, deadBoard) {
  var mask = Math.pow(2, column);
  deadBoard.cols |= mask;
};

window.getMajorDiagonalIndex = function(rowIndex, colIndex, size) {
  return colIndex - rowIndex + size;
};

window.getMinorDiagonalIndex = function(rowIndex, colIndex) {
  return colIndex + rowIndex;
};

window.markMajorDiagonalDead = function(rowAt, columnAt, deadBoard, size) {
  var column = getMajorDiagonalIndex(rowAt, columnAt, size);

  var mask = Math.pow(2, column);
  deadBoard.majorDiags |= mask;

};

window.markMinorDiagonalDead = function(rowAt, columnAt, deadBoard) {
  var column = getMinorDiagonalIndex(rowAt, columnAt);

  var mask = Math.pow(2, column);
  deadBoard.minorDiags |= mask;
};

window.placeQueen = function(row, col, size, deadBoard) {
  markColumnDead(col, deadBoard);
  markMajorDiagonalDead(row, col, deadBoard, size);
  markMinorDiagonalDead(row, col, deadBoard);
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = placeNQueens(n);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


