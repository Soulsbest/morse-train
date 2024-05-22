import { newProblem } from "./utility.js"
import { letter_to_morse } from './constants.js'

// Variables
let switchState = 'sound'
if (localStorage.getItem('switchState') == "visible") {
    switchState = 'visible'
}
updateSwitchState()

let type = 'letter'
let currLetters, currMorse = ''
let wins = 0
nextProblem(type)

document.addEventListener("keypress", function (e) {
    const keyName = e.key
    //stops special keys fromb eing involved
    if (keyName.length != 1 || keyName == " ") { return }
    document.getElementById('answerBox').textContent = keyName.toUpperCase()
    handleSubmit()
})


// Event listeners

function handleSwitch() {
    if (switchState === 'visible') {
        switchState = 'sound'
    } else {
        switchState = 'visible'
    }
    updateSwitchState()
}

window.handleSwitch = handleSwitch;

function handleWinAdd() {
    wins = wins + 1
    document.getElementById('winCounter').textContent = wins
    stopPlayback()
}

window.handleWinAdd = handleWinAdd;

function tryGuess() {
    if (document.getElementById('answerBox').textContent.toLowerCase() == currLetters.toLowerCase()) {
        handleWinAdd()
        nextProblem(type)
    }
}

window.tryGuess = tryGuess;

function handleSubmit() {
    tryGuess(document.getElementById('answerBox').value)
}

window.handleSubmit = handleSubmit;

function handlePlay() {
    if (document.getElementById('playButton').classList.contains('hidden')) {
        return
    }
    playMorseCode(currMorse)
}

window.handlePlay = handlePlay;

// Cool functions

function nextProblem(type) {
    let oldProb = currLetters
    while (currLetters == oldProb) {
        currLetters = newProblem(type)
    }
    currMorse = ''
    for (let i = 0; i < currLetters.length; i++) {
        currMorse += letter_to_morse[currLetters[i]]
    }
    setProblem(currMorse)
}

function setProblem(prob) {
    document.getElementById('textProblem').textContent = prob
}

function updateSwitchState() {
    if (switchState === 'sound') {
        localStorage.setItem('switchState', 'sound')
        document.getElementById('switchInput').checked = true
        //problem statement
        document.getElementById('textProblem').classList.add('hidden')
        document.getElementById('playButton').classList.remove('hidden')
        //selector graphics
        document.getElementById('miniPlayButton').classList.add('activeSelector')
        document.getElementById('miniPlayButton').classList.remove('inactiveSelector')
        document.getElementById('miniMorse').classList.add('inactiveSelector')
        document.getElementById('miniMorse').classList.remove('activeSelector')
    } else {
        localStorage.setItem('switchState', 'visible')
        document.getElementById('switchInput').checked = false
        //problem statement
        document.getElementById('textProblem').classList.remove('hidden')
        document.getElementById('playButton').classList.add('hidden')
        //selector graphics
        document.getElementById('miniMorse').classList.add('activeSelector')
        document.getElementById('miniMorse').classList.remove('inactiveSelector')
        document.getElementById('miniPlayButton').classList.add('inactiveSelector')
        document.getElementById('miniPlayButton').classList.remove('activeSelector')
    }
}


// I admit, the below code was written mainly by the bot (then modified by me to actually work)
const context = new (window.AudioContext || window.webkitAudioContext)();
const unit = 0.1; // Length of a single Morse code unit in seconds
const frequency = 600; // Frequency of the beep sound in Hz

// Preload the oscillator and gain node
const oscillator = context.createOscillator();
let gainNode = context.createGain();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(frequency, context.currentTime);
oscillator.connect(gainNode);
gainNode.connect(context.destination);

// Start the oscillator and set gain to 0 (mute)
let oscillatorStarted = false;
gainNode.gain.setValueAtTime(0, context.currentTime);

function stopPlayback() {
    gainNode.disconnect()
    gainNode = context.createGain();
    gainNode.gain.setValueAtTime(0, context.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
}

function playMorseCode(morseCode) {

    stopPlayback();

    let currentTime = context.currentTime;
    currentTime += 0.2;

    if (!oscillatorStarted) {
        oscillator.start();
        oscillatorStarted = true;
        currentTime += 0.9; //Wiat for the oscillator to start
    }

    const morseMapping = {
        '•': unit, // Dot duration
        '-': unit * 3, // Dash duration
        ' ': unit // Space duration (between letters)
    };


    function playBeep(duration) {
        gainNode.gain.setValueAtTime(1, currentTime); // Turn on the sound
        gainNode.gain.setValueAtTime(0, currentTime + duration); // Turn off the sound after duration
        currentTime += duration;
    }

    for (let char of morseCode) {
        if (char === ' ') {
            // Extra space between words
            currentTime += unit * 2;
        } else if (morseMapping[char] !== undefined) {
            playBeep(morseMapping[char]);
            currentTime += unit; // Gap between parts of the same letter
        }
    }
}