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
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const ronda = document.getElementById("ronda");
const state = document.getElementById("state");
const darkToggle = document.getElementById("darkToggle"); // Replace 'checkbox' with the actual ID of your checkbox

dynVars = [1, 1, 1, 0];
let y = 0;
// dynVars = [];

darkToggle.addEventListener("change", function () {
  document.body.classList.toggle("dark-mode", darkToggle.checked);
});

///////////////////////////////////Take all inputs//////////////////////////////////
function extractTime(input, varName) {
  const parts = input.split(":");

  if (parts.length === 2) {
    const minutes = parseInt(parts[0]);
    const seconds = parseInt(parts[1]);
    dynVars.push(minutes * 60 + seconds);

    if (!isNaN(minutes) && !isNaN(seconds)) {
      error.innerHTML = "🟢";
    } else {
      error.innerHTML = `🔴Invalid input. Please use the format "minutes:seconds".+${varName}`;
    }
  } else {
    error.innerHTML = `🔴Invalid input. Please use the format "minutes:seconds".+${varName}`;
  }
}
//////////////Convert and Display time Format///////////
function displayToTimeFormat(y, tagSec, tagMin, tagHrs) {
  tagHrs.innerHTML =
    (`${Math.floor(y / 3600)}` < 10 ? "0" : "") + `${Math.floor(y / 3600)}`;
  const remSec = y % 3600;
  tagMin.innerHTML =
    (`${Math.floor(remSec / 60)}` < 10 ? "0" : "") +
    `${Math.floor(remSec / 60)}`;
  tagSec.innerHTML = (`${remSec % 60}` < 10 ? "0" : "") + `${remSec % 60}`;
}

///////////////// test area ////////////////////////
/////////////////test area////////////////////////

// Function to simulate async operation
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Countdown function
async function countdown(number, type) {
  for (let i = number; i >= 0; i--) {
    //Update DOM Interval/ Rest and Main Timer.
    state.innerHTML = `${type}`;
    displayToTimeFormat(i, timerSec, timerMin, timerHrs);
    await delay(1000); // wait for 1 second
    //Update DOM Session Timer
    y++;
    displayToTimeFormat(y, Ssec, Smin, Shrs);
  }
}

// Main function for interval training
async function hiitTimer(interval, rest, rounds, cool) {
  let paused = false;
  //Update DOM the start state of the Rounds
  const r = rounds;
  ronda.innerHTML = "Round: " + `${r}` + "/" + `${r}`;

  // Function to handle pause and resume
  async function handlePause() {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (!paused) {
          clearInterval(intervalId);
          resolve();
        }
      }, 100);
    });
  }

  // Button press event example and update Pause button text
  document.getElementById("pauseButton").addEventListener("click", () => {
    paused = !paused;
    const buttonText = paused ? "Resume" : "Pause";
    pauseButton.innerText = buttonText;
  });

  // Loop through rounds
  while (rounds > 0) {
    // Interval countdown
    await handlePause();
    await countdown(interval, "Interval");

    // Rest countdown
    if (rounds > 1) {
      await handlePause();
      await countdown(rest, "Rest");
    }

    rounds--;
    //Update DOM the following state of the Rounds
    ronda.innerHTML = "Round: " + `${rounds}` + "/" + `${r}`;
  }

  // Cool down countdown
  await handlePause();
  await countdown(cool, "Cool Down");
  complete.innerHTML = "FINISHED!";
}

startButton.addEventListener("click", () => {
  // This will build the output -> dynVars =[rounds, interval, rest, cool down ]
  // const r = document.getElementById("rounds").value;
  // dynVars.push(r * 1);

  // const i = document.getElementById("interval").value;
  // extractTime(i, "Interval");

  // const re = document.getElementById("rest").value;
  // extractTime(re, "Rest");

  // const cool = document.getElementById("cooldown").value;
  // extractTime(cool, "Cooldown");

  // console.log(dynVars);
  // hiitTimer(dynVars);
  // Start the HIIT timer
  hiitTimer(2, 3, 3, 5);
});

pauseButton.addEventListener("click", () => {});

resetButton.addEventListener("click", () => {
  document.getElementById("rounds").value = "";
  document.getElementById("interval").value = "";
  document.getElementById("rest").value = "";
  document.getElementById("cooldown").value = "";
  rounds = 0;
  Ssec.innerHTML = "00";
  Smin.innerHTML = "00";
  Shrs.innerHTML = "00";
  timerSec.innerHTML = "00";
  timerMin.innerHTML = "00";
  timerHrs.innerHTML = "00";
  state.innerHTML = "Interval/Rest";
  ronda.innerHTML = "Round 0/0";
  pauseButton.innerHTML = "Pause";
  dynVars = [];
});
