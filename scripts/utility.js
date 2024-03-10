import { letters, words, sentences, letter_to_morse, morse_to_letter } from './constants.js';

const EASE_TIME = 0.1;

class oscData {

  constructor(osc, gainNode) {
    this.osc = osc;
    this.gainNode = gainNode;
  }

  getOsc() {
    return this.osc;
  }

  getGainNode() {
    return this.gainNode;
  }

}

class oscManager {

  constructor(audioCtx, wpm, frequency) {
    this.ctx = audioCtx;
    this.wpm = wpm;
    this.timeUnit = wpmToTimeUnit(wpm);
    this.frequency = frequency;

    this.oscListRunning = [];
    this.oscListStopping = [];
  }

  newOsc() {
    let newOsc = this.ctx.createOscillator();
    let gain = this.ctx.createGain();
    newOsc.connect(gain);
    gain.connect(this.ctx.destination);
    newOsc.type = 'sine';
    newOsc.frequency.value = this.frequency;

    return new oscData(newOsc, gain);
  }

  clearOscs() {
    for (osc of this.oscListRunning) {
      //maybe change this 0 to a very small number? 1e-6?
      osc.getGainNode().gain.exponentialRampToValueAtTime(0, this.ctx.currentTime + EASE_TIME);
      this.oscListStopping.push(osc);
    }
    this.oscListRunning = [];
  }

  playUnits(units) {
    let osc = newOsc();
    osc.getOsc().start();
    osc.getOsc().stop(this.ctx.currentTime + units * this.timeUnit);
    this.oscListRunning.push(osc);
  }

  setWpm(wpm) {
    this.wpm = wpm;
    this.timeUnit = wpmToTimeUnit(wpm);
  }

  setTimeUnit(timeUnit) {
    this.timeUnit = timeUnit;
    this.wpm = timeUnitToWpm(timeUnit);
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