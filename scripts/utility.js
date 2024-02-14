import { letters, words, sentences, letter_to_morse, morse_to_letter } from './scripts/constants.js';

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
      return "Error generating problem text: type of problem requested incorrect";
  }
}

function decode(char) {
  return letter_to_morse[char];
}

function encode(char) {
  return morse_to_letter[char];
}
