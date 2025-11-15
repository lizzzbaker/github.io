const spinBtn = document.getElementById("spinButton");
const promptTypeSelect = document.getElementById("promptType");

const fortuneBall = document.getElementById("fortuneBall");
const ballLabel = document.getElementById("ballLabel");
const ballText = document.getElementById("ballText");

const promptLabel = document.getElementById("promptLabel");
const promptText = document.getElementById("promptText");

let isSpinning = false;

/* PROMPT LIBRARY */
const prompts = {
  whatif: [
    { label:"What if…", text:"What if animals could come to school for a day?" },
    { label:"What if…", text:"What if your shoes could talk?" },
    { label:"What if…", text:"What if clouds could fall like pillows?" },
    { label:"What if…", text:"What if books could whisper stories?" }
  ],

  imagine: [
    { label:"Imagine", text:"Imagine your class turned into a jungle." },
    { label:"Imagine", text:"Imagine you woke up tiny—small as a crayon." },
    { label:"Imagine", text:"Imagine the floor turned into a trampoline." }
  ],

  wonder: [
    { label:"Wonder", text:"I wonder what clouds taste like." },
    { label:"Wonder", text:"I wonder why shadows follow us." },
    { label:"Wonder", text:"I wonder how raindrops choose where to fall." }
  ],

  riddle: [
    { label:"Riddle", text:"What follows you everywhere but disappears at night?" },
    { label:"Riddle", text:"What has a face and two hands but no legs?" },
    { label:"Riddle", text:"What gets wetter the more it dries?" }
  ]
};

/* CATEGORY → CSS COLOR CLASS */
const categoryClass = {
  whatif: "fortune-whatif",
  imagine: "fortune-imagine",
  wonder: "fortune-wonder",
  riddle: "fortune-riddle"
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function chooseCategory() {
  const filter = promptTypeSelect.value;
  if (filter !== "mixed") return filter;
  return Object.keys(prompts)[Math.floor(Math.random() * 4)];
}

function showPrompt(category) {
  const chosen = pickRandom(prompts[category]);

  // Update ball
  fortuneBall.className = "fortune-ball " + categoryClass[category];
  ballLabel.textContent = chosen.label;
  ballText.textContent = chosen.text;

  // Update card
  promptLabel.textContent = chosen.label;
  promptText.textContent = chosen.text;
}

/* SPIN ACTION */
spinBtn.addEventListener("click", () => {
  if (isSpinning) return;

  isSpinning = true;
  fortuneBall.classList.add("spinning");

  const category = chooseCategory();

  setTimeout(() => {
    showPrompt(category);
    fortuneBall.classList.remove("spinning");
    isSpinni
