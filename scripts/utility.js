import { letters, words, sentences, letter_to_morse, morse_to_letter } from './constants.js';

class oscManager {

  constructor(audioCtx, wpm, frequency) {
    this.ctx = audioCtx;
    this.wpm = wpm;
    this.timeUnit = wpmToTimeUnit(wpm);
    this.frequency = frequency;
    /* 
      letters represent letters
      • and - represent a dot and dash respectively
      / represents a space between letters
      // represents a space between words 
    */
    this.queue = [];

    this.osc = ctx.createOscillator();
    this.osc.connect(ctx.destination);
    this.osc.type = 'triangle';
  }

  playUnits(units) {
    this.osc.start();
    this.osc.stop(this.ctx.currentTime + units * this.timeUnit);
  }

  setWpm(wpm) {
    this.wpm = wpm;
    this.timeUnit = wpmToTimeUnit(wpm);
  }

  setTimeUnit(timeUnit) {
    this.timeUnit = timeUnit;
    this.wpm = timeUnitToWpm(timeUnit);
  }

  clearQueue() {
    this.queue = [];
  }

  addToQueue(char) {
    this.queue.push(char);
  }

  destroy() {
    this.osc.stop();
    this.osc.disconnect();
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

export { newProblem, decode, encode, wpmToTimeUnit, timeUnitToWpm, oscManager};