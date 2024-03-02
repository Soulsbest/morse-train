import { newProblem, wpmToTimeUnit } from './utility.js'
import { letter_to_morse } from './constants.js'

// This is to setup the webpage
const wpm = 10
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

let guess = ''
let type = 'letter'
let currLetters, currMorse = ''
let wins = 0
nextProblem(type)
updateGuess('')


//These are the event handlers
function handleNextProblem() {
    nextProblem(type)
}

window.handleNextProblem = handleNextProblem;

function handleInput(input) {
    updateGuess(guess + input);
  if (input == '-') {
    playDash(audioCtx, wpm)
  } else {
    playDot(audioCtx, wpm)
  }
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