/* Name: Kaylin Ridge
CS Username: kridge
Email: kaylin_ridge@student.uml.edu
Date of Creation: 3 December 2020
Date of Upload: 16 December 2020 (USING ONE DAY EXTENSION TOKEN)
GUI Programming I Autumn 2020 (91.61)
Description: The main purpose of this assignment was to get
more practice with javascript.

The following features have been implemented:
// [X] Have main set of scrabble tiles using given
// json file. Randomly select 7 tiles for a hand. (4)
// [X] Make letter tiles drag-and-droppable
// onto Scrabble squares (4)
// [X] Program can tell which letter tile is placed
// on which square (4)
// [X] At least two bonus squares (4)
// [X] Score calculation, including bonus (4)
// [X] Player can play as many words as they want
// until they hit the reset button or quit (3)
// [X] Board clears after each round (3)
// [X] Program gives player appropriate number of
// tiles to make hand have seven tiles again (3)
// [X] Score kept cumulatively until reset (3)
// [X] Tiles can only be dragged from rack to
// board - dragging elsewhere will return to rack (2)
// [X] Tile cannot be moved once placed on board (2)
// [X] Every letter after first must be placed directly
// adjacent to another letter, otherwise will return
// to rack (2)
// [X] Can always restart game (2)

Features not implemented:
Dictionary check (exta credit)
Full board (extra credit)

Additional feature(s):
Game displays user's current word while they play

/* References used:
To understand arrays in JS: https://www.w3schools.com/js/js_arrays.asp
To understand random in JS: https://www.w3schools.com/jsref/jsref_random.asp
To understand drag & drop with JS: https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js
To understand for each in JS: https://www.w3schools.com/jsref/jsref_forEach.asp
More drag and drop: https://www.youtube.com/watch?v=C22hQKE_32c
Getting element by id: https://www.w3schools.com/jsref/met_document_getelementbyid.asp
Inner HTML property: https://www.w3schools.com/jsref/prop_html_innerhtml.asp
More info on Drag and Drop: https://www.elated.com/res/File/articles/development/javascript/jquery/drag-and-drop-with-jquery-your-essential-guide/card-game.html
*/

// ARRAY FROM GIVEN FILE IN .ZIP FROM BLACKBOARD:
/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on November 21, 2015 at 10:27 AM
 *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
 *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
 */
let ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 1  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;
// "creator":"Ramon Meza" (of above)

// For character on tile currently be dragged
let currentdragcharacter;

// All letters of alphabet + blank character
let alphabet = "abcdefghijklmnopqrstuvwxyz_";

// Initialize score variables.
let currentScore = 0;   // Running total
let wordScore = 0;      // Score of ONLY current word

// dictionary
let dictionary = [];
// Variable to keep track of number of letter tiles left
// to be dealt to player before game ends- should be 100
// tiles total. Will decrease by 7 when first hand is
// dealt (will seem instant to player).
let tilesLeft = 100;

// Double word: determines if word value
// will be doubled. Set to false by default, will
// change to true if tile is placed on doubleWord space.
let doubleWord = false;

// Create string for and data structure (array) to hold
// the word from the current turn. Will start with empty spaces.
// Giving the array seven spaces, which is the maximum
// number of letters per word for this implementation of
// the game.
let turnWord = "";
let turnWordArray = ["", "", "", "", "", "", ""];

// Board array, represents letters in the board
let board= ["", "", "", "", "", "", ""];
// Array for player's hand- starts empty, will fill
let hand = [];

start();

// Start function: Should run when page is loaded/reloaded,
// and then continuously.
function start(){
    console.log("START FUNCTION CALLED");
    // Function to deal tiles
    dealTiles();
}

// Check reset button for button press - if pressed, call resetGame
document.getElementById("btnReset").addEventListener("click", function() {
  resetGame();
});

// ResetGame function:
// Resets scores to 0, resets tilesLeft to 100,
// resets doubleWord to false, clears array for hand,
// turnWord (current word) and turnWordArray (array of letters
// that make up the current word), and then calls clearTable
// and start functions.
// Referenced: https://www.w3schools.com/js/js_arrays.asp
function resetGame() {
    console.log("RESET FUNCTION CALLED");
    wordScore = 0;
    currentScore = 0;
    tilesLeft = 100;
    document.getElementById("tilesLeft").innerHTML = tilesLeft
    document.getElementById("currWord").innerHTML = ""
    document.getElementById("exist").innerHTML = ""
    doubleWord = false;
    hand = [];
    turnWord = "";
    board= ["", "", "", "", "", "", ""]
    turnWordArray = ["", "", "", "", "", "", ""];
    document.getElementById("turnWord").innerHTML = "NULL"
    let ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 1  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    clearTable();
    start();
}

