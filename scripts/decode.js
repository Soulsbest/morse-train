// Variables
let switchState = 'sound'
updateSwitchState()

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

// Cool functions

function updateSwitchState() {
    if (switchState === 'sound') {
        document.getElementById('switchInput').checked = true
        //problem statement
        document.getElementById('playButton').classList.remove('hidden')
        document.getElementById('problem').classList.add('hidden')
        //selector graphics
        document.getElementById('miniPlayButton').classList.add('activeSelector')
        document.getElementById('miniPlayButton').classList.remove('inactiveSelector')
        document.getElementById('miniMorse').classList.add('inactiveSelector')
        document.getElementById('miniMorse').classList.remove('activeSelector')
    } else {
        document.getElementById('switchInput').checked = false
        //problem statement
        document.getElementById('playButton').classList.add('hidden')
        document.getElementById('problem').classList.remove('hidden')
        //selector graphics
        document.getElementById('miniMorse').classList.add('activeSelector')
        document.getElementById('miniMorse').classList.remove('inactiveSelector')
        document.getElementById('miniPlayButton').classList.add('inactiveSelector')
        document.getElementById('miniPlayButton').classList.remove('activeSelector')
    }
}