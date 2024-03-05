const analogText = "Hour Hand at %sdeg\nMinute Hand at %sdeg\nSecond Hand at %sdeg";
const displayView = document.getElementsByName("display")[0];

function formatText(text, ...args) {
  return args.reduce((prevVal, currentVal) => prevVal.replace(/%s/, currentVal), text);
}

class Time {
  constructor() {
    const date = new Date();

    this.hour24Format = date.getHours();
    this.hour = this.hour24Format % 12;
    this.amPM = this.hour24Format >= 12 ? "PM" : "AM";
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
  }
}

class Clock {
  constructor() {
    if (new.target === Clock) {
      throw new Error("Clock is abstract, cannot be instantiated.");
    }

    if (!this.currentTime) {
      throw new Error("Inheriting class must define currentTime() method.");
    }

    this.getTime = () => new Time();
  }
}

class AnalogClock extends Clock {
  currentTime() {
    const time = this.getTime();
    const hourDegree = time.hour24Format * (360 / 12);
    const minuteDegree = time.minutes * (360 / 60);
    const secondsDegree = time.seconds * (360 / 60);

    return formatText(analogText, hourDegree, minuteDegree, secondsDegree);
  }
}

class DigitalClock extends Clock {
  currentTime() {
    const time = this.getTime();
    const time12HeFormat = `${time.hour24Format}:${time.minutes}:${time.seconds} ${time.amPM}`;
    return time12HeFormat;
  }
}

const analogClock = new AnalogClock();
const digitalClock = new DigitalClock();

function handleDigitalTimeButtonClick() {
  displayView.value = digitalClock.currentTime();
}

function handleAnalogTimeButtonClick() {
  displayView.value = analogClock.currentTime();
}

document.getElementById("showDigitalTimeButton").addEventListener("click", handleDigitalTimeButtonClick);
document.getElementById("showAnalogTimeButton").addEventListener("click", handleAnalogTimeButtonClick);
