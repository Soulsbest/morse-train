import { newProblem } from './utility.js'
import { letter_to_morse } from './constants.js'

//Setup website
let guess = ''
let type = 'letter'
let currLetters, currMorse = ''
let wins = 0
nextProblem(type)
updateGuess('')

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case '.':
            handleInput('•')
            return;
        case '/':
            handleInput('-')
            return;
        case ' ':
            handleClear();
            return;
        case 'Enter':
            handleSkip();
            return;
        default:
            return;
    }
})


//These are the event handlers

function handlePopupClose(event) {
    if (event.target == document.getElementById('popupContainer') || event.target == document.getElementById('close')) {
        document.getElementById('popupContainer').style.display = 'none';
        document.getElementById('popup').style.display = 'none';
    }
}

window.handlePopupClose = handlePopupClose;

function handleOpenPopup() {
    document.getElementById('popupContainer').style.display = 'flex';
    document.getElementById('popup').style.display = 'flex';
}

window.handleOpenPopup = handleOpenPopup;

function handleSkip() {
    nextProblem(type)
}

window.handleSkip = handleSkip;

function handleClear() {
    updateGuess('')
}

window.handleClear = handleClear


function handleInput(input) {
    updateGuess(guess + input);
}

window.handleInput = handleInput;

//These are the functions that actually do the work

function nextProblem(type) {
    currLetters = newProblem(type)
    currMorse = ''
    for (let i = 0; i < currLetters.length; i++) {
        currMorse += letter_to_morse[currLetters[i]]
    }
    setProblem(currLetters)
    updateGuess('')
}

function setProblem(prob) {
    document.getElementById('problem').textContent = prob
}

function updateGuess(newGuess) {
    if (isCorrectGuess(newGuess)) {
        console.log("correct")
        guess = ''
        nextProblem(type)
        wins++;
        document.getElementById('winCounter').textContent = wins;
    } else {
        guess = newGuess;
        document.getElementById('guess').textContent = guess;
    }
}

function isCorrectGuess(guess) {
    if (guess === currMorse & guess != '') {
        return true;
    } else {
        return false;
    }
}


function setType(newType) {
    type = newType
}

function getType() {
    return type
}


window.nextProblem = nextProblem