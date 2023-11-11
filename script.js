let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

setInterval(() => {
  let currentTime = new Date();

  hrs.innerHTML =
    (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
  min.innerHTML =
    (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
  sec.innerHTML =
    (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000);

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
const ronda = document.getElementById("ronda");
const state = document.getElementById("state");

//let intervalId;
let dynVars = [];

function extractTime(input, varName) {
  const parts = input.split(":");
  let dynamicID = "error" + varName;

  if (parts.length === 2) {
    const minutes = parseInt(parts[0]);
    const seconds = parseInt(parts[1]);
    dynVars.push(minutes * 60 + seconds);
    console.log(dynVars);

    if (!isNaN(minutes) && !isNaN(seconds)) {
      document.getElementById(
        dynamicID
      ).textContent = `${varName}: Minutes: ${minutes}, Seconds: ${seconds}`;
    } else {
      document.getElementById(dynamicID).textContent =
        'Invalid input. Please use the format "minutes:seconds".';
    }
  } else {
    document.getElementById("result").textContent =
      'Invalid input. Please use the format "minutes:seconds".';
  }
}

// Function to create and manage the gym timer
function gymTimer(array) {
  let [rounds, intervalTime, restTime, coolDownTime] = array;
  let currentRound = 1;
  let isResting = false;
  let isCoolingDown = false;

  const totalTime = rounds * (intervalTime + restTime) + coolDownTime;

  const displayTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const timerInterval = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(timerInterval);
      console.log("Gym session complete!");
    } else if (currentRound <= rounds) {
      if (!isResting && !isCoolingDown) {
        if (intervalTime > 0) {
          console.log(
            `Round ${currentRound}: Interval ${displayTime(intervalTime)}`
          );
          intervalTime--;
        } else {
          isResting = true;
          console.log(`Round ${currentRound}: Rest ${displayTime(restTime)}`);
        }
      } else if (isResting) {
        if (restTime > 0) {
          console.log(`Round ${currentRound}: Rest ${displayTime(restTime)}`);
          restTime--;
        } else {
          isResting = false;
          currentRound++;
          intervalTime = intervalTime; // Reset interval time for the next round
        }
      } else if (!isResting && currentRound > rounds) {
        if (coolDownTime > 0) {
          console.log(`Cool Down: ${displayTime(coolDownTime)}`);
          coolDownTime--;
          isCoolingDown = true;
        } else {
          isCoolingDown = false;
        }
      }
    }
    totalTime--;
  }, 1000); // Timer updates every second
}

startButton.addEventListener("click", () => {
  const r = document.getElementById("rounds").value;
  dynVars.push(r);

  const i = document.getElementById("interval").value;
  extractTime(i, "interval");

  const re = document.getElementById("rest").value;
  extractTime(re, "rest");

  const cool = document.getElementById("cooldown").value;
  extractTime(cool, "cooldown");

  ronda.innerHTML = "Round " + r;
  state.innerHTML = "Work as HELL!!!";
  //console.log(r, i, re, cool);

  // intervalId = setInterval(updateInputs, 1000); // Replace 1000 with your desired interval in milliseconds
});

resetButton.addEventListener("click", () => {
  document.getElementById("rounds").value = "";
  document.getElementById("interval").value = "";
  document.getElementById("rest").value = "";
  document.getElementById("cooldown").value = "";
  dynVars = [];
});
