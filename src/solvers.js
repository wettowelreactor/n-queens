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

window.cloneBoard = function  (board) {
  // body...
  var oldMatrix = board.rows();
  var newMatrix = [];
  for (var i = 0; i < oldMatrix.length; i++) {
    newMatrix.push(oldMatrix[i].slice());
  };
  return new Board(newMatrix);
};

window.placeNQueens = function (n, solutions, theBoard) {

  solutions = solutions || {};
  theBoard = theBoard || new Board({'n':n});

  if(n===0) {
    var key = JSON.stringify(theBoard.rows());
    solutions[key] = theBoard.rows();
  } else {
    for (var row = 0; row < theBoard.get('n'); row++) {
      /// right here

      for (var col = 0; col < theBoard.get('n'); col++) {
        var newBoard = cloneBoard(theBoard);

        if (attemptToPlaceQueen(newBoard, row, col) ) {
          placeNQueens(n - 1 , solutions, newBoard );
        }
      }
    }
  }
  return solutions;
};

window.attemptToPlaceQueen = function(theBoard, row, col) {
  if (theBoard.get(row)[col] === 0) {
    theBoard.togglePiece(row, col);
    if(theBoard.hasAnyQueenConflictsOn(row, col)) {
      theBoard.togglePiece(row, col);
      return false;
    } else {
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


