import { letters, words, sentences, letter_to_morse, morse_to_letter } from './constants.js';

class oscManager {
  constructor(audioCtx, wpm, frequency) {
    this.ctx = audioCtx;
    this.wpm = wpm;
    this.timeUnit = wpmToTimeUnit(wpm);
    this.frequency = frequency;
  }
}

function wpmToTimeUnit(wpm) {
  return (60.0 / (wpm*50.0))
}

function timeUnitToWpm(timeUnit) {
  return (60.0 / (timeUnit*50.0))
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

export { newProblem, decode, encode, wpmToTimeUnit, timeUnitToWpm};