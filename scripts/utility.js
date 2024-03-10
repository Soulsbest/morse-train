import { letters, words, sentences, letter_to_morse, morse_to_letter } from './constants.js';

function wpmToTimeUnit(wpm) {
  return (60 / (wpm*50))
}

function timeUnitToWpm(timeUnit) {
  return (60 / (timeUnit*50))
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

export { newProblem, decode, encode, wpmToTimeUnit, timeUnitToWpm };