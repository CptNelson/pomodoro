
let pomodoro = {
    minutes : null,
    seconds : null,
    savedMin : null,
    savedSec : null,
    timerInterval : null,
    minutesDOM : document.getElementById("minutes"),
    secondsDOM : document.getElementById("seconds"),
    startButton : document.getElementById("startButton"),
    addOne : document.getElementById("addOne"),
    addFive : document.getElementById("addFive"),
    decOne : document.getElementById("decOne"),
    decFive : document.getElementById("decFive"),
    alarmSound : new Audio('src/alarm.mp3'),
    init : function() {
        this.minutes = 25;
        this.seconds = 0;
        this.setClockDOM();
        startButton.state = 0;
        
        addOne.onclick = function() {
            pomodoro.minutes += 1;
            pomodoro.setClockDOM();
        }
        
        addFive.onclick = function() {
            pomodoro.minutes += 5;
            pomodoro.setClockDOM();
        }
        decOne.onclick = function() {
            pomodoro.minutes -= 1;
            pomodoro.setClockDOM();
        }
        decFive.onclick = function() {
            pomodoro.minutes -= 5;
            pomodoro.setClockDOM();
        }

        startButton.onclick = function() {
            if (this.state == 0) {
                this.textContent = "reset"
                pomodoro.savedMin = pomodoro.minutes;
                pomodoro.savedSec = pomodoro.seconds;
                pomodoro.countdown();
                addOne.style.color = 'grey';
                decOne.style.color = 'grey';
                addFive.style.color = 'grey';
                decFive.style.color = 'grey';
                addOne.disabled = true;
                decOne.disabled = true;
                addFive.disabled = true;
                decFive.disabled = true;
                this.state = 1;
            } else {
                this.textContent = "start"
                pomodoro.minutes = pomodoro.savedMin;
                pomodoro.seconds = pomodoro.savedSec;
                startButton.style.color = 'black';
                addOne.style.color = 'black';
                decOne.style.color = 'black';
                addFive.style.color = 'black';
                decFive.style.color = 'black';
                addOne.disabled = false;
                decOne.disabled = false;
                addFive.disabled = false;
                decFive.disabled = false;
                clearInterval(timerInterval);
                pomodoro.setClockDOM();
                this.state = 0;
            }
        }
    },
    setClockDOM : function() {
        minStr = this.minutes.toString();
        secStr = this.seconds.toString();
        if (this.minutes < 10) {
            minStr = "0" + minStr;
        }
        if (this.seconds < 10) {
            secStr = "0" + secStr;
        } 

        this.minutesDOM.childNodes[0].textContent = minStr;
        this.secondsDOM.childNodes[0].textContent = secStr;
    },
    countdown : function() {
        let self = this;
        let min = self.minutes - 1;
        let sec = self.seconds;
            if (sec == 0)
            sec = 59;
        timerInterval = setInterval(function() {
            self.seconds = sec;
            self.minutes = min;
            sec = sec - 1;
            if (sec < 0) {
                min -= 1;
                if (min < 0) { 
                    clearInterval(timerInterval);
                    this.ready();
                }
                sec = 59; 
            }
            self.setClockDOM();
        }, 1000);
    }, 
    ready : function() {
        console.log("ready!")
        alarmSound.play();
    }
}

window.onload = function(){
    pomodoro.init();
  };