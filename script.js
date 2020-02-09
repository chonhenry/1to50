// Global Variables
let firstHalf = [];
let secondHalf = [];
let m = 0,
  s = 0,
  ms = 0;
let current, timer;

// DOM
let button = document.getElementsByClassName("btn")[0];
let box = document.getElementsByClassName("box");
let time = document.querySelector(".stopwatch");
let heading = document.querySelector("h1");

heading.addEventListener("click", e => {
  clearInterval(timer);
});

// function
let addNumToBox = (i, arr) => {
  //   if (box[i].innerHTML == "")
  let index = Math.floor(Math.random() * arr.length); // Random number between 0 to (array length - 1)
  box[i].innerHTML = arr[index];
  arr.splice(index, 1);
};

let reset = () => {
  firstHalf = [];
  secondHalf = [];
  current = 1;
  m = 0;
  s = 0;
  ms = 0;

  for (let i = 0; i < 25; i++) {
    box[i].innerHTML = "";
  }

  button.innerHTML = "Start";

  clearInterval(timer);
  time.innerHTML = "00:00:00";
};

let runTimer = () => {
  time.innerHTML =
    (m < 10 ? "0" + m : m) +
    ":" +
    (s < 10 ? "0" + s : s) +
    ":" +
    (ms < 10 ? "0" + ms : ms);

  ms++;
  if (ms === 100) {
    ms = 0;
    s++;
  }
  if (s === 60) {
    s = 0;
    m++;
  }
};

// Event Listener
button.addEventListener("click", e => {
  if (button.innerHTML === "Start") {
    button.innerHTML = "Reset";
    current = 1;

    for (let i = 0; i < 25; i++) {
      firstHalf.push(i + 1);
      secondHalf.push(i + 26);
    }
    for (let i = 0; i < 25; i++) {
      addNumToBox(i, firstHalf);
    }

    // start timer
    timer = setInterval(runTimer, 10);
  } else if (button.innerHTML === "Reset") {
    reset();
  }
});

for (let i = 0; i < 25; i++) {
  box[i].addEventListener("click", e => {
    if (current === parseInt(box[i].innerHTML)) {
      if (box[i].innerHTML !== "" && parseInt(box[i].innerHTML) < 26) {
        addNumToBox(i, secondHalf);
      } else if (parseInt(box[i].innerHTML) > 25) {
        box[i].innerHTML = "";
      }
      current++;

      if (current > 50) {
        clearInterval(timer);
        box[0].innerHTML = "G";
        box[1].innerHTML = "A";
        box[2].innerHTML = "M";
        box[3].innerHTML = "E";
        box[5].innerHTML = "O";
        box[6].innerHTML = "V";
        box[7].innerHTML = "E";
        box[8].innerHTML = "R";
      }
    }
  });
}
