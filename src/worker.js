importScripts('nqueens.js');
onmessage = function(e) {
  var subCount = 0;
  subCount = nqueens.placeNQueens(e.data[0], e.data[1], e.data[2]);
  console.log('Posting message back to main script', subCount);
  postMessage(subCount);
};
