


let clock = {

    minutes : null,
    seconds : null,

    getMinutes : function() {
        return minutes;
    },
    setMinutes : function(min) {
        minutes = min;
    },
    getSeconds : function () {
        return seconds;
    },
    setSeconds : function(sec) {
        seconds = sec;
    }
}

function setClockDOM() {
    minStr = clock.getMinutes().toString();
    secStr = clock.getSeconds().toString();
    if (clock.getMinutes() < 10) {
        minStr = "0" + minStr;
    }
    if (clock.getSeconds() < 10) {
        secStr = "0" + secStr;
    } 

    minutesDOM = document.getElementById("minutes");
    minutesDOM.childNodes[0].textContent = minStr;
    secondsDOM = document.getElementById("seconds");
    secondsDOM.childNodes[0].textContent = secStr;
}

function countdown() {
    let min = clock.getMinutes();
    let sec = clock.getSeconds();
        if (sec == 0)
        sec = 59;
    let timerInterval = setInterval(function() {
        clock.setSeconds(sec);
        clock.setMinutes(min);
        setClockDOM();
        sec = sec - 1;
        if (sec < 0) {
            min -= 1;
            if (min < 0) { 
                clearInterval(timerInterval);
                ready();
            }
            sec = 59; 
        }
    }, 1000);
} 

function ready() {
    console.log("ready!")
    alarmSound.play();
}


function init () {
    alarmSound = new Audio('src/alarm.mp3');
    clock.setMinutes(25);
    clock.setSeconds(0);
    setClockDOM();
}

window.onload = function(){
    init();
    let startButton = document.getElementById("startButton");
    startButton.onclick = function() {
        countdown();
    }
  };