const ring = document.getElementById("compassRing");
const spinBtn = document.getElementById("spinButton");
const promptTypeSelect = document.getElementById("promptType");

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

/* MAP PROMPT TYPE → ANGLE (where the pointer should land) */
const categoryAngles = {
  whatif: 0,      // top
  imagine: 90,    // right
  wonder: 180,    // bottom
  riddle: 270     // left
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function showPrompt(category) {
  const p = pickRandom(prompts[category]);
  promptLabel.textContent = p.label;
  promptText.textContent = p.text;
  teacherTip.textContent = p.tip;
}

/* Decide which category to use for this spin */
function chooseCategory() {
  const filter = promptTypeSelect ? promptTypeSelect.value : "mixed";

  if (filter === "whatif" || filter === "riddle") {
    return filter;
  }

  // "mixed" (and any future options) — pick any quadrant
  const categories = Object.keys(categoryAngles);
  return categories[Math.floor(Math.random() * categories.length)];
}

/* SPIN ACTION */
spinBtn.addEventListener("click", () => {
  if (isSpinning) return;
  isSpinning = true;
  spinBtn.disabled = true;

  const category = chooseCategory();
  const endAngle = categoryAngles[category];

  const randomFullRotations = 360 * 2; // two full spins for drama
  const finalRotation = randomFullRotations + endAngle;

  ring.classList.add("spinning");
  ring.style.transform = `rotate(${finalRotation}deg)`;

  setTimeout(() => {
    ring.classList.remove("spinning");
    showPrompt(category);
    spinBtn.disabled = false;
    isSpinning = false;
  }, 1000);
});
