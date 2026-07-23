/* ============================================================
   RCM — docente.js
   Renderiza el roster del curso, calcula alertas automáticas
   a partir de los datos simulados, y muestra el detalle de
   cada estudiante.
   ============================================================ */

const STATUS_LABEL = {
  locked: "Bloqueado",
  training: "En entrenamiento",
  competent: "Competente",
  mastery: "Maestría"
};

function init(){
  document.getElementById("course-title").textContent = COURSE.name;
  document.getElementById("course-code").textContent = `${COURSE.code} · ${STUDENTS.length} estudiantes`;

  renderAlerts();
  renderRoster();

  document.getElementById("btn-back-roster").addEventListener("click", () => {
    showView("view-roster");
  });
}

function showView(id){
  document.querySelectorAll(".docente-view").forEach(v => {
    v.dataset.active = (v.id === id) ? "true" : "false";
  });
}

/* ---------- Alertas automáticas ---------- */
function renderAlerts(){
  const wrap = document.getElementById("alerts-wrap");
  wrap.innerHTML = "";
  const alerts = [];

  COMPETENCIES.forEach(comp => {
    const strugglingCount = STUDENTS.filter(s => {
      const p = s.progress[comp.id];
      return p && p.status === "training";
    }).length;

    if (strugglingCount >= 3){
      alerts.push(`<b>${strugglingCount} estudiantes</b> están en entrenamiento en <b>${comp.label}</b> — podría valer la pena reforzar en clase.`);
    }
  });

  if (alerts.length === 0){
    return;
  }

  alerts.forEach(text => {
    const div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = `<span class="alert-icon">⚠️</span><span>${text}</span>`;
    wrap.appendChild(div);
  });
}

/* ---------- Roster: tabla curso completo ---------- */
function renderRoster(){
  const headRow = document.getElementById("roster-head-row");
  headRow.innerHTML = `<th>Estudiante</th>` +
    COMPETENCIES.map(c => `<th>${c.label}</th>`).join("") +
    `<th>Dominio general</th>`;

  const body = document.getElementById("roster-body");
  body.innerHTML = "";

  STUDENTS.forEach(student => {
    const tr = document.createElement("tr");
    tr.className = "roster-row";
    tr.addEventListener("click", () => openDetail(student.id));

    let cells = `<td>
      <div class="student-cell">
        <span class="avatar-sm">${student.initials}</span>
        <span class="student-name">${student.name}</span>
      </div>
    </td>`;

    let sum = 0, count = 0;
    COMPETENCIES.forEach(comp => {
      const p = student.progress[comp.id];
      const status = p ? p.status : "locked";
      cells += `<td title="${COMPETENCIES.find(c=>c.id===comp.id).label}: ${STATUS_LABEL[status]}"><span class="dot dot-${status}"></span></td>`;
      if (p && p.status !== "locked"){ sum += p.dominio; count++; }
    });

    const avg = count ? Math.round(sum / count) : 0;
    cells += `<td class="dominio-col">${avg}%</td>`;

    tr.innerHTML = cells;
    body.appendChild(tr);
  });
}

/* ---------- Vista detalle de un estudiante ---------- */
function openDetail(studentId){
  const student = STUDENTS.find(s => s.id === studentId);
  if (!student) return;

  document.getElementById("detail-avatar").textContent = student.initials;
  document.getElementById("detail-name").textContent = student.name;

  const compWrap = document.getElementById("detail-competencies");
  compWrap.innerHTML = "";
  COMPETENCIES.forEach(comp => {
    const p = student.progress[comp.id] || { status: "locked", dominio: 0 };
    const row = document.createElement("div");
    row.className = "detail-comp-row";
    row.innerHTML = `
      <span class="detail-comp-label">${comp.label}</span>
      <span class="detail-comp-track"><span class="detail-comp-fill state-${p.status}" style="width:${p.dominio}%"></span></span>
      <span class="detail-comp-pct">${p.status === "locked" ? "—" : p.dominio + "%"}</span>
    `;
    compWrap.appendChild(row);
  });

  const errorsWrap = document.getElementById("detail-errors");
  errorsWrap.innerHTML = "";
  const maxCount = Math.max(...student.errorTypes.map(e => e.count), 1);
  student.errorTypes.forEach(err => {
    const row = document.createElement("div");
    row.className = "error-bar-row";
    row.innerHTML = `
      <span class="error-bar-label"><span>${err.label}</span><span>${err.count}</span></span>
      <span class="error-bar-track"><span class="error-bar-fill" style="width:${(err.count / maxCount) * 100}%"></span></span>
    `;
    errorsWrap.appendChild(row);
  });

  const activityWrap = document.getElementById("detail-activity");
  activityWrap.innerHTML = "";
  student.recentActivity.forEach(act => {
    const li = document.createElement("li");
    li.className = "activity-item";
    li.innerHTML = `<span class="activity-date">${act.date}</span>${act.text}`;
    activityWrap.appendChild(li);
  });

  showView("view-detail");
}

init();
