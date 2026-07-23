/* ============================================================
   RCM — Caso clínico y preguntas del entrenamiento "Comprender antes de calcular"
   Cada paso pertenece a una categoría de evaluación:
     comprension | interpretacion | estrategia | resultado
   ============================================================ */

const TRAINING_CASE = {
  ampolla_mg: 500,
  ampolla_mL: 5,
  dosis_indicada_mg: 250
};

const TRAINING_STEPS = [

  {
    id: "step1",
    type: "choice",
    category: "comprension",
    question: "¿Qué representa el número 500?",
    options: [
      { text: "La cantidad total de mg disponibles en la ampolla", correct: true },
      { text: "La dosis que debes administrar al paciente", correct: false },
      { text: "El volumen que debes inyectar", correct: false }
    ]
  },

  {
    id: "step2",
    type: "choice",
    category: "comprension",
    question: "¿Qué representa el número 5?",
    options: [
      { text: "El volumen total de la ampolla, en mL", correct: true },
      { text: "Una cantidad de miligramos", correct: false },
      { text: "Las gotas por minuto a pasar", correct: false }
    ]
  },

  {
    id: "step3",
    type: "choice",
    category: "interpretacion",
    question: "Debes administrar 250 mg. ¿Qué necesitas encontrar?",
    options: [
      { text: "mg", correct: false },
      { text: "mL", correct: true },
      { text: "gotas por minuto", correct: false }
    ]
  },

  {
    id: "step4",
    type: "choice",
    category: "estrategia",
    question: "Para saber cuánto hay en 1 mL, ¿qué operación harías primero?",
    options: [
      { text: "Sumar", correct: false },
      { text: "Restar", correct: false },
      { text: "Multiplicar", correct: false },
      { text: "Dividir", correct: true }
    ]
  },

  {
    id: "step5",
    type: "choice",
    category: "estrategia",
    question: "Sin calcular: ¿cuánto hay en 1 mL?",
    showBarAfter: true,
    options: [
      { text: "500 mg", correct: false },
      { text: "250 mg", correct: false },
      { text: "100 mg", correct: true },
      { text: "50 mg", correct: false }
    ]
  },

  {
    id: "step6",
    type: "input",
    category: "resultado",
    question: "¿Cuántos mL administras para dar 250 mg?",
    answer: 2.5
  }
];
