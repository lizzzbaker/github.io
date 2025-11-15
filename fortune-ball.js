const spinBtn = document.getElementById("spinButton");
const fortuneBall = document.getElementById("fortuneBall");
const ballLabel = document.getElementById("ballLabel");
const ballText = document.getElementById("ballText");

let isSpinning = false;

/* PROMPTS WITH UNIQUE FOLLOW-UP QUESTIONS */
const prompts = {
  whatif: [
    {
      label: "What if…",
      text: "What if clouds were made of cotton candy?",
      follow: "What flavor would your cloud be?"
    },
    {
      label: "What if…",
      text: "What if animals could talk for one day?",
      follow: "Which animal would you talk to first?"
    },
    {
      label: "What if…",
      text: "What if trees could walk around?",
      follow: "Where would your favorite tree go?"
    },
    {
      label: "What if…",
      text: "What if your backpack could fly?",
      follow: "Where would it take you?"
    },
    {
      label: "What if…",
      text: "What if your classroom turned upside down?",
      follow: "What would be the funniest thing that happens?"
    }
  ],

  imagine: [
    {
      label: "Imagine",
      text: "Imagine every desk was a tiny boat.",
      follow: "What would your boat look like?"
    },
    {
      label: "Imagine",
      text: "Imagine your class turned into a jungle.",
      follow: "What animals would you see first?"
    },
    {
      label: "Imagine",
      text: "Imagine your shoes made music with every step.",
      follow: "What song would your steps play?"
    },
    {
      label: "Imagine",
      text: "Imagine you could draw things that come alive.",
      follow: "What would you draw first?"
    },
    {
      label: "Imagine",
      text: "Imagine the playground floated in the sky.",
      follow: "What would the view look like from up there?"
    }
  ],

  wonder: [
    {
      label: "Wonder",
      text: "I wonder why shadows follow us.",
      follow: "If your shadow could talk, what would it say?"
    },
    {
      label: "Wonder",
      text: "I wonder what clouds taste like.",
      follow: "What flavor would you give them?"
    },
    {
      label: "Wonder",
      text: "I wonder why leaves fall.",
      follow: "Where do you think each leaf wants to land?"
    },
    {
      label: "Wonder",
      text: "I wonder what lives deep in the ocean.",
      follow: "What creature would you hope to find?"
    },
    {
      label: "Wonder",
      text: "I wonder why the sky turns pink at sunset.",
      follow: "If you could paint the sunset, what colors would you choose?"
    }
  ]
};

/* HELPERS */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function chooseRandomCategory() {
  const keys = Object.keys(prompts);
  return keys[Math.floor(Math.random() * keys.length)];
}

/* SHOW PROMPT */
function showPrompt(category) { 
  const chosen = pickRandom(prompts[category]);
  const followSmall = `<small>${chosen.follow}</small>`;
  const combined = `${chosen.text}\n${followSmall}`;

  // Label
  ballLabel.textContent = chosen.label;

  // Prompt + small follow-up
  ballText.innerHTML = combined;

  // Remove existing glows
  fortuneBall.classList.remove("glow-whatif", "glow-imagine", "glow-wonder");

  // Add category glow
  fortuneBall.classList.add(`glow-${category}`);
}

/* SPIN */
spinBtn.addEventListener("click", () => {
  if (isSpinning) return;

  isSpinning = true;
  fortuneBall.classList.add("spinning");

  const category = chooseRandomCategory();

  setTimeout(() => {
    showPrompt(category);
    fortuneBall.classList.remove("spinning");
    isSpinning = false;
  }, 700);
});
