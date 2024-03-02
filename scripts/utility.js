import { letters, words, sentences, letter_to_morse, morse_to_letter } from './constants.js';

function playDot(context, wpm) {
  playUnits(context, wpmToTimeUnit(wpm)*1)
}

function playDash(context, wpm) {
  playUnits(context, wpmToTimeUnit(wpm)*3)
}

function playUnits(context, units) {
  const osc = context.createOscillator()
  osc.type = 'sine'
  osc.frequency.value = 500

  osc.connect(context.destination)
  osc.start()
  osc.stop(context.currentTime + units)

  // Disconnect the oscillator after it's done playing
  osc.onended = function() {
    osc.disconnect(context.destination)
  }
}

function wpmToTimeUnit(wpm) {
  return (60 / (wpm*50))
}

function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function newProblem(type) {
  switch (type) {
    case "letter":
      return chooseRandom(letters);
    case "word":
      return chooseRandom(words);
    case "sentence":
      return chooseRandom(sentences);
    default:
      return "Error: problem type not recognized";
  }
}

function decode(char) {
  return letter_to_morse[char];
}

function encode(char) {
  return morse_to_letter[char];
}

export { newProblem, decode, encode, wpmToTimeUnit, playDot, playDash };