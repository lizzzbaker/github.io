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
      tip: "Which animal would you want as your desk buddy?"
    },
    {
      label: "What if…",
      text: "What if your shoes could talk?",
      tip: "What story might they tell about your day?"
    },
    {
      label: "What if…",
      text: "What if the classroom ceiling opened and showed the sky?",
      tip: "What might you see if you looked straight up?"
    },
    {
      label: "What if…",
      text: "What if every time you blinked, the room changed colors?",
      tip: "Which color would make the room feel exciting?"
    },
    {
      label: "What if…",
      text: "What if your backpack could walk on its own?",
      tip: "Where might it wander off to?"
    },
    {
      label: "What if…",
      text: "What if all the books in the room could whisper stories?",
      tip: "Which book would you go listen to first?"
    }
  ],

  imagine: [
    {
      label: "Imagine",
      text: "Imagine you could fly anywhere right now. Where would you go?",
      tip: "Would you go somewhere warm, cold, or magical?"
    },
    {
      label: "Imagine",
      text: "Imagine your classroom turned into a jungle.",
      tip: "What kinds of sounds might you hear?"
    },
    {
      label: "Imagine",
      text: "Imagine you woke up tiny—small as a crayon.",
      tip: "What everyday thing might suddenly feel huge?"
    },
    {
      label: "Imagine",
      text: "Imagine the floor turned into a giant trampoline.",
      tip: "How high could you jump?"
    },
    {
      label: "Imagine",
      text: "Imagine you could hear animals’ thoughts.",
      tip: "Which animal would you want to talk to first?"
    },
    {
      label: "Imagine",
      text: "Imagine a friendly robot joined your class.",
      tip: "What job would you give it?"
    }
  ],

  wonder: [
    {
      label: "Wonder",
      text: "I wonder what clouds taste like.",
      tip: "If they tasted like a food, which one?"
    },
    {
      label: "Wonder",
      text: "I wonder why shadows follow us.",
      tip: "What happens to your shadow when you turn?"
    },
    {
      label: "Wonder",
      text: "I wonder where squirrels hide all their snacks.",
      tip: "If you were a squirrel, where would you put yours?"
    },
    {
      label: "Wonder",
      text: "I wonder how raindrops decide where to fall.",
      tip: "Do you think they choose randomly or take turns?"
    },
    {
      label: "Wonder",
      text: "I wonder how birds learn to sing.",
      tip: "If birds taught each other songs, what would the lessons be like?"
    },
    {
      label: "Wonder",
      text: "I wonder why some plants grow faster than others.",
      tip: "What things help plants feel strong?"
    }
  ],

  riddle: [
    {
      label: "Riddle",
      text: "What follows you everywhere but disappears at night?",
      tip: "Look around your feet… what changes when lights turn off?"
    },
    {
      label: "Riddle",
      text: "What has a face and two hands but no legs?",
      tip: "Where do you see hands that don’t touch anything?"
    },
    {
      label: "Riddle",
      text: "What has a mouth but never eats?",
      tip: "Think of things with mouths that aren’t alive."
    },
    {
      label: "Riddle",
      text: "What gets wetter the more it dries?",
      tip: "What do you use after washing your hands?"
    },
    {
      label: "Riddle",
      text: "What has keys but no doors?",
      tip: "What do your fingers press to make sound or letters?"
    },
    {
      label: "Riddle",
      text: "What can you catch but not throw?",
      tip: "Think of something tiny you sometimes share accidentally!"
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
