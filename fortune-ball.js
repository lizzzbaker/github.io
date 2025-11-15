const spinBtn = document.getElementById("spinButton");
const fortuneBall = document.getElementById("fortuneBall");
const ballLabel = document.getElementById("ballLabel");
const ballText = document.getElementById("ballText");

let isSpinning = false;

/* PROMPT LIBRARY — 10+ per category */

const prompts = {
  whatif: [
    { label: "What if…", text: "What if clouds were made of cotton candy?" },
    { label: "What if…", text: "What if animals could talk for one day?" },
    { label: "What if…", text: "What if trees could walk around?" },
    { label: "What if…", text: "What if your backpack could fly?" },
    { label: "What if…", text: "What if the floor turned into lava?" },
    { label: "What if…", text: "What if you woke up as a tiny mouse?" },
    { label: "What if…", text: "What if books could whisper stories?" },
    { label: "What if…", text: "What if rain fell in rainbow colors?" },
    { label: "What if…", text: "What if we had school on the moon?" },
    { label: "What if…", text: "What if shadows could dance on their own?" }
  ],

  imagine: [
    { label: "Imagine", text: "Imagine the floor became a trampoline." },
    { label: "Imagine", text: "Imagine your class turned into a jungle." },
    { label: "Imagine", text: "Imagine your shoes made music with each step." },
    { label: "Imagine", text: "Imagine every desk was a tiny boat." },
    { label: "Imagine", text: "Imagine you could draw things that come alive." },
    { label: "Imagine", text: "Imagine the playground floated in the sky." },
    { label: "Imagine", text: "Imagine you could talk to your favorite toy." },
    { label: "Imagine", text: "Imagine your classroom suddenly shrank!" },
    { label: "Imagine", text: "Imagine you could walk through walls." },
    { label: "Imagine", text: "Imagine the school pet grew to the size of a car." }
  ],

  wonder: [
    { label: "Wonder", text: "I wonder why shadows follow us." },
    { label: "Wonder", text: "I wonder what clouds taste like." },
    { label: "Wonder", text: "I wonder how birds know where to fly." },
    { label: "Wonder", text: "I wonder why the moon changes shape." },
    { label: "Wonder", text: "I wonder why leaves fall." },
    { label: "Wonder", text: "I wonder what ants think about." },
    { label: "Wonder", text: "I wonder what lives deep in the ocean." },
    { label: "Wonder", text: "I wonder if stars make noise." },
    { label: "Wonder", text: "I wonder how rain knows when to fall." },
    { label: "Wonder", text: "I wonder why we dream." }
  ],

  riddle: [
    { label: "Riddle", text: "What has hands but cannot clap?" },
    { label: "Riddle", text: "What has a face but no mouth?" },
    { label: "Riddle", text: "What gets wetter as it dries?" },
    { label: "Riddle", text: "What has a tail but no body?" },
    { label: "Riddle", text: "What has keys but can’t open doors?" },
    { label: "Riddle", text: "What can run but cannot walk?" },
    { label: "Riddle", text: "What has a mouth but never talks?" },
    { label: "Riddle", text: "What has a neck but no head?" },
    { label: "Riddle", text: "What has legs but cannot walk?" },
    { label: "Riddle", text: "What has a ring but no finger?" }
  ]
};

/* RANDOM HELPERS */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function chooseCategory() {
  const categories = Object.keys(prompts);
  return categories[Math.floor(Math.random() * categories.length)];
}

/* UPDATE BALL */
function showPrompt(category) {
  const chosen = pickRandom(prompts[category]);
  ballLabel.textContent = chosen.label;
  ballText.textContent = chosen.text;
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