// Function to deal tiles to player.
// Randomly chooses neededTiles tiles to add to the
// player's hand, and then subtracts neededTiles from
// tilesLeft, then resets neededTiles to 0. neededTiles
// is the number of tiles that a player needs to be dealt
// for their number of tiles to equal 7.
// Referenced: https://www.w3schools.com/jsref/jsref_random.asp
// https://www.w3schools.com/js/js_arrays.asp
function dealTiles() {
    console.log("DEAL TILES CALLED");
    let currentletter;
    // Player should have hand of seven tiles-
    // randomly chooses letter from alphabet, decreases number remaining
    // by one for that letter in the associative array. Pushes
    // randomly chosen letter to the hand of the player.
    complete = false;
    while (!complete) {
        currentletter = alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
        console.log("letter", currentletter, "left:", ScrabbleTiles[currentletter]["number-remaining"]);
        if (ScrabbleTiles[currentletter]["number-remaining"] == 0){
            console.log(currentletter.toLowerCase());
            alphabet = alphabet.replace(currentletter.toLowerCase(), "");
        } else {
            if (tilesLeft <= 0){
                complete = true;

            } else {
                ScrabbleTiles[currentletter]["number-remaining"]--;
                hand.push(currentletter);
                tilesLeft--;
                if (hand.length == 7){
                    complete = true;
                }
            }
        }
    }
    // Gets number of tiles that are left
    document.getElementById("tilesLeft").innerHTML = tilesLeft;
    // Prints hand to console
    console.log(hand);
    // Calls function to visually place tiles on screen
    mapTilesToScreen();
}

// SubmitWord -
// Checks to make sure word is not left blank.
// If word was left blank, returns corresponding message.
// Otherwise, multiplies value of word by 2 if a tile was placed on
// a double word bonus tile. Calculates current score. Calls
// processNewGame (resets board).  Resets word score to zero.
function submitWord(){
    if (turnWord != ""){
        if (doubleWord){
            wordScore = wordScore * 2;
        }
        currentScore = currentScore + wordScore;
        processNewGame();
    } else {
        document.getElementById("exist").innerHTML = "Word is empty";
    }
    wordScore = 0;
}

// Process new game function- Starts new turn.
// sets word for this turn to 0, updates score,
// updates number of tiles left, resets current word to be blank,
// resets exist to blank (used to check if board is empty or not).
// Word for turn set to empty, elements of array for board made empty.
// Table is cleared and start function is called.
// Rerferenced: https://www.w3schools.com/js/js_arrays.asp
function processNewGame(){
    document.getElementById("turnWord").innerHTML = 0;
    document.getElementById("currentScore").innerHTML = currentScore;
    document.getElementById("tilesLeft").innerHTML = tilesLeft;
    document.getElementById("currWord").innerHTML = "";
    document.getElementById("exist").innerHTML = "";
    turnWord = "";
    board = ["", "", "", "", "", "", ""];
    clearTable();
    start();
}

// Clears current tiles off of board, goes through
// them by index to do so. Sets tile's background image
// to empty so it disappears.
// For each: https://www.w3schools.com/jsref/jsref_forEach.asp
function clearTable(){
    let children = [...document.getElementById('board').children]
    children.forEach((tile, index) => {
        document.getElementById(tile.id).style.backgroundImage = ``
        document.getElementById(tile.id).dataset.occupied = `false`
    })
}

// This function clears any previous tiles and loads
// the new tiles for the player's hand onto the screen.
function mapTilesToScreen(){
    // First clears any pre-existing images for tiles
    // sets up "children" array, gets tiles by their id and stores them.
    // For each individual tile in the array, its background
    // image is set to nothing, making it disappear.
    let children = [...document.getElementById('tiles').children]
    children.forEach((tile, index) => {
        document.getElementById(tile.id).style.backgroundImage = ``;
    });
    // Prints length of hand to console.
    // For each tile in hand
    // Gets letter to be displayed on tile at current index.
    // Tile's background image is set to the image corresponding to the
    // letter for the tile.
    hand.forEach((tile, index) => {
        document.getElementById(`tile${index}`).dataset.letter = tile;
        document.getElementById(`tile${index}`).style.backgroundImage = `url(graphics_data/tileImages/Scrabble_Tile_${tile}.jpg)`;
    });
}

