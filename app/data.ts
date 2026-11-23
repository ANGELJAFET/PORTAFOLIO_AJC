// ─────────────────────────────────────────────────────────────
//  Todo el contenido del portafolio vive aquí.
//  Edita este archivo para cambiar textos, proyectos o enlaces.
// ─────────────────────────────────────────────────────────────

export const perfil = {
  nombre: "Ángel Jafet Contreras Carranza",
  nombreCorto: "Ángel Contreras",
  titulo: "Desarrollador Full Stack",
  ubicacion: "Choluteca, Honduras",
  correo: "contrerasangeljafet@gmail.com",
  telefono: "+504 9537-5819",
  whatsapp: "50495375819",
  // TODO: agrega tus enlaces reales (deja "" para ocultarlos)
  github: "",
  linkedin: "",
  cv: "/CV_Angel_Jafet_Contreras.pdf",
  lema: "Desarrollo los sistemas que una planta usa todos los días.",
  resumen:
    "Soy desarrollador Full Stack en Choluteca. Trabajo con Next.js, React, Node.js y SQL Server, y formo parte del equipo que desarrolla GCM PROCESS, la plataforma que controla la producción y la trazabilidad de una planta camaronera. Antes fui el responsable de TI de esa misma planta, así que conozco tanto el código como los servidores y la red donde corre.",
};

export type Etapa = {
  id: string;
  estacion: string;
  titulo: string;
  lugar: string;
  periodo: string;
  puntos: string[];
};

// La "línea de proceso": la trayectoria contada como una línea de planta.
export const lineaDeProceso: Etapa[] = [
  {
    id: "recepcion",
    estacion: "01 · Recepción",
    titulo: "Formación",
    lugar: "Inst. José Cecilio del Valle · UTH",
    periodo: "Hasta 2026",
    puntos: [
      "Bachillerato Técnico en Informática (Choluteca).",
      "Ingeniería en Computación, UTH — egresado, en proceso de graduación.",
      "Bootcamp PROGRÁMATE Full Stack (360 h) y Programación de BD con SQL de Oracle Academy (180 h).",
    ],
  },
  {
    id: "clasificado",
    estacion: "02 · Clasificado",
    titulo: "Asistente de TI",
    lugar: "Grupo Camaronero Milcien · Planta Nova Honduras",
    periodo: "Jun 2026 – Sep 2026",
    puntos: [
      "Responsable del área de TI de la planta empacadora.",
      "Servidores de bases de datos y aplicaciones, data center y respaldos.",
      "Red inalámbrica UniFi, cableado y switches; cuentas, correo y accesos por escritorio remoto.",
      "Instalación de equipos, antivirus y actualizaciones, inventario de TI, cámaras de seguridad y soporte a usuarios.",
    ],
  },
  {
    id: "empaque",
    estacion: "03 · Empaque",
    titulo: "Desarrollador de Software",
    lugar: "Nova Honduras · Grupo Camaronero Milcien",
    periodo: "Oct 2026 – Actualidad",
    puntos: [
      "Equipo de desarrollo de GCM PROCESS (producción, inventario y trazabilidad).",
      "Funcionalidades web, API y SQL Server en Clasificado, Descabezado y Pelado.",
      "App de escritorio de pesado con Electron: QR, pesado automático y auto‑actualización.",
      "Git/GitHub con ramas y pull requests; despliegues con Docker e IIS.",
    ],
  },
];

export type Modulo = {
  codigo: string;
  nombre: string;
  estado: "PRODUCCIÓN" | "EN DESARROLLO";
  resumen: string;
  problema: string;
  solucion: string[];
  stack: string[];
  metricas?: { valor: string; etiqueta: string }[];
  nota?: string;
};

