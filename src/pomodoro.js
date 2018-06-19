
let pomodoro = {
    minutes : null,
    seconds : null,
    minutesDOM : document.getElementById("minutes"),
    secondsDOM : document.getElementById("seconds"),
    startButton : document.getElementById("startButton"),
    alarmSound : new Audio('src/alarm.mp3'),
    init : function() {
        this.minutes = 25;
        this.seconds = 0;
        this.setClockDOM();        
        startButton.onclick = function() {
            this.disabled = true;
            pomodoro.countdown();
            startButton.style.color = 'grey';
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
        let timerInterval = setInterval(function() {
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