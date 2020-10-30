/*
Name: Kaylin Ridge
CS Username: kridge
Email: kaylin_ridge@student.uml.edu
Date of Creation: 26 October 2020
Date of Upload: 29 October 2020
GUI Programming I Autumn 2020 (91.61)

Description: The purpose of this assignment was to practice Javascript
for web development while also incorporating Bootstrap, CSS, and HTML. I
created a dynamic multiplication table whose factors come from user input.
The table is responsive so that it will be able to be viewed appropriately even
on small screens by using a scroll bar. The Javascript code checks for
errors in user input and displays appropriate error messages. If there are no
errors, a multiplication table is created using the user's input.

Checklist - For personal Reference

ERROR CHECKING:
[X] Check to make sure inputs are not letters
[X] Handle decimals
[X] Handle e/ E/ inputs containing e or E
[X] Make sure no input is blank
[X] Make sure input is within bounds
[X] Make sure lowers < uppers

TABLE:
[X] Table prints
[X] Correct math inside table
[X] Table is scrollable (for smaller screens)
[X] Table looks nice
*/

// Setting up references
const elBtnSubmit = document.getElementById("btnSubmit");
const elErrorText = document.getElementById("ErrorText");
const elMultiTable = document.getElementById("multiTable");


/* Referenced code from here to create event listener
for the button:
https://www.w3schools.com/js/js_htmldom_eventlistener.asp */
elBtnSubmit.addEventListener("click", pullNums);


function pullNums() {
    /* Pulls input numbers and returns them as strings, as described here:
    https://www.w3schools.com/jsref/prop_text_value.asp */
    let xLow = document.getElementById("numOne").value;
    let xUp = document.getElementById("numTwo").value;
    let yLow = document.getElementById("numThree").value;
    let yUp = document.getElementById("numFour").value;

    let isNum = false;

    /* Make sure all inputs are numbers (no blanks). Referenced code from here:
    https://www.w3resource.com/javascript/form/non-empty-field.php */
    if ((xLow.length == 0 || xUp.length == 0 || yLow.length == 0 || yUp.length == 0)) {
        ErrorText.textContent = "Please do not leave any fields blank. Ensure that the numbers entered are all integers between -150 and 50 that do not contain e or E. ";
        isNum = false;
    }
    /* Check to make sure initial string does not contain a decimal- referenced:
    https://www.w3schools.com/jsref/jsref_includes.asp */
    else if (xLow.includes(".") ||  xUp.includes(".") ||  yLow.includes(".") ||  yUp.includes(".")) {
        ErrorText.textContent = "Please do not use decimals. ";
        isNum = false;
    }
    else {
        xLow = parseInt(xLow);
        xUp = parseInt(xUp);
        yLow = parseInt(yLow);
        yUp = parseInt(yUp);
        isNum = true;
        ErrorText.textContent = xLow.length;
    }

    /* Will only get here if all previous tests are passed, thanks to
    isNum check. isNum must be true. If true that xLow greater than
    xUp OR yLow is greater than yUp, throw error message. Next, checks to
    make sure that input is within range (-150 to 150). Finally, if all
    of these conditions are met and isNum is still true, anything currently
    in multiTable is cleared, and the createMultiTable function is called. */
    if (isNum && (xLow > xUp || yLow > yUp)) {
        ErrorText.textContent = "Please ensure that each lower bound is lesser than its upper bound.";
        isNum = false;
    }
    else if (isNum && (xLow < -150 || xUp > 150 || yLow < -150 || yUp > 150)) {
        ErrorText.textContent = "Number out of range. Please only enter numbers between -150 and 150.";
        isNum = false;
    }
    else if (isNum) {
        //clear any old table
        multiTable.innerHTML = "";
        createMultiTable(xLow, xUp, yLow, yUp, elMultiTable);
    }
}

/* ERROR CHECKING ENDS HERE

TABLE CREATION STARTS HERE */

/* Creating table- function createMultiTable takes lower bound and
upper bound values, as well as parent (will put table in elMultiTable element).
Referenced code from here to help get started:
https://renenyffenegger.ch/notes/development/web/HTML/tags/table/create-with-js
th = table head, tr = table row, td = table data (data cell) */
function createMultiTable(xLow, xUp, yLow, yUp, parent) {
    /* Makes table equal to what has been created most recently by
    createNewEl function, which creates a new element of the type passed to it,
    appends the element to the current table, and then returns the result. Allows
    for continuous addition of elements. */
    let mTable = createNewEl(parent, "table");
    /* standard table called "mTable" (multiplication table). Styling
    is handled in CSS file. */
    mTable.className = "table";
    /* calls createNewEl with mTable and tr (table row) as arguments
    and puts result in firstX */
    let firstX = createNewEl(mTable, "tr");
    /* Calls createNewEl again, using firstX from previous statement and td */
    createNewEl(firstX, "td");
    /* xCurrent counter variable starts equal to xLow. While xCurrent less than
    or equal to xUp, xCellOne is set to result of createNewEl when called with
    firstX and th (table header). Content of xCellOne cell is set to current
    value of counter. Counter is incremented by 1 at end of each "do". This
    populates the top of the table along the horizontal axis. Referenced this
    code for do while in JS: https://www.w3schools.com/jsref/jsref_dowhile.asp */
    let xCurrent = xLow;
    do {
        let xAxisH = createNewEl(firstX, "th");
        xAxisH.textContent = xCurrent;
        xCurrent++;
    }
    while (xCurrent <= xUp);

    /* yCurrent (y counter) starts equal to value of lowerbound for y.
    Increases by 1 each loop, continues so long as yCurrent is less than
    or equal to upper bound for y. While in the for loop, newRow is created
    and set to the result of the call to createNewEl using mTable and tr (table
    row). yAxisH is also created and set equal to the result of a call to
    createNewEl using newRow and "th" (table head) as arguments. The content of
    yAxisH is then set to the value of the y counter, populating the leftmost
    column of the table. */
    for (let yCurrent = yLow; yCurrent <= yUp; yCurrent++) {
	      let newRow = createNewEl(mTable, "tr");
        let yAxisH = createNewEl(newRow, "th");
        yAxisH.textContent = yCurrent;

        /* xCurrent used as counter again. While counter is less than upper
        bound, newCell is created and set to result of call to createNewEl
        using newROw and "td" (table data) as arguments. Content of new
        cell is set to be the product of current values for x and y
        counters. X counter (xCurrent) is then incremented by 1. This
        populates the inside of the table. */
        let xCurrent = xLow;
        do {
            let newCell = createNewEl(newRow, "td");
            newCell.textContent = xCurrent * yCurrent;
            xCurrent++;
        }
        while (xCurrent <= xUp)
    }
}

/* CreateNewEl function- creates a child of type passed to it. Adds the
new child to the parent. Returns new child as an element. Referenced code
from here (appendChild):
https://renenyffenegger.ch/notes/development/web/HTML/tags/table/create-with-js */
function createNewEl(parent, type) {
    let elNew = document.createElement(type);
    parent.appendChild(elNew);
    return elNew;
}
