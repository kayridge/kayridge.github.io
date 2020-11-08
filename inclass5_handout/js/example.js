/*
   Name: Kaylin Ridge
   CS Username: kridge
   Email: kaylin_ridge@student.uml.edu
   Date: 7 November 2020
   GUI Programming I Autumn 2020 (91.61)
   In-Class Assignment 5
*/



// Add  "kale" (first), "cream" (last)

// select the list
const unorderedList = document.querySelector("ul");

// ADD NEW ITEM TO END OF LIST
const creamList = createNewElementEnd(unorderedList, "li");
creamList.textContent = "cream";

// ADD NEW ITEM START OF LIST
const kaleList = createNewElementBeg(unorderedList, "li");
kaleList.textContent = "kale";

// ADD A CLASS OF COOL TO ALL LIST ITEMS
const listItems = document.querySelectorAll("li");
for (const li of listItems) li.classList.add("cool");

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
let header = document.querySelector("#page > h2");
const numCount = createNewElementEnd(header);
numCount.textContent = listItems.length;
numCount.setAttribute("style", "background: black; font-size: 12px; text-align: center; border-radius: 50%; padding: 1%;");

// Functions-
// Add something to end
function createNewElementEnd(parent, type) {
    let elNew = document.createElement(type);
    parent.appendChild(elNew);
    return elNew;
}
// Add something to beginning
function createNewElementBeg(parent, type) {
    let elNew = document.createElement(type);
    parent.insertBefore(elNew, parent.firstChild);
    return elNew;
}
