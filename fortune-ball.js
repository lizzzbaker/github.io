const spinBtn = document.getElementById("spinButton");
const fortuneBall = document.getElementById("fortuneBall");
const ballLabel = document.getElementById("ballLabel");
const ballText = document.getElementById("ballText");

let isSpinning = false;

/* FOLLOW-UP QUESTIONS */
const followups = {
  whatif: "What might happen next?",
  imagine: "What would it feel like?",
  wonder: "Why do you think so?",
  riddle: "Can you explain your guess?"
};

/* PROMPTS */
const prompts = {
  whatif: [
    { label: "What if…", text: "What if clouds were made of cotton candy?" },
    { label: "What if…", text: "What if animals could talk for one day?" },
    { label: "What if…", text: "What if trees could walk around?" },
    { label: "What if…", text: "What if your backpack could fly?" },
    { label: "What if…", text: "What if rain fell in rainbow colors?" }
  ],

  imagine: [
    { label: "Imagine", text: "Imagine the floor became a trampoline." },
    { label: "Imagine", text: "Imagine your class turned into a jungle." },
    { label: "Imagine", text: "Imagine your shoes made music with each step." },
    { label: "Imagine", text: "Imagine every desk was a tiny boat." }
  ],

  wonder: [
    { label: "Wonder", text: "I wonder why shadows follow us." },
    { label: "Wonder", text: "I wonder what clouds taste like." },
    { label: "Wonder", text: "I wonder how birds know where to fly." },
    { label: "Wonder", text: "I wonder why the moon changes shape." }
  ],

  riddle: [
    { label: "Riddle", text: "What has hands but cannot clap?" },
    { label: "Riddle", text: "What can run but cannot walk?" },
    { label: "Riddle", text: "What gets wetter as it dries?" },
    { label: "Riddle", text: "What has a neck but no head?" }
  ]
};

/* COLOR GLOW CLASSES */
const glowClass = {
  whatif: "glow-whatif",
  imagine: "glow-imagine",
  wonder: "glow-wonder",
  riddle: "glow-riddle"
};

/* HELPERS */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function chooseCategory() {
  const c = Object.keys(prompts);
  return c[Math.floor(Math.random() * c.length)];
}

/* MAIN UPDATE */
function showPrompt(category) {
  const chosen = pickRandom(prompts[category]);

  // update label + prompt + follow-up
  ballLabel.textContent = chosen.label;
  ballText.innerHTML = `${chosen.text}<br><span class="follow">${followups[category]}</span>`;

  // apply glow class
  fortuneBall.className = "fortune-ball " + glowClass[category];
}

/* SPIN */
spinBtn.addEventListener("click", () => {
  if (isSpinning) return;

  isSpinning = true;
  fortuneBall.classList.add("spinning");

  const category = chooseCategory();

  setTimeout(() => {
    showPrompt(category);
    fortuneBall.classList.remove("spinning");
    isSpinning = false;
  }, 700);
});
