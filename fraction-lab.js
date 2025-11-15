const ball = document.getElementById("fortuneBall");
const fortuneLabel = document.getElementById("fortuneLabel");
const fortunePrompt = document.getElementById("fortunePrompt");

/* category → class name for color */
const categoryClass = {
  whatif: "fortune-whatif",
  imagine: "fortune-imagine",
  wonder: "fortune-wonder",
  riddle: "fortune-riddle"
};

function showPrompt(category) {
  const p = pickRandom(prompts[category]);
  fortuneLabel.textContent = p.label;
  fortunePrompt.textContent = p.text;

  /* apply color */
  ball.className = "fortune-ball " + categoryClass[category];
}

spinBtn.addEventListener("click", () => {
  if (isSpinning) return;
  isSpinning = true;

  ball.classList.add("spinning");

  const category = chooseCategory();

  setTimeout(() => {
    showPrompt(category);
    ball.classList.remove("spinning");
    isSpinning = false;
  }, 600);
});
