/* ------------------ DATA ------------------ */
const palette = [
  { id: "cat", label: "🐱", color: "bg-blue-300" },
  { id: "dog", label: "🐶", color: "bg-green-300" },
  { id: "rabbit", label: "🐰", color: "bg-yellow-300" },
  { id: "turtle", label: "🐢", color: "bg-purple-300" }
];

let left = [];
let right = [];
let result = [];
let history = [];
let currentOp = "+";

/* ------------------ DOM ------------------ */
const paletteDiv = document.getElementById("palette");
const leftSlot = document.getElementById("leftSlot");
const rightSlot = document.getElementById("rightSlot");
const resultSlot = document.getElementById("resultSlot");
const leftCount = document.getElementById("leftCount");
const rightCount = document.getElementById("rightCount");
const resultCount = document.getElementById("resultCount");
const opSymbol = document.getElementById("opSymbol");
const numberSentence = document.getElementById("numberSentence");
const explanation = document.getElementById("explanation");
const undoBtn = document.getElementById("undoBtn");

/* ------------------ HELPERS ------------------ */
function makeInstance(base) {
  return {
    label: base.label,
    color: base.color,
    id: `${base.id}-${Math.random().toString(16).slice(2)}`
  };
}

function saveHistory() {
  history.unshift({
    left: [...left],
    right: [...right],
    result: [...result],
    op: currentOp
  });

  undoBtn.disabled = false;
  undoBtn.classList.remove("opacity-50");
}

function restoreHistory() {
  if (history.length === 0) return;

  const prev = history.shift();
  left = prev.left;
  right = prev.right;
  result = prev.result;
  currentOp = prev.op;

  if (history.length === 0) undoBtn.classList.add("opacity-50");

  updateUI();
}

/* ------------------ RENDER ------------------ */
function renderSlot(arr, slotEl) {
  slotEl.innerHTML = "";
  arr.forEach(item => {
    const bubble = document.createElement("div");
    bubble.className =
      `${item.color} fade-scale show w-10 h-10 flex items-center justify-center rounded-full text-xl border border-white/70 shadow`;
    bubble.textContent = item.label;
    slotEl.appendChild(bubble);
  });
}

function updateUI() {
  renderSlot(left, leftSlot);
  renderSlot(right, rightSlot);
  renderSlot(result, resultSlot);

  leftCount.textContent = `${left.length} friends`;
  rightCount.textContent = `${right.length} friends`;
  resultCount.textContent = `${result.length} friends`;

  numberSentence.textContent = `${left.length} ${currentOp} ${right.length} = ${result.length}`;
  opSymbol.textContent = currentOp;

  document.querySelectorAll(".opBtn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.op === currentOp);
  });
}

/* ------------------ DRAG & DROP ------------------ */

let draggedShape = null;

function createPaletteButton(shape) {
  const btn = document.createElement("div");
  btn.className =
    "palette-item px-3 py-2 rounded-full border bg-white shadow flex items-center justify-center text-xl";
  btn.textContent = shape.label;
  btn.draggable = true;

  btn.addEventListener("dragstart", e => {
    draggedShape = shape;
    e.dataTransfer.effectAllowed = "copy";

    const ghost = document.createElement("div");
    ghost.className = "drag-ghost w-10 h-10 flex items-center justify-center rounded-full text-xl";
    ghost.textContent = shape.label;
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 20, 20);

    setTimeout(() => ghost.remove(), 0);
  });

  btn.addEventListener("dragend", () => {
    draggedShape = null;
  });

  return btn;
}

palette.forEach(shape => {
  paletteDiv.appendChild(createPaletteButton(shape));
});

function allowDrop(e) {
  e.preventDefault();
}

function handleDrop(slot, which) {
  slot.addEventListener("dragover", allowDrop);
  slot.addEventListener("dragenter", () => slot.classList.add("drop-zone"));
  slot.addEventListener("dragleave", () => slot.classList.remove("drop-zone"));

  slot.addEventListener("drop", () => {
    slot.classList.remove("drop-zone");
    if (!draggedShape) return;

    saveHistory();

    if (which === "left") left.push(makeInstance(draggedShape));
    else right.push(makeInstance(draggedShape));

    updateUI();
  });
}

handleDrop(leftSlot, "left");
handleDrop(rightSlot, "right");

/* ------------------ OPERATION BUTTONS ------------------ */
document.querySelectorAll(".opBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentOp = btn.dataset.op;
    result = [];
    explanation.textContent = "";
    updateUI();
  });
});

/* ------------------ PLAY BUTTON ------------------ */
document.getElementById("playBtn").addEventListener("click", () => {
  saveHistory();

  if (currentOp === "+") {
    result = [...left, ...right].map(x => ({ ...x }));
    explanation.textContent = `We joined ${left.length} and ${right.length} friends.`;

  } else {
    const keep = Math.max(left.length - right.length, 0);
    result = left.slice(0, keep).map(x => ({ ...x }));
    explanation.textContent = `${right.length} left the group.`;
  }

  updateUI();
});

/* ------------------ OTHER CONTROLS ------------------ */
document.getElementById("clearBtn").addEventListener("click", () => {
  saveHistory();
  left = [];
  right = [];
  result = [];
  explanation.textContent = "";
  updateUI();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  saveHistory();
  left = [makeInstance(palette[0]), makeInstance(palette[0])];
  right = [makeInstance(palette[3])];
  result = [];
  explanation.textContent = "";
  updateUI();
});

undoBtn.addEventListener("click", restoreHistory);

/* ------------------ INIT ------------------ */
updateUI();
