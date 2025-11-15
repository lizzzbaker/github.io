const ring = document.getElementById("compassRing");
const spinBtn = document.getElementById("spinButton");

const promptLabel = document.getElementById("promptLabel");
const promptText = document.getElementById("promptText");
const teacherTip = document.getElementById("teacherTip");

let isSpinning = false;

/* PROMPT LIBRARY */
const prompts = {
  whatif: [
    {
      label: "What if…",
      text: "What if animals could come to school for a day?",
      tip: "Ask: Which animal would sit next to you?"
    },
    {
      label: "What if…",
      text: "What if your shoes could talk?",
      tip: "Ask: What stories would they tell?"
    }
  ],
  imagine: [
    {
      label: "Imagine",
      text: "Imagine you could fly anywhere right now. Where would you go?",
      tip: "Encourage creative destinations."
    },
    {
      label: "Imagine",
      text: "Imagine your classroom turned into a jungle.",
      tip: "Ask: What animals live there?"
    }
  ],
  wonder: [
    {
      label: "Wonder",
      text: "I wonder what clouds taste like.",
      tip: "Let kids be silly and inventive."
    },
    {
      label: "Wonder",
      text: "I wonder why shadows follow us.",
      tip: "Have kids point to their own shadows."
    }
  ],
  riddle: [
    {
      label: "Riddle",
      text: "What follows you everywhere but disappears at night?",
      tip: "Point to the floor so kids notice their shadows."
    },
    {
      label: "Riddle",
      text: "What has a face and two hands but no legs?",
      tip: "Let kids look around for clocks."
    }
  ]
};

/* RANDOM PICK */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* DETERMINE WHICH QUADRANT IS SELECTED */
function determineQuadrant(finalRotation) {
  // Normalize: 0° at top, increasing clockwise because CSS rotation is clockwise
  const angle = (finalRotation % 360 + 360) % 360;

  if (angle >= 0 && angle < 90) return "top";       // What if…
  if (angle >= 90 && angle < 180) return "right";   // Imagine
  if (angle >= 180 && angle < 270) return "bottom"; // Wonder
  return "left";                                    // Riddle
}

/* MAP QUADRANTS TO PROMPT SETS */
const quadrantToPromptType = {
  top: "whatif",
  right: "imagine",
  bottom: "wonder",
  left: "riddle"
};

/* UPDATE UI */
function showPrompt(category) {
  const p = pickRandom(prompts[category]);
  promptLabel.textContent = p.label;
  promptText.textContent = p.text;
  teacherTip.textContent = p.tip;
}

/* SPIN ACTION */
spinBtn.addEventListener("click", () => {
  if (isSpinning) return;
  isSpinning = true;
  spinBtn.disabled = true;

  let randomFullRotations = 360 * 2;
  let snapAngles = [0, 90, 180, 270];
  let endAngle = snapAngles[Math.floor(Math.random() * snapAngles.length)];

  let finalRotation = randomFullRotations + endAngle;

  ring.classList.add("spinning");
  ring.style.transform = `rotate(${finalRotation}deg)`;

  setTimeout(() => {
    ring.classList.remove("spinning");

    let quadrant = determineQuadrant(endAngle);
    let category = quadrantToPromptType[quadrant];

    showPrompt(category);

    spinBtn.disabled = false;
    isSpinning = false;
  }, 1000);
});