// Handling for dropping a tile onto a space.
// Check to make sure is placed directly next to another tile.
// Do NOT allow user to move tile once placed.
// Should call "checkTile".
// Use $(this).droppable( 'disable' ); to make tile stay put.
function tilePlaced() {
    console.log("TILE PLACED CALLED");
}

// Determine what tile was placed on which square.
// If on double letter space, should multiply current tile
// value by 2.
// If on double word space, sets "doubleWord" to true.
// If on double letter space, sets "doubleLetter" to true.
// Calculates score of tile.
// Referened (for drop zone):
// https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js
function checkTileScore(draggableElement, dropzone) {
    if (dropzone.dataset.special == "dw"){
        doubleWord = true;
    }
    let doubleLetter = false;
    if (dropzone.dataset.special == "dl"){
        doubleLetter = true;
    }
    let scoreToAdd = doubleLetter ? ScrabbleTiles[draggableElement.dataset.letter].value * 2 : ScrabbleTiles[draggableElement.dataset.letter].value;
    wordScore = wordScore + scoreToAdd;
    document.getElementById("turnWord").innerHTML = doubleWord ? wordScore * 2 : wordScore;
}

// Function handles what to do when item is picked up and starts to be dragged.
// Sets current character being dragged, prints to console (for error checking).
// Referenced: Data transfer: https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
// prevent default: https://www.w3schools.com/jsref/event_preventdefault.asp
// Splice for arrays: https://www.w3schools.com/jsref/jsref_splice.asp
function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
    currentdragcharacter = event.target.dataset.letter;
    console.log("drag start", currentdragcharacter);
  }

  // Keeps letter from being dropped outside of space on table -
  // "bounces" back to tile rack.
  function onDragOver(event) {
    event.preventDefault();
  }

// When tile is dropped- sets id to text of tile,
// sets draggable element to current tile,
// and sets drop zone.
function onDrop(event) {
  const id = event.dataTransfer.getData('text');
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;

// If passes check to be adjacent to another tile (no spaces allowed)
// sets current dropzone (board space) to be occupied, updates background
// image of current board space to be that of tile dropped to it,
// stores information on which tile was dropped to what space,
// Adds curernt letter to array.
// Calls checkCurrentWord, checkTileScore, and mapTilesToScreen.
 if (checkAdjacent(dropzone)){
    dropzone.dataset.occupied = "true";
    dropzone.style.backgroundImage = draggableElement.style.backgroundImage;
    console.log("adding in space " + dropzone.dataset.index + " the letter " + draggableElement.dataset.letter);
    board[dropzone.dataset.index] = draggableElement.dataset.letter;
    hand.splice(draggableElement.dataset.index, 1);
    checkCurrentWord(draggableElement, dropzone);
    checkTileScore(draggableElement, dropzone);
    mapTilesToScreen();
 }
}

// checkCurrentWord function-
// Converts board array [s, a, m, p, l, e] to string and removes
// commas by replacing them with nothing. Stores result in turnWord.
// Sets currWord to turnWord.
// Prints message "what current word is"
// Referenced: https://www.w3schools.com/jsref/jsref_replace.asp
// https://www.w3schools.com/jsref/jsref_tostring_array.asp
function checkCurrentWord(){
    turnWord = board.toString().replace(/,/g, '');
    document.getElementById("currWord").innerHTML = turnWord;
    console.log("current word is", turnWord);
}

// Checks to see if the space that user is attempting to drop their tile
// to is directly before or after an already filled tile- need to return true
// for tile to be able to be placed there.
function checkAdjacent(dropzone){
    // Checks to see if all spaces on board are empty - if so,
    // returns true right away, tile can be placed.
    const emptyboard = board.join('');
    if (emptyboard == ""){
        return true;
    } else {
        // If board is not empty, and
        // if space not already full, gets index of space that user is trying
        // to drop the tile to. Checks to see if dropzone
        // is equal to previous and following spaces on board.
        // If board space that user is trying to drop the tile on is directly
        // before or after a filled tile, returns true, allowing user to place
        // tile. Otherwise, returns false and tile will return to rack.
        if (dropzone.dataset.occupied == "false"){
            const indextooccupy = parseInt(dropzone.dataset.index);
            const checkabove = indextooccupy + 1 == 7 ? false : board[indextooccupy + 1] != "";
            const checkbelow = indextooccupy - 1 == -1 ? false: board[indextooccupy - 1] != "";
            console.log("check space", (indextooccupy - 1), (indextooccupy + 1));
            if (checkbelow || checkabove){
                return true;
            }
        } else {
            return false;
        }
    }
}
