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

dynVars = [];

///////////////////////////////////Take al inputs//////////////////////////////////
function extractTime(input, varName) {
  const parts = input.split(":");
  let errorID = "error" + varName;

  if (parts.length === 2) {
    const minutes = parseInt(parts[0]);
    const seconds = parseInt(parts[1]);
    dynVars.push(minutes * 60 + seconds);

    if (!isNaN(minutes) && !isNaN(seconds)) {
      document.getElementById(
        errorID
      ).textContent = `${varName}: Minutes: ${minutes}, Seconds: ${seconds}`;
    } else {
      document.getElementById(errorID).textContent =
        'Invalid input. Please use the format "minutes:seconds".';
    }
  } else {
    document.getElementById("result").textContent =
      'Invalid input. Please use the format "minutes:seconds".';
  }
}
////////////////////////////Hiit Timer function /////////////////////////////////////
// Function to async countdowns
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
let y = 0;
// Countdown function for interval and rest
async function countdown(number, type) {
  for (let i = number; i >= 0; i--) {
    state.innerHTML = `${type}:`;
    displayToTimeFormat(i, timerSec, timerMin, timerHrs);

    await delay(1000); // wait for 1 second
    y++;
    displayToTimeFormat(y, Ssec, Smin, Shrs);
  }
}

function displayToTimeFormat(y, tagSec, tagMin, tagHrs) {
  tagHrs.innerHTML =
    (`${Math.floor(y / 3600)}` < 10 ? "0" : "") + `${Math.floor(y / 3600)}`;
  const remSec = y % 3600;
  tagMin.innerHTML =
    (`${Math.floor(remSec / 60)}` < 10 ? "0" : "") +
    `${Math.floor(remSec / 60)}`;
  tagSec.innerHTML = (`${remSec % 60}` < 10 ? "0" : "") + `${remSec % 60}`;
}

// Main function for Timer countdown
async function hiitTimer([rounds, interval, rest, cool]) {
  const r = rounds;
  ronda.innerHTML = "Round: " + `${r}` + "/" + `${r}`;
  while (rounds > 0) {
    // Interval countdown
    await countdown(interval, "Interval");

    // Rest countdown
    if (rounds > 1) {
      await countdown(rest, "Rest");
    }

    rounds--;
    ronda.innerHTML = "Round: " + `${rounds}` + "/" + `${r}`;
  }

  // Cool down countdown
  await countdown(cool, "Cool Down");
  errorInterval.innerHTML = "Complete!";
}

// Example usage with interval = 5, rest = 3, rounds = 3, cool = 10

startButton.addEventListener("click", () => {
  // This will build the output -> dynVars =[rounds, interval, rest, cool down ]

  const r = document.getElementById("rounds").value;
  dynVars.push(r * 1);

  const i = document.getElementById("interval").value;
  extractTime(i, "Interval");

  const re = document.getElementById("rest").value;
  extractTime(re, "Rest");

  const cool = document.getElementById("cooldown").value;
  extractTime(cool, "Cooldown");

  // Start the HIIT timer

  console.log(dynVars);
  hiitTimer(dynVars);
});

resetButton.addEventListener("click", () => {
  document.getElementById("rounds").value = "";
  document.getElementById("interval").value = "";
  document.getElementById("rest").value = "";
  document.getElementById("cooldown").value = "";
  dynVars = [];
});
