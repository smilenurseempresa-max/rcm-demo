/* ============================================================
   RCM — app.js
   Motor del entrenamiento: navegación, intentos, puntuación,
   sin calculadora — el estudiante razona cada paso.
   ============================================================ */

const state = {
  stepIndex: 0,
  attempts: {},          // { stepId: numero de intentos usados }
  categoryScores: {
    comprension: [],
    interpretacion: [],
    estrategia: [],
    resultado: []
  }
};

/* ---------- Splash ---------- */
document.getElementById("btn-start").addEventListener("click", () => {
  document.querySelector(".pulse-line").classList.add("idle-pulse");
  goToScreen("screen-home");
});

/* ---------- Home ---------- */
document.getElementById("btn-init-training").addEventListener("click", () => {
  resetTrainingState();
  goToScreen("screen-training");
  renderStep(0);
});

document.getElementById("btn-restart").addEventListener("click", () => {
  goToScreen("screen-home");
});

function resetTrainingState(){
  state.stepIndex = 0;
  state.attempts = {};
  state.categoryScores = { comprension: [], interpretacion: [], estrategia: [], resultado: [] };
  document.getElementById("visual-bar").hidden = true;
  document.getElementById("bar-track").innerHTML = "";
}

/* ---------- Render de cada paso del entrenamiento ---------- */
function renderStep(index){
  const step = TRAINING_STEPS[index];
  state.stepIndex = index;
  if (!(step.id in state.attempts)) state.attempts[step.id] = 0;

  // progreso
  const total = TRAINING_STEPS.length;
  document.getElementById("progress-fill").style.width = `${(index / total) * 100}%`;
  document.getElementById("progress-count").textContent = `Paso ${index + 1} de ${total}`;

  document.getElementById("question-text").textContent = step.question;
  document.getElementById("visual-bar").hidden = true;
  document.getElementById("bar-track").innerHTML = "";

  const optionsWrap = document.getElementById("options");
  const inputWrap = document.getElementById("calc-input-block");
  const questionBlock = document.getElementById("question-block");

  // reinicia animación de entrada
  questionBlock.style.animation = "none";
  void questionBlock.offsetWidth;
  questionBlock.style.animation = "";

  if (step.type === "choice"){
    inputWrap.hidden = true;
    questionBlock.hidden = false;
    optionsWrap.innerHTML = "";

    step.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.textContent = opt.text;
      btn.addEventListener("click", () => handleChoice(btn, opt, step));
      optionsWrap.appendChild(btn);
    });
  } else if (step.type === "input"){
    questionBlock.hidden = false;
    optionsWrap.innerHTML = "";
    inputWrap.hidden = false;
    const input = document.getElementById("calc-input");
    input.value = "";
    input.disabled = false;
    input.focus();
  }
}

/* ---------- Manejo de respuestas de opción múltiple ---------- */
function handleChoice(btnEl, opt, step){
  const optionsWrap = document.getElementById("options");
  const allOptions = optionsWrap.querySelectorAll(".option");

  if (opt.correct){
    allOptions.forEach(o => o.classList.add("is-disabled"));
    btnEl.classList.add("is-correct");
    state.attempts[step.id] += 1;
    registerScore(step, state.attempts[step.id]);

    if (step.showBarAfter){
      showVisualBar(() => advanceAfterDelay());
    } else {
      advanceAfterDelay();
    }
  } else {
    btnEl.classList.add("is-wrong");
    btnEl.classList.add("is-disabled");
    state.attempts[step.id] += 1;
  }
}

function advanceAfterDelay(){
  setTimeout(() => {
    const next = state.stepIndex + 1;
    if (next < TRAINING_STEPS.length){
      renderStep(next);
    } else {
      finishTraining();
    }
  }, 900);
}

/* ---------- Barra visual (500 mg repartidos en 5 mL) ---------- */
function showVisualBar(onDone){
  const wrap = document.getElementById("visual-bar");
  const track = document.getElementById("bar-track");
  const caption = document.getElementById("bar-caption");
  wrap.hidden = false;
  track.innerHTML = "";

  const segments = TRAINING_CASE.ampolla_mL; // 5
  const perSegment = TRAINING_CASE.ampolla_mg / segments; // 100

  for (let i = 0; i < segments; i++){
    const seg = document.createElement("div");
    seg.className = "bar-segment";
    seg.textContent = `${perSegment} mg`;
    track.appendChild(seg);
  }
  caption.textContent = `${segments} mL repartidos en partes iguales`;

  // anima entrada secuencial
  const segEls = track.querySelectorAll(".bar-segment");
  segEls.forEach((el, i) => {
    setTimeout(() => el.classList.add("grow"), 120 * i);
  });

  setTimeout(onDone, 120 * segments + 700);
}

/* ---------- Manejo de la respuesta final (input numérico) ---------- */
document.getElementById("btn-check-calc").addEventListener("click", () => {
  const step = TRAINING_STEPS[state.stepIndex];
  const input = document.getElementById("calc-input");
  const raw = input.value.trim().replace(",", ".");
  const value = parseFloat(raw);

  state.attempts[step.id] = (state.attempts[step.id] || 0) + 1;

  if (!isNaN(value) && Math.abs(value - step.answer) < 0.01){
    input.style.borderColor = "var(--pulse)";
    registerScore(step, state.attempts[step.id]);
    input.disabled = true;
    setTimeout(finishTraining, 700);
  } else {
    input.style.borderColor = "#FF6B6B";
    input.parentElement.style.animation = "none";
    void input.parentElement.offsetWidth;
    input.parentElement.style.animation = "shake .32s var(--ease)";
  }
});

document.getElementById("calc-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("btn-check-calc").click();
});

/* ---------- Puntuación ----------
   1er intento correcto = 100
   2do intento          = 70
   3er intento o más    = 40
------------------------------------------------------------ */
function registerScore(step, attemptsUsed){
  let score = 40;
  if (attemptsUsed === 1) score = 100;
  else if (attemptsUsed === 2) score = 70;
  state.categoryScores[step.category].push(score);
}

/* ---------- Fin del entrenamiento → pantalla de resultado ---------- */
function finishTraining(){
  goToScreen("screen-result");
  renderResult();
}

function average(arr){
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function scoreToStars(score){
  return Math.max(1, Math.round(score / 20));
}

function renderResult(){
  const cats = state.categoryScores;
  const summary = {
    comprension: average(cats.comprension),
    interpretacion: average(cats.interpretacion),
    estrategia: average(cats.estrategia),
    resultado: average(cats.resultado)
  };

  document.querySelectorAll(".stars").forEach(el => {
    const key = el.dataset.key;
    const stars = scoreToStars(summary[key]);
    el.innerHTML = "";
    for (let i = 0; i < 5; i++){
      const span = document.createElement("span");
      span.textContent = "★";
      span.className = i < stars ? "on" : "off";
      el.appendChild(span);
    }
  });

  const mastery = Math.round(average(Object.values(summary)));
  document.getElementById("mastery-value").textContent = `${mastery}%`;

  // reinicia animaciones de entrada del resultado
  document.querySelectorAll("#screen-result .result-row, #screen-result .mastery-banner, #screen-result .result-closing, #screen-result .btn")
    .forEach(el => {
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    });
}
