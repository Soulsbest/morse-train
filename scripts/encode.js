import {newProblem} from './utility.js'

// This is to setup the webpage
let type = 'letter'
nextProblem(type)

function nextProblem() {
    document.getElementById('problem').innerHTML = newProblem(type)
}

function setType(newType) {
    type = newType;
}

function getType() {
    return type;
}


window.nextProblem = nextProblem;