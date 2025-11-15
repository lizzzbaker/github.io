const compassRing = document.getElementById("compassRing");
const spinButton = document.getElementById("spinButton");
const promptType = document.getElementById("promptType");

const promptLabel = document.getElementById("promptLabel");
const promptText = document.getElementById("promptText");
const teacherTip = document.getElementById("teacherTip");

let spinning = false;

const prompts = {
  whatif: [
    {
      label: "“What if…”",
      text: "What if your shoes could talk? What would they say?",
      tip: "Ask: What would your shoes tell you about recess or reading time?"
    },
    {
      label: "“What if…”",
      text: "What if animals could come to school for a day?",
      tip: "Ask: Which animal would sit next to you?"
    },
    {
      label: "“What if…”",
      text: "What if clouds were made of cotton candy?",
      tip: "Ask students what would happen when it rains."
    }
  ],
  riddle: [
    {
      label: "Riddle",
      text: "What has a face and two hands but no arms or legs?",
      tip: "Let kids look around the room to notice clues."
    },
    {
      label: "Riddle",
      text: "What gets wetter the more it dries?",
      tip: "Have them act out washing and drying their hands."
    },
    {
      label: "Riddle",
      text: "What follows you everywhere but disappears at night?",
      tip: "Point to the floor or wall so kids notice their shadows."
    }
  ]
};

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getPrompt(type) {
  if (type === "whatif") return random(prompts.whatif);
  if (type === "riddle") return random(prompts.riddle);

  return Math.random() < 0.5
    ? random(prompts.whatif)
    : random(prompts.riddle);
}

function updatePrompt(p) {
  promptLabel.textContent = p.label;
  promptText.textContent = p.text;
  teacherTip.textContent = p.tip;
}

spinButton.addEventListener("click", () => {
  if (spinning) return;

  spinning = true;
  spinButton.disabled = true;

  compassRing.classList.add("spinning");

  setTimeout(() => {
    compassRing.classList.remove("spinning");

    const selectedType = promptType.value;
    const newPrompt = getPrompt(selectedType);
    updatePrompt(newPrompt);

    setTimeout(() => {
      spinning = false;
      spinButton.disabled = false;
    }, 150);
  }, 1000);
});
