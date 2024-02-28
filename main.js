const inputBox = document.getElementById("main-input");
const inputDisplay = document.getElementById("input-display");
const outputArea = document.getElementById("output-area");
const blinker = document.getElementById("blinker");
const screenArea = document.getElementById("screen-area");

var updateInterval = undefined;

var inputEnabled = false;

var outputQueue = [];

screenArea.onclick = () => inputBox.focus();

inputBox.onkeyup = function updateInput(e) {
    //console.log(e.key); // for debugging
    if(inputEnabled) {
        if(e.key == "Enter") {
            outputArea.innerText += inputBox.value;
            outputArea.innerHTML += "<br>";
            inputDisplay.innerText = "";
            inputBox.value = "";
        }
        else {
            inputDisplay.innerText = inputBox.value;
        }
    }
    else {
        inputDisplay.innerText = "";
        inputBox.value = "";
    }
}

function updateOutput() {
    if(outputQueue.length > 0) {
        var nextChar = outputQueue.shift();
        if(nextChar.length > 1 && nextChar[0] == "<") {
            outputArea.innerHTML += nextChar;
        }
        else if(nextChar == " " || nextChar && outputQueue.length > 0) {
            outputArea.innerText += nextChar + outputQueue.shift();
        }
        else {
            outputArea.innerText += nextChar;
        }
    }
}

function newLine() {
    outputQueue.push("<br>");
}
function print(text) {
    outputQueue.push(...text.split(""));
}
function printLine(text = "") {
    newLine();
    print(text);
}

function enableInput() {
    blinker.classList.add("blink");
    inputEnabled = true;
    inputBox.focus();
}
function disableInput() {
    blinker.classList.remove("blink");
    inputEnabled = false;
}

function init() {
    updateInterval = setInterval(updateOutput, 100);
    enableInput();
    inputBox.focus();
}
init();