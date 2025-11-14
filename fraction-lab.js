/* Use global UMD bundles instead of ES module imports */
const { html } = htm;
const { h, render, useState } = preact;

/* ------------------------------
   Fraction Melt & Stretch Lab
   Converted to Preact + HTM
------------------------------ */

const MAX_PIECES = 8;

const pieceColors = [
  "#ffb3c6",
  "#ffc6ff",
  "#bde0fe",
  "#caffbf",
  "#ffd6a5",
  "#e0bbff",
  "#f1c0e8",
  "#a0c4ff"
];

function FractionMeltStretchLab() {
  const [denominator, setDenominator] = useState(2);
  const [isMelted, setIsMelted] = useState(true);

  const [denA, setDenA] = useState(2);
  const [denB, setDenB] = useState(3);
  const [compareAsBars, setCompareAsBars] = useState(false);

  const handleMainSlider = (e) => {
    const v = Number(e.target.value);
    setDenominator(v);
    setIsMelted(true);
  };

  return html`
    <div class="fraction-lab-root">
      <div class="fraction-lab-shell">

        <header class="fraction-lab-header">
          <div class="title-badge-row">
            <h1>Fraction Melt & Stretch Lab</h1>
            <span class="age-tag">Best for grades 2–4</span>
          </div>
          <p>
            Make fractions feel squishy and alive! Melt one blob into equal pieces,
            then stretch them into bars to compare how big each fraction really is.
          </p>
        </header>

        <!-- MAIN MELT SECTION -->
        <section class="fraction-card">
          <div class="card-title-row">
            <h2 class="card-title">Melt the Blob</h2>
            <span class="card-subtitle">Break 1 whole into equal parts</span>
          </div>

          <div class="lab-layout">
            <div class="lab-visual">
              <div class=${"blob-stage " + (isMelted ? "blob-stage--melted" : "blob-stage--whole")}>

                <!-- Whole Blob -->
                <div class=${"whole-blob " + (isMelted ? "whole-blob--hidden" : "whole-blob--show")}>
                  <span class="blob-label">1 whole</span>
                </div>

                <!-- Melted Pieces -->
                <div class=${"pieces-wrap " + (isMelted ? "pieces-wrap--visible" : "pieces-wrap--hidden")}>
                  ${Array.from({ length: denominator }).map((_, idx) =>
                    html`
                      <div
                        class="blob-piece"
                        style=${{
                          background:
                            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.9), " +
                            pieceColors[idx % pieceColors.length] +
                            ")"
                        }}
                      >
                        <span class="piece-label">1/${denominator}</span>
                      </div>
                    `
                  )}
                </div>
              </div>

              <div class="lab-buttons-row">
                <button
                  class="pill-btn pill-btn--primary"
                  onClick=${() => setIsMelted(!isMelted)}
                >
                  ${isMelted ? "Fuse back to 1 whole" : "Melt into pieces"}
                </button>
              </div>
            </div>

            <!-- Controls -->
            <div class="lab-controls">
              <p class="hint-label">Slide to choose how many equal pieces.</p>

              <div class="slider-row">
                <input
                  class="cute-slider"
                  type="range"
                  min="2"
                  max=${MAX_PIECES}
                  value=${denominator}
                  onInput=${handleMainSlider}
                />
                <div class="slider-value">
                  <span class="slider-pill">1/${denominator}</span>
                </div>
              </div>

              <div class="readout-card">
                <p>The blob is split into <strong>${denominator}</strong> equal pieces.</p>
                <p>Each little blob is exactly <strong>1/${denominator}</strong> of the whole.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- COMPARE FRACTIONS SECTION -->
        ${FractionCompare({ denA, setDenA, denB, setDenB, compareAsBars, setCompareAsBars })}
      </div>
    </div>
  `;
}

function FractionCompare({ denA, setDenA, denB, setDenB, compareAsBars, setCompareAsBars }) {
  const explanation =
    denA === denB
      ? "Both blobs are the same size because they are cut into the same number of pieces."
      : denA < denB
      ? `Blob A is bigger: 1/${denA} is larger than 1/${denB}.`
      : `Blob B is bigger: 1/${denB} is larger than 1/${denA}.`;

  return html`
    <section class="fraction-card fraction-card--compare">
      <div class="card-title-row">
        <h2 class="card-title">Compare Fractions</h2>
        <span class="card-subtitle">Stretch blobs into bars</span>
      </div>

      <div class="compare-layout">
        <div class="compare-row">
          ${FractionPicker({ label: "Blob A", denominator: denA, onChange: setDenA })}
          ${FractionPicker({ label: "Blob B", denominator: denB, onChange: setDenB })}
        </div>

        <div class="compare-actions">
          <button
            class="pill-btn pill-btn--ghost"
            onClick=${() => setCompareAsBars(!compareAsBars)}
          >
            ${compareAsBars ? "Show as blobs" : "Compare as bars"}
          </button>
        </div>

        <div class="compare-visual">
          ${compareAsBars
            ? html`
                <div class="compare-bars-wrap">
                  ${FractionBarRow({ tag: "A", denominator: denA })}
                  ${FractionBarRow({ tag: "B", denominator: denB })}
                </div>
              `
            : html`
                <div class="compare-blobs-row">
                  ${MiniBlob({ label: "A", denominator: denA })}
                  ${MiniBlob({ label: "B", denominator: denB })}
                </div>
              `}
        </div>

        <p class="compare-explanation">${explanation}</p>
      </div>
    </section>
  `;
}

function FractionPicker({ label, denominator, onChange }) {
  return html`
    <div class="picker-card">
      <div class="picker-header">
        <div class="picker-label-group">
          <span class="picker-label-circle">${label}</span>
          <span class="picker-label-text">Choose a fraction</span>
        </div>
        <span class="picker-frac">1/${denominator}</span>
      </div>

      <input
        class="cute-slider"
        type="range"
        min="2"
        max=${MAX_PIECES}
        value=${denominator}
        onInput=${(e) => onChange(Number(e.target.value))}
      />

      <p class="picker-note">
        This blob is broken into <strong>${denominator}</strong> equal parts.
      </p>
    </div>
  `;
}

function MiniBlob({ label, denominator }) {
  return html`
    <div class="mini-blob-card">
      <div class="mini-blob-label-row">
        <span class="mini-tag">${label}</span>
        <span class="mini-frac">1/${denominator}</span>
      </div>

      <div class="mini-blob-shape-wrap">
        <div class="mini-blob-shape">
          ${Array.from({ length: denominator }).map(
            (_, idx) => html`
              <span
                key=${idx}
                class="mini-blob-dot"
                style=${{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.9), " +
                    pieceColors[idx % pieceColors.length] +
                    ")"
                }}
              ></span>
            `
          )}
        </div>
      </div>
    </div>
  `;
}

function FractionBarRow({ tag, denominator }) {
  const widthPercent = (1 / denominator) * 100;
  return html`
    <div class="bar-row">
      <div class="bar-label">
        <span class="mini-tag">${tag}</span>
        <span class="mini-frac">1/${denominator}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style=${{ width: widthPercent + "%" }}></div>
      </div>
    </div>
  `;
}

/* Mount App */
render(h(FractionMeltStretchLab, {}), document.getElementById("app"));
