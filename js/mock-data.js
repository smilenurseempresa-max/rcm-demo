/* ============================================================
   RCM — Datos simulados para el panel docente (DEMO)
   En la versión con backend, este archivo se reemplaza por
   llamadas reales a la base de datos.
   ============================================================ */

const COURSE = {
  name: "Enfermería · 2° año · Sección A",
  code: "ENF201-A",
  studentsCount: 8
};

const COMPETENCIES = [
  { id: "sentido_numerico", label: "Sentido numérico" },
  { id: "suma",             label: "Suma" },
  { id: "resta",            label: "Resta" },
  { id: "multiplicacion",   label: "Multiplicación" },
  { id: "division",         label: "División" },
  { id: "proporcionalidad", label: "Proporcionalidad" },
  { id: "conversion",       label: "Conversión de unidades" },
  { id: "dosis",            label: "Cálculo de dosis" },
  { id: "goteo",            label: "Goteo e infusión" }
];

/* status: "locked" | "training" | "competent" | "mastery" */

const STUDENTS = [
  {
    id: "s1", name: "María Fernanda Soto", initials: "MS",
    progress: {
      sentido_numerico:{status:"mastery",dominio:96},
      suma:{status:"mastery",dominio:94},
      resta:{status:"mastery",dominio:91},
      multiplicacion:{status:"competent",dominio:84},
      division:{status:"competent",dominio:80},
      proporcionalidad:{status:"training",dominio:58},
      conversion:{status:"locked",dominio:0},
      dosis:{status:"locked",dominio:0},
      goteo:{status:"locked",dominio:0}
    },
    errorTypes:[
      {label:"Razón invertida", count:3},
      {label:"Confundió mg con mL", count:1}
    ],
    recentActivity:[
      {date:"Hoy",text:"Proporcionalidad — 58% dominio, 2 intentos con razón invertida"},
      {date:"Ayer",text:"División — Maestría alcanzada"}
    ]
  },
  {
    id: "s2", name: "Joaquín Pérez Bravo", initials: "JP",
    progress: {
      sentido_numerico:{status:"mastery",dominio:98},
      suma:{status:"mastery",dominio:95},
      resta:{status:"mastery",dominio:93},
      multiplicacion:{status:"mastery",dominio:92},
      division:{status:"mastery",dominio:90},
      proporcionalidad:{status:"competent",dominio:86},
      conversion:{status:"competent",dominio:82},
      dosis:{status:"training",dominio:64},
      goteo:{status:"locked",dominio:0}
    },
    errorTypes:[
      {label:"Factor 10", count:2},
      {label:"Olvidó convertir unidades", count:2}
    ],
    recentActivity:[
      {date:"Hoy",text:"Cálculo de dosis — 64% dominio, error de factor 10"},
      {date:"Hoy",text:"Conversión de unidades — Competente"}
    ]
  },
  {
    id: "s3", name: "Antonia Reyes Muñoz", initials: "AR",
    progress: {
      sentido_numerico:{status:"competent",dominio:82},
      suma:{status:"competent",dominio:78},
      resta:{status:"training",dominio:61},
      multiplicacion:{status:"training",dominio:55},
      division:{status:"locked",dominio:0},
      proporcionalidad:{status:"locked",dominio:0},
      conversion:{status:"locked",dominio:0},
      dosis:{status:"locked",dominio:0},
      goteo:{status:"locked",dominio:0}
    },
    errorTypes:[
      {label:"Confundió orden de la resta", count:4},
      {label:"Factor 10", count:2}
    ],
    recentActivity:[
      {date:"Hoy",text:"Multiplicación — 55% dominio, 3 intentos fallidos"},
      {date:"Hace 2 días",text:"Resta — sigue en entrenamiento"}
    ]
  },
  {
    id: "s4", name: "Benjamín Torres Lagos", initials: "BT",
    progress: {
      sentido_numerico:{status:"mastery",dominio:97},
      suma:{status:"mastery",dominio:96},
      resta:{status:"mastery",dominio:94},
      multiplicacion:{status:"mastery",dominio:93},
      division:{status:"mastery",dominio:95},
      proporcionalidad:{status:"training",dominio:52},
      conversion:{status:"locked",dominio:0},
      dosis:{status:"locked",dominio:0},
      goteo:{status:"locked",dominio:0}
    },
    errorTypes:[
      {label:"Razón invertida", count:5},
      {label:"No supo por dónde empezar", count:2}
    ],
    recentActivity:[
      {date:"Hoy",text:"Proporcionalidad — 52% dominio, 4to intento"},
      {date:"Hoy",text:"Proporcionalidad — razón invertida (segunda vez)"}
    ]
  },
  {
    id: "s5", name: "Catalina Vidal Rojas", initials: "CV",
    progress: {
      sentido_numerico:{status:"mastery",dominio:99},
      suma:{status:"mastery",dominio:97},
      resta:{status:"mastery",dominio:96},
      multiplicacion:{status:"mastery",dominio:95},
      division:{status:"mastery",dominio:94},
      proporcionalidad:{status:"mastery",dominio:93},
      conversion:{status:"mastery",dominio:91},
      dosis:{status:"competent",dominio:85},
      goteo:{status:"training",dominio:70}
    },
    errorTypes:[
      {label:"Confundió gotas con mL", count:2}
    ],
    recentActivity:[
      {date:"Hoy",text:"Goteo e infusión — 70% dominio"},
      {date:"Ayer",text:"Cálculo de dosis — Competente"}
    ]
  },
  {
    id: "s6", name: "Diego Salinas Contreras", initials: "DS",
    progress: {
      sentido_numerico:{status:"competent",dominio:79},
      suma:{status:"training",dominio:63},
      resta:{status:"training",dominio:59},
      multiplicacion:{status:"locked",dominio:0},
      division:{status:"locked",dominio:0},
      proporcionalidad:{status:"locked",dominio:0},
      conversion:{status:"locked",dominio:0},
      dosis:{status:"locked",dominio:0},
      goteo:{status:"locked",dominio:0}
    },
    errorTypes:[
      {label:"Factor 10", count:5},
      {label:"Olvidó el signo", count:2}
    ],
    recentActivity:[
      {date:"Hoy",text:"Resta — 59% dominio, factor 10 (3ra vez)"},
      {date:"Hace 3 días",text:"Suma — sigue en entrenamiento"}
    ]
  },
  {
    id: "s7", name: "Fernanda Molina Ibáñez", initials: "FM",
    progress: {
      sentido_numerico:{status:"mastery",dominio:95},
      suma:{status:"mastery",dominio:92},
      resta:{status:"competent",dominio:83},
      multiplicacion:{status:"competent",dominio:81},
      division:{status:"training",dominio:66},
      proporcionalidad:{status:"locked",dominio:0},
      conversion:{status:"locked",dominio:0},
      dosis:{status:"locked",dominio:0},
      goteo:{status:"locked",dominio:0}
    },
    errorTypes:[
      {label:"Invirtió la división", count:3},
      {label:"Factor 10", count:1}
    ],
    recentActivity:[
      {date:"Hoy",text:"División — 66% dominio, invirtió la división"},
    ]
  },
  {
    id: "s8", name: "Ignacio Herrera Paz", initials: "IH",
    progress: {
      sentido_numerico:{status:"training",dominio:48},
      suma:{status:"locked",dominio:0},
      resta:{status:"locked",dominio:0},
      multiplicacion:{status:"locked",dominio:0},
      division:{status:"locked",dominio:0},
      proporcionalidad:{status:"locked",dominio:0},
      conversion:{status:"locked",dominio:0},
      dosis:{status:"locked",dominio:0},
      goteo:{status:"locked",dominio:0}
    },
    errorTypes:[
      {label:"No supo por dónde empezar", count:4},
      {label:"Confundió mg con mL", count:2}
    ],
    recentActivity:[
      {date:"Hoy",text:"Sentido numérico — 48% dominio, aún construyendo la base"}
    ]
  }
];
