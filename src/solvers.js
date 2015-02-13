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
  var solutions = nqueens.placeNQueens(n);
  var solution;
  if (n === 2 || n === 3) {
    var empty = [];
    solution = [];
    for (var i = 0; i < n; i++) {
      solution.push(empty);
    }
  } else {
    solution = solutions[Object.keys(solutions)[0]];
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = nqueens.placeNQueens(n);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


