import {newProblem} from '/scripts/utility.js'

let type = 'word'
nextProblem(type)

function nextProblem(type='letter') {
  document.getElementById('problem').innerHTML = newProblem(type)
}

window.nextProblem = nextProblem;