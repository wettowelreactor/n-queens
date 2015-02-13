var nqueens = {};

nqueens.cloneDeadBoard = function (deadBoard) {
  return {'cols': deadBoard.cols,
    'majorDiags': deadBoard.majorDiags,
    'minorDiags': deadBoard.minorDiags
  };
}

nqueens.createDeadBoard = function(n) {
  return {'cols': 0, 'majorDiags': 0, 'minorDiags': 0};
};


nqueens.placeNQueens = function (n, size, deadBoard) {
  var count = 0;
  size = size || n;

  // theBoard = theBoard || new Board({'n':n});
  if (!deadBoard) {
    deadBoard = nqueens.createDeadBoard(n);
  }

  if(n===0) {
    return 1;
  } else {
    var row = size - n;
    for (var col = 0; col < size; col++) {
      if (nqueens.validPosition(row, col, size, deadBoard)){
        var newDeadBoard = nqueens.cloneDeadBoard(deadBoard);
        nqueens.placeQueen(row, col, size, newDeadBoard);
        count += nqueens.placeNQueens(n - 1 , size, newDeadBoard);
      }
    }
  }
  return count;
};

nqueens.validPosition = function(row, col, size, deadBoard) {
  var majorDiagIndex = nqueens.getMajorDiagonalIndex(row, col, size);
  var minorDiagIndex = nqueens.getMinorDiagonalIndex(row, col);
  var colMask = Math.pow(2, col);
  var majorDiagMask = Math.pow(2, majorDiagIndex);
  var minorDiagMask = Math.pow(2, minorDiagIndex);
  var colValid = (~deadBoard.cols) & colMask;
  var majorDiagValid = (~deadBoard.majorDiags) & majorDiagMask;
  var minorDiagValid = (~deadBoard.minorDiags) & minorDiagMask;

  return colValid && majorDiagValid && minorDiagValid;
};

nqueens.markColumnDead = function(column, deadBoard) {
  var mask = Math.pow(2, column);
  deadBoard.cols |= mask;
};

nqueens.getMajorDiagonalIndex = function(rowIndex, colIndex, size) {
  return colIndex - rowIndex + size;
};

nqueens.getMinorDiagonalIndex = function(rowIndex, colIndex) {
  return colIndex + rowIndex;
};

nqueens.markMajorDiagonalDead = function(rowAt, columnAt, deadBoard, size) {
  var column = nqueens.getMajorDiagonalIndex(rowAt, columnAt, size);

  var mask = Math.pow(2, column);
  deadBoard.majorDiags |= mask;

};

nqueens.markMinorDiagonalDead = function(rowAt, columnAt, deadBoard) {
  var column = nqueens.getMinorDiagonalIndex(rowAt, columnAt);

  var mask = Math.pow(2, column);
  deadBoard.minorDiags |= mask;
};

nqueens.placeQueen = function(row, col, size, deadBoard) {
  nqueens.markColumnDead(col, deadBoard);
  nqueens.markMajorDiagonalDead(row, col, deadBoard, size);
  nqueens.markMinorDiagonalDead(row, col, deadBoard);
};
