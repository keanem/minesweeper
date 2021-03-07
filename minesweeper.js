document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
 var board  = createBoard(6);

 function createBoard(width) {
   var board = { 
     cells : []
   };
 
   for(var rowIndex=0; rowIndex<width; rowIndex++){
     for(var colIndex=0; colIndex<width; colIndex++){
       board.cells.push({
         row:rowIndex,
         col:colIndex,
         isMine: false,
         isMarked:false,
         hidden:true
       })
     }
   }
 
   selectMines(width, board);
   
   return board;
 }
 // This will select mines randomly according to how columns there are. for six columns there will be 6 mines. 
function selectMines(noOfMines, board) {
  var remainingCells = board.cells.slice();
  
  for(var i=0; i<noOfMines; i++) {
    var selection = Math.floor(Math.random()*remainingCells.length);
    var selectedCell = remainingCells[selection];
    selectedCell.isMine = true;

    remainingCells.splice(selection,1);
  }
} 

function startGame () {
  // Don't remove this function call: it makes the game work!
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i]["surroundingMines"] = countSurroundingMines(board.cells[i])
  }

  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var i = 0; i < board.cells.length; i++) {

    if (board.cells[i].isMine && !board.cells[i].isMarked) {
        return false;
    } 
    if (board.cells[i].hidden && !board.cells[i].isMine){
      return false;
    } 
  }

  return lib.displayMessage('You win!')
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  var counter = 0;
  for (var i = 0; i < surroundingCells.length; i++){
    if (surroundingCells[i].isMine === true) {
      counter++
    }
  }

  return counter;
}

function soundEffect() {
  var audio = document.getElementById("sound-effect");
  audio.play(); 
}

function clearCells() {
  document.getElementById('reset',location.reload())
}

