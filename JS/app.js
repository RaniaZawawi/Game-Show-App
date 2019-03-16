
/* get the element with id (overlay) which is the start div */
const startDiv = document.getElementById('overlay');

/* get the first element with class (btn__reset) which is a button */
const buttonReset = document.getElementsByClassName('btn__reset')[0];

/* get the element with id (phrase) which is a div */
const phraseDiv = document.getElementById('phrase');

/* select the first child of the div selected earlier which is a ul */
const ulDiv = phraseDiv.firstElementChild;

/* get the element with id (querty) which is a div */
const keyRowParentDiv = document.getElementById('qwerty');

/* variable to store the number of missed tries */
let missed = 0;

/*  save returned value from (Get Random Phrase Array) function to variable */
let phraseChars = getRandomPhraseAsArray(phrases);

/*  calls out a function to create spaces according to letters in phrase */
addPhraseToDisplay(phraseChars);


/******************************************************************************
                            Add Event Listener functions
*******************************************************************************/
/*******************************************************************************
    function triggered by the click of Start Game button
    *****************************************************
    to hide the first start screen,
    checks if the button text is not (start game) - not the start screen
    then call reset all function
*******************************************************************************/
buttonReset.addEventListener('click',()=>{
  startDiv.style.display = "none";
  if (buttonReset.textContent !== "Start Game"){
    setPhrases();
  }
})

/*******************************************************************************
    function Get Random Phrase Array
    *********************************
    parameters: (an array of phrases)
    return: (an array of letters composing the phrase to guess)
    ****************************************************************************
    select a random statment between 0 - 9, and saves it as a phrase Number
    gets the phrase from array corresponding to phrase Number
    splits the phrase into characters and save it in array
*******************************************************************************/
function getRandomPhraseAsArray (phrases) {
  let phraseNumber = Math.floor(Math.random() * 10);
  let phrase = phrases[phraseNumber];
  let phraseChars = phrase.split("");
  return phraseChars;
}

/*******************************************************************************
    function Add Phrase To Display:
    ********************************
    parameters: (an array of of letters composing the phrase to guess)
    ****************************************************************************
    loops through the array of phrase characters
      creating an li element
      set the text for the li element
      based on the character, sets the class of li element
      append the li element to his parent node (ul)
*******************************************************************************/
function addPhraseToDisplay(phraseChars) {

  for (let char of phraseChars){
    let charLi = document.createElement('li');
    charLi.textContent = char;

    if (char === " ") {
      charLi.className = "space";

    } else {

      charLi.className = "letter";
    }

    ulDiv.appendChild(charLi);
  }

}

/*******************************************************************************
    function uses event delegation to
    listen to any click within element with id (querty)
    ****************************************************
    parameters: (the event )
    ****************************************************************************
    save returned value from called check letter function

    checks if the element clicked is a button,
    then set element as disabled, and checks if there is returned value
    the set element class as (chosen), else set class as (chosen lost)

    check if the returned value is null then add 1 to variable (missed),
    and calls loose heart function

    finally call check win function
*******************************************************************************/
keyRowParentDiv.addEventListener('click',(event)=>{

  let letterFound = checkLetter(event);

  if (event.target.tagName.toLowerCase() === "button"){
    event.target.disabled = 'true';

    if (letterFound){
      event.target.className = "chosen";
    } else {
      event.target.className = "chosen lose";
      missed += 1;
      looseHearts();
    }
    checkWin();
  }

})

/*******************************************************************************
    function check letter
    **********************
    parameters: (the button clicked)
    ****************************************************************************
    save the text within the button clicked into variable (selectedLetter)
    select all li with class (letter), and save themn into array (lettersLi)
    defines an empty return variable
    loops through the array of list items with class (letter)
      checks if list item text equals the selected letter (case insensitive),
      then adds a class show (to show the letter), and saves the value in the returned variable
    return the found value, or null if not found
*******************************************************************************/
const checkLetter = (button) => {
  let selectedLetter = button.target.textContent;

  let lettersLi = document.querySelectorAll('.letter');
  let matched = "";

  for (let letter of lettersLi){
    if (letter.textContent.toLowerCase() === selectedLetter) {
      letter.className = 'letter show';
      matched = selectedLetter;
    }
  }

  return matched;
}