// Proyectos presentados como "módulos en producción".
export const modulos: Modulo[] = [
  {
    codigo: "MOD-01",
    nombre: "GCM PROCESS",
    estado: "PRODUCCIÓN",
    resumen:
      "Plataforma que gestiona la producción, el inventario y la trazabilidad de una planta procesadora de camarón.",
    problema:
      "La planta necesitaba seguir cada canasta y cada bin desde la recepción hasta el empaque, con datos en tiempo real para supervisores y operadores.",
    solucion: [
      "Funcionalidades en Clasificado, Descabezado y Pelado: Proceso para Empaque, transferencia directa de canastas, Avance de Bines, cambio de turno de bines y varias tallas por remisión.",
      "Vista en vivo del pesado automático.",
      "Procedimientos almacenados y triggers en SQL Server con scripts de cambio y reversa para QA y producción.",
      "Roles y permisos de pantallas en la plataforma de accesos corporativa (IAM).",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "SQL Server", "Docker", "IIS"],
    metricas: [
      { valor: "8", etiqueta: "módulos" },
      { valor: "90", etiqueta: "pantallas web" },
      { valor: "33", etiqueta: "vistas móviles" },
      { valor: "500+", etiqueta: "endpoints REST" },
    ],
    nota: "Sistema privado de la empresa: el código no es público.",
  },
  {
    codigo: "MOD-02",
    nombre: "Pesado Automático",
    estado: "PRODUCCIÓN",
    resumen:
      "Aplicación de escritorio conectada a básculas industriales por puerto serial.",
    problema:
      "El registro manual de pesos era lento y propenso a errores en la línea de Clasificado.",
    solucion: [
      "Escaneo de etiquetas QR para identificar canastas.",
      "Pesado automático en Clasificado leyendo la báscula por puerto serial.",
      "Actualización automática de la aplicación en las estaciones de trabajo.",
    ],
    stack: ["Electron", "Node.js", "Puerto serial", "QR", "SQL Server"],
    nota: "Pruébalo: la app Báscula de este escritorio es un homenaje a este módulo.",
  },
  {
    codigo: "MOD-03",
    nombre: "GCM Tickets",
    estado: "PRODUCCIÓN",
    resumen:
      "Sistema de mesa de ayuda para registrar, asignar y dar seguimiento a las solicitudes de soporte de TI.",
    problema:
      "Las solicitudes de soporte llegaban por canales sueltos y no había seguimiento ni historial.",
    solucion: [
      "Registro de solicitudes con asignación a técnicos y seguimiento de estado.",
      "Desarrollado de principio a fin y en producción en los servidores de Grupo Milcien.",
    ],
    stack: ["Next.js", "Node.js", "SQL Server", "IIS"],
    nota: "La app Tickets de este escritorio funciona igual: así puedes contactarme.",
  },
  {
    codigo: "MOD-04",
    nombre: "Rendimientos y Metas",
    estado: "EN DESARROLLO",
    resumen:
      "Módulo de productividad: tiempos, paros, metas por talla y personal, OEE y OLE.",
    problema:
      "Detectar procesos sobrepoblados o con déficit de personal y medir la eficiencia real de máquinas y mano de obra.",
    solucion: [
      "Análisis y desarrollo de tiempos, paros y metas por talla y por personal.",
      "Productividad en libras por hora‑hombre.",
      "Eficiencia de máquinas (OEE) y de mano de obra (OLE).",
      "Cálculo del personal requerido por proceso.",
    ],
    stack: ["Next.js", "SQL Server", "T‑SQL", "Análisis"],
  },
];

export type Rack = { nombre: string; items: string[] };

export const racks: Rack[] = [
  { nombre: "FRONTEND", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Material UI", "Zustand"] },
  { nombre: "BACKEND", items: ["Node.js", "Express", "APIs REST", "JWT", "SSO", "IAM / Roles"] },
  { nombre: "DATOS", items: ["SQL Server", "T‑SQL", "Procedimientos", "Triggers", "Vistas", "Oracle"] },
  { nombre: "INTEGRACIÓN", items: ["Electron", "Puerto serial", "Básculas", "Códigos QR"] },
  { nombre: "REDES", items: ["TCP/IP", "VLANs", "OSPF", "NAT", "UniFi", "Switches"] },
  { nombre: "DEVOPS", items: ["Git", "GitHub", "Docker", "IIS", "Jira", "Scrum"] },
];

export const certificaciones = [
  { nombre: "Bootcamp «PROGRÁMATE» – Desarrollador Full Stack", emisor: "USAID / UTH / Coursera for Government", detalle: "360 h · 2024" },
  { nombre: "Programación de Bases de Datos con SQL", emisor: "Oracle Academy / UTH", detalle: "180 h · 2024" },
  { nombre: "CCNA: Redes Empresariales, Seguridad y Automatización", emisor: "Cisco Networking Academy / UTH", detalle: "2026" },
  { nombre: "Network Support and Security", emisor: "Cisco Networking Academy", detalle: "2026" },
  { nombre: "Network Addressing and Basic Troubleshooting", emisor: "Cisco Networking Academy", detalle: "2026" },
];
