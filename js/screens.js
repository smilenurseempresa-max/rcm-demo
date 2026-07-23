/* ============================================================
   RCM — Control simple de pantallas (una visible a la vez)
   ============================================================ */

function goToScreen(id){
  document.querySelectorAll(".screen").forEach(el => {
    el.dataset.active = (el.id === id) ? "true" : "false";
  });
}