/*******************************************************************************
    function loose heart
    **********************
    select all list items with class tries
    loops through the array of list items with class (tries)
      save the image element within the list item
      checks if image source ends with (liveHeart.png),
      then change image source to (lostHeart.png), and return from function
*******************************************************************************/
const looseHearts = () => {
  let triesLi = document.querySelectorAll('.tries');

  for (let tryLi of triesLi) {
    let image = tryLi.firstElementChild;

    if (image.src.endsWith('liveHeart.png')) {
        image.src = "images/lostHeart.png";
        return;
    }
  }

}

/*******************************************************************************
    function check win
    **********************
    assign an array for all elements with class (letter)
    assign an array for all elements with class (show)
    if the length of the two arrays is equal
    then display win screen
    else if the number of missed tries is greater or equal to 5
    then display the lose screen
*******************************************************************************/
const checkWin = () => {
  let lettersLi = document.querySelectorAll('.letter');
  let showsLi = document.querySelectorAll('.show');

  if (lettersLi.length === showsLi.length){
    resetAll();
    scoreScreen("win","Play Again", "You Win :)");

  } else if (missed >= 5){
    resetAll();
    scoreScreen("lose","Try Again", "You lose !");

  }

}

/*******************************************************************************
    function score screen
    ***********************
    parameters: class name, button message, and text displayed
    ****************************************************************************
    show the start div
    set the class for the start div
    set the displayed message on the button
    checks if the reset button already have a next sibling
    then just just change that element text content with the passed parameter,
    else create a paragraph, set its text,
    and add it as last child for the start div
*******************************************************************************/
const scoreScreen = (result, message, text) => {
  startDiv.style.display = "";
  startDiv.className = result;
  buttonReset.textContent = message;

  if (buttonReset.nextElementSibling) {
    buttonReset.nextElementSibling.textContent = text;

  } else {

    let header2 = document.createElement('h2');
    header2.textContent = text;
    startDiv.appendChild(header2);
  }
}

/*******************************************************************************
    function set Phrases
    *********************
    initialize missed counter
    save returned value from (Get Random Phrase Array) function to variable
    call out a function to create spaces according to letters in phrase
*******************************************************************************/
const setPhrases = () => {

  missed = 0;

  phraseChars = getRandomPhraseAsArray(phrases);

  addPhraseToDisplay(phraseChars);

}

/*******************************************************************************
    function Reset All
    *******************
    call out function to delete list items
    call out function to reset all heart images to live
    call out a function to reste and enable all letters selected
*******************************************************************************/
const resetAll = () => {
  deleteListItems();
  resetAllImages();
  enableSelectedLetters();
}

/*******************************************************************************
    function delete List items
    ***************************
    loop: to delete all list item elements added previously as children of ul
*******************************************************************************/
const deleteListItems = () => {

  let listItems = ulDiv.children;
  for (let listIndex = (listItems.length - 1); listIndex >= 0; listIndex --) {
    ulDiv.removeChild(ulDiv.childNodes[listIndex]);
  }

}

/*******************************************************************************
    function enable Selected Letters
    *********************************
    loop: for each letter reset class, and enable it
*******************************************************************************/
const enableSelectedLetters = () => {

  let selectedLetters = document.querySelectorAll('.chosen');
  for (let selectedLetter of selectedLetters) {
    selectedLetter.className = "";
    selectedLetter.disabled = false;
  }

}

/*******************************************************************************
    function reset All Images
    **************************
    loop: for each image with a lost heart, change it to live heart
*******************************************************************************/
const resetAllImages = () => {

  let images = document.querySelectorAll('img');
  for (let image of images) {
    if (image.src.endsWith('lostHeart.png')) {
        image.src = "images/liveHeart.png";
    }
  }

}
