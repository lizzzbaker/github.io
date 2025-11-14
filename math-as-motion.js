const { useState } = React;
const { motion, AnimatePresence } = window["framer-motion"];

const paletteShapes = [
  { id: "cat", label: "🐱", color: "bg-blue-300" },
  { id: "dog", label: "🐶", color: "bg-green-300" },
  { id: "rabbit", label: "🐰", color: "bg-yellow-300" },
  { id: "turtle", label: "🐢", color: "bg-purple-300" },
];

const makeShapeInstance = (base) => ({
  ...base,
  id: `${base.id}-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
});

function MathAsMotionPlayground() {
  const [leftShapes, setLeftShapes] = useState([
    makeShapeInstance(paletteShapes[0]),
    makeShapeInstance(paletteShapes[0]),
  ]);
  const [rightShapes, setRightShapes] = useState([
    makeShapeInstance(paletteShapes[3]),
  ]);

  const [resultShapes, setResultShapes] = useState([]);
  const [operation, setOperation] = useState("+");
  const [activeSlot, setActiveSlot] = useState("left");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [lastExplanation, setLastExplanation] = useState("");
  const [history, setHistory] = useState([]);

  const leftCount = leftShapes.length;
  const rightCount = rightShapes.length;

  function addShapeToSlot(slot, baseShape) {
    if (isPlaying || slot === "result") return;
    const instance = makeShapeInstance(baseShape);
    if (slot === "left") setLeftShapes((p) => [...p, instance]);
    if (slot === "right") setRightShapes((p) => [...p, instance]);
  }

  function addShapeToActive(baseShape) {
    addShapeToSlot(activeSlot, baseShape);
  }

  function handleDragStartFromPalette(e, shapeId) {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: "palette", shapeId })
    );
  }

  function handleDropToSlot(e, slot) {
    e.preventDefault();
    if (isPlaying || slot === "result") return;

    try {
      const raw = e.dataTransfer.getData("application/json");
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.type === "palette") {
        const base = paletteShapes.find((s) => s.id === data.shapeId);
        if (base) addShapeToSlot(slot, base);
      }
    } catch {}
  }

  function clearGroups() {
    if (isPlaying) return;
    setLeftShapes([]);
    setRightShapes([]);
    setResultShapes([]);
    setShowResult(false);
    setLastExplanation("");
  }

  function resetStarter() {
    if (isPlaying) return;
    setLeftShapes([
      makeShapeInstance(paletteShapes[0]),
      makeShapeInstance(paletteShapes[0]),
    ]);
    setRightShapes([makeShapeInstance(paletteShapes[3])]);
    setResultShapes([]);
    setShowResult(false);
    setLastExplanation("");
  }

  function undoLast() {
    if (isPlaying) return;
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const [last, ...rest] = prev;
      setLeftShapes(last.beforeLeft);
      setRightShapes(last.beforeRight);
      setResultShapes(last.beforeResult);
      setOperation(last.beforeOp);
      setShowResult(false);
      setLastExplanation("");
      return rest;
    });
  }

  function applyOperation() {
    if (isPlaying) return;
    if (leftCount === 0 && rightCount === 0) return;

    const before = {
      beforeLeft: [...leftShapes],
      beforeRight: [...rightShapes],
      beforeResult: [...resultShapes],
      beforeOp: operation,
    };

    let newResult = [];
    let explanation = "";

    if (operation === "+") {
      const combined = [...leftShapes, ...rightShapes];
      newResult = combined.map((s) => ({ ...s, id: `${s.id}-r` }));
      explanation = `We joined ${leftCount} friends and ${rightCount} friends to make ${combined.length} friends.`;
    } else {
      const toKeep = Math.max(leftCount - rightCount, 0);
      newResult = leftShapes
        .slice(0, toKeep)
        .map((s) => ({ ...s, id: `${s.id}-r` }));
      explanation = `We started with ${leftCount}. ${rightCount} left. Now there are ${toKeep}.`;
    }

    setHistory((prev) => [{ id: Date.now(), ...before }, ...prev]);
    setShowResult(false);
    setIsPlaying(true);
    setResultShapes(newResult);
    setLastExplanation(explanation);

    setTimeout(() => {
      setShowResult(true);
      setIsPlaying(false);
    }, 500);
  }

  const OperationButton = ({ symbol, label, kidWord, colorClass }) => {
    const active = operation === symbol;

    return React.createElement(
      "button",
      {
        onClick: () => !isPlaying && setOperation(symbol),
        className:
          `flex flex-col items-center justify-center px-3 py-2 rounded-3xl border-2 text-xs shadow-md min-w-[76px] transition ` +
          (active
            ? `${colorClass} text-white border-transparent scale-105`
            : "bg-white text-slate-800 border-slate-200"),
      },
      React.createElement("span", { className: "text-2xl mb-0.5" }, symbol),
      React.createElement("span", { className: "font-bold text-[0.7rem]" }, label),
      React.createElement(
        "span",
        { className: "text-[0.6rem] text-slate-700 text-center" },
        kidWord
      )
    );
  };

  const ShapeBubble = ({ shape, big, pop }) =>
    React.createElement(
      motion.div,
      {
        layout: true,
        initial: { scale: 0.6, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.5, opacity: 0 },
        transition: { type: "spring", stiffness: 260, damping: 18 },
        className:
          `flex items-center justify-center rounded-full ` +
          (big ? "w-11 h-11 text-2xl" : "w-9 h-9 text-xl") +
          ` ${shape.color} shadow-md border border-white/70 ${
            pop ? "animate-bounce" : ""
          }`,
      },
      React.createElement("span", null, shape.label)
    );

  const Slot = ({ title, shapes, side, highlight, showAsResult }) => {
    const active = activeSlot === side;
    const isResult = side === "result";

    return React.createElement(
      "div",
      {
        onClick: () => !isPlaying && !isResult && setActiveSlot(side),
        onDragOver: (e) => e.preventDefault(),
        onDrop: (e) => handleDropToSlot(e, side),
        className:
          `flex-1 min-h-[110px] rounded-3xl border shadow-inner px-3 py-3 bg-white/90 transition ` +
          (highlight
            ? "border-pink-200 bg-pink-50/80"
            : active && !isResult
            ? "border-sky-300 bg-sky-50/80"
            : "border-slate-100"),
      },
      React.createElement(
        "div",
        {
          className:
            "flex items-center justify-between mb-1 text-[0.7rem] font-bold text-slate-600 uppercase",
        },
        React.createElement("span", null, title),
        React.createElement(
          "span",
          { className: "text-slate-400" },
          `${shapes.length} friends`
        )
      ),

      React.createElement(
        "div",
        {
          className: "flex flex-wrap gap-2 items-center justify-center",
        },
        React.createElement(
          AnimatePresence,
          { mode: "popLayout" },
          shapes.length === 0
            ? React.createElement(
                motion.span,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className: "text-[0.7rem] text-slate-300 italic",
                },
                isResult
                  ? "Press play to see what happens."
                  : "Drag or tap friends here."
              )
            : shapes.map((s) =>
                React.createElement(ShapeBubble, {
                  key: s.id,
                  shape: s,
                  big: true,
                  pop: isResult && showAsResult,
                })
              )
        )
      )
    );
  };

  const opWord = operation === "+" ? "add" : "subtract";
  const sayItWithNumbers = () =>
    `${leftCount} ${operation} ${rightCount} = ${resultShapes.length}`;

  return React.createElement(
    "div",
    {
      className:
        "w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-[32px] border border-pink-100 shadow-2xl p-4 md:p-6 flex flex-col gap-3",
    },

    // Header
    React.createElement(
      "header",
      { className: "flex items-center justify-between gap-3" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          { className: "text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900" },
          "Math as Motion"
        ),
        React.createElement(
          "p",
          { className: "text-xs md:text-sm text-slate-600 max-w-xs mt-1" },
          "Drag friends into two groups, pick a magic move, then press play to see the new group."
        )
      ),
      React.createElement(
        "div",
        { className: "hidden md:flex flex-col items-end text-[0.7rem] text-slate-500" },
        React.createElement("span", null, "K–3 play mode"),
        React.createElement("span", null, "Visual addition & subtraction")
      )
    ),

    // Main section
    React.createElement(
      "section",
      { className: "flex flex-col gap-3" },

      // Friends panel
      React.createElement(
        "div",
        {
          className:
            "bg-gradient-to-r from-white via-pink-50 to-pink-100 rounded-[24px] border border-pink-100 shadow-md p-3 flex flex-col gap-2",
        },
        React.createElement(
          "div",
          { className: "flex items-center justify-between" },
          React.createElement(
            "span",
            { className: "text-sm font-bold text-slate-800" },
            "1. Choose friends"
          ),
          React.createElement(
            "span",
            { className: "text-[0.7rem] text-slate-500" },
            "Drag or tap friends into the groups below."
          )
        ),

        React.createElement(
          "div",
          { className: "flex flex-wrap gap-2 mt-1" },
          paletteShapes.map((shape) =>
            React.createElement(
              "button",
              {
                key: shape.id,
                onClick: () => addShapeToActive(shape),
                draggable: true,
                onDragStart: (e) => handleDragStartFromPalette(e, shape.id),
                className:
                  "flex items-center justify-center px-2.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs text-slate-700 active:scale-95 transition min-w-[40px]",
              },
              React.createElement(
                "span",
                {
                  className:
                    `w-7 h-7 rounded-full ${shape.color} flex items-center justify-center text-lg border border-white/70`,
                },
                shape.label
              )
            )
          )
        ),

        React.createElement(
          "div",
          { className: "flex flex-wrap gap-2 mt-2 text-[0.7rem]" },
          React.createElement(
            "button",
            {
              onClick: clearGroups,
              className:
                "px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-slate-300 active:scale-95 transition",
            },
            "Clear"
          ),
          React.createElement(
            "button",
            {
              onClick: resetStarter,
              className:
                "px-3 py-1.5 rounded-full border border-pink-200 bg-pink-50 text-pink-800 hover:border-pink-300 active:scale-95 transition",
            },
            "Reset"
          ),
          React.createElement(
            "button",
            {
              onClick: undoLast,
              className:
                "px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 active:scale-95 transition",
            },
            "Undo"
          )
        )
      ),

      // Groups
      React.createElement(
        "div",
        { className: "flex flex-col md:flex-row gap-3" },

        React.createElement(
          "div",
          {
            className:
              "flex-1 bg-gradient-to-br from-white via-sky-50 to-violet-50 rounded-[24px] border border-sky-100 shadow-md p-3 flex flex-col gap-2",
          },
          React.createElement(
            "div",
            { className: "flex flex-col gap-2" },

            React.createElement(
              "div",
              { className: "flex items-center gap-2 md:gap-3" },
              React.createElement(Slot, {
                title: "Group A",
                shapes: leftShapes,
                side: "left",
                highlight: activeSlot === "left",
                showAsResult: false,
              }),
              React.createElement(
                motion.div,
                {
                  animate: { scale: isPlaying ? 1.2 : 1 },
                  transition: { type: "spring", stiffness: 260, damping: 18 },
                  className:
                    "flex flex-col items-center justify-center text-pink-500 font-extrabold text-3xl min-w-[34px]",
                },
                operation
              ),
              React.createElement(Slot, {
                title: "Group B",
                shapes: rightShapes,
                side: "right",
                highlight: activeSlot === "right",
                showAsResult: false,
              })
            ),

            React.createElement(
              "div",
              { className: "flex items-center gap-2 md:gap-3" },
              React.createElement(
                "div",
                {
                  className:
                    "flex flex-col items-center justify-center text-slate-500 text-2xl min-w-[20px]",
                },
                "="
              ),
              React.createElement(Slot, {
                title: "New group",
                shapes: showResult ? resultShapes : [],
                side: "result",
                highlight: showResult,
                showAsResult: showResult,
              })
            )
          ),

          React.createElement(
            "div",
            {
              className:
                "text-[0.75rem] text-slate-700 bg-white/95 rounded-2xl border border-slate-100 px-3 py-2 flex flex-col gap-0.5 mt-1",
            },
            React.createElement(
              "span",
              { className: "font-semibold text-slate-800" },
              "Say it with numbers:"
            ),
            sayItWithNumbers()
          ),

          lastExplanation &&
            React.createElement(
              "div",
              { className: "text-[0.7rem] text-slate-600 mt-1" },
              React.createElement(
                "span",
                { className: "font-semibold text-slate-800" },
                "What happened:"
              ),
              " ",
              lastExplanation
            )
        ),

        React.createElement(
          "div",
          {
            className:
              "w-full md:w-56 bg-gradient-to-r from-white via-sky-50 to-sky-100 rounded-[24px] border border-sky-100 shadow-md p-3 flex flex-col gap-2",
          },
          React.createElement(
            "span",
            { className: "text-sm font-bold text-slate-800" },
            "Magic move"
          ),
          React.createElement(
            "p",
            { className: "text-[0.7rem] text-slate-600" },
            "Pick how the groups will change."
          ),

          React.createElement(
            "div",
            { className: "grid grid-cols-2 gap-2" },
            React.createElement(OperationButton, {
              symbol: "+",
              label: "Add",
              kidWord: "Put together",
              colorClass: "bg-pink-500",
            }),
            React.createElement(OperationButton, {
              symbol: "-",
              label: "Subtract",
              kidWord: "Take away",
              colorClass: "bg-amber-400",
            })
          ),

          React.createElement(
            "button",
            {
              onClick: applyOperation,
              className:
                "mt-1 w-full py-2 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-violet-500 text-white text-sm font-extrabold shadow-lg active:scale-[0.97] transition flex items-center justify-center gap-2",
            },
            React.createElement("span", { className: "text-lg" }, "▶"),
            React.createElement(
              "span",
              null,
              isPlaying ? "Playing..." : "Play the move"
            )
          ),

          React.createElement(
            "p",
            { className: "text-[0.7rem] text-slate-500" },
            `Say it out loud: "They will ${opWord}!"`
          )
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(MathAsMotionPlayground)
);
