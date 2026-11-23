// ─────────────────────────────────────────────────────────────
//  Todo el contenido del portafolio vive aquí.
//  Edita este archivo para cambiar textos, proyectos o enlaces.
// ─────────────────────────────────────────────────────────────

export const perfil = {
  nombre: "Ángel Jafet Contreras Carranza",
  nombreCorto: "Ángel Contreras",
  titulo: "Ingeniero en Computación",
  especialidad: "Desarrollo de software · Redes e infraestructura de TI",
  ubicacion: "Choluteca, Honduras",
  correo: "contrerasangeljafet@gmail.com",
  telefono: "+504 9537-5819",
  whatsapp: "50495375819",
  // TODO: agrega tus enlaces reales (deja "" para ocultarlos)
  github: "https://github.com/ANGELJAFET",
  linkedin: "",
  cv: "/CV_Angel_Jafet_Contreras.pdf",
  lema: "Del código al data center: desarrollo software y mantengo la infraestructura donde corre.",
  resumen:
    "Soy Ingeniero en Computación en Choluteca, con experiencia en dos frentes. En desarrollo, formo parte del equipo de GCM PROCESS, la plataforma con Next.js, React, Node.js y SQL Server que controla la producción y la trazabilidad de una planta camaronera. En infraestructura, fui el responsable del área de TI de esa misma planta: servidores, data center, respaldos, red UniFi, cableado, switches y soporte a usuarios, con formación Cisco CCNA.",
  destacados: [
    { valor: "500+", etiqueta: "endpoints REST en producción" },
    { valor: "8", etiqueta: "módulos de GCM PROCESS" },
    { valor: "CCNA", etiqueta: "redes empresariales · Cisco" },
    { valor: "TI", etiqueta: "responsable del área de una planta" },
  ],
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
  estado: "PRODUCCIÓN" | "EN DESARROLLO" | "EN OPERACIÓN";
  area: "Desarrollo" | "Infraestructura";
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
    area: "Desarrollo",
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
    codigo: "INF-01",
    area: "Infraestructura",
    nombre: "Infraestructura de TI",
    estado: "EN OPERACIÓN",
    resumen:
      "Área de TI de la planta empacadora Nova Honduras: servidores, data center, red, accesos y soporte a usuarios.",
    problema:
      "Una planta que opera por turnos necesita que sus servidores, su red y sus equipos funcionen sin interrupciones, porque de ellos dependen la producción y el pesado.",
    solucion: [
      "Administración de servidores de bases de datos y de aplicaciones, y del data center de la planta.",
      "Respaldos de bases de datos y servidores.",
      "Red inalámbrica UniFi (controladoras y access points), cableado de red y switches.",
      "Cuentas de usuario y correo, y accesos a servidores mediante escritorio remoto.",
      "Instalación y configuración de equipos y software; antivirus, actualizaciones e inventario de TI.",
      "Soporte técnico de laptops, PC, impresoras de red e impresoras de etiquetas, y del sistema de cámaras de seguridad.",
    ],
    stack: ["Servidores", "Data center", "UniFi", "Switches", "TCP/IP", "VLANs", "Escritorio remoto", "Help Desk"],
    nota: "Puesto: Asistente de TI, responsable del área de TI de la planta (Jun – Sep 2026).",
  },
  {
    codigo: "MOD-02",
    area: "Desarrollo",
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
    area: "Desarrollo",
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
    area: "Desarrollo",
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
  { nombre: "REDES", items: ["TCP/IP", "Subnetting", "VLANs", "OSPF", "NAT", "UniFi"] },
  { nombre: "INFRAESTRUCTURA", items: ["Servidores", "Data center", "Respaldos", "Switches", "Escritorio remoto", "Help Desk"] },
  { nombre: "DEVOPS", items: ["Git", "GitHub", "Docker", "IIS", "Jira", "Scrum"] },
];

export type Certificacion = { nombre: string; emisor: string; detalle: string; imagen: string };

// Las imágenes están en /public/certificados
export const certificaciones: Certificacion[] = [
  { nombre: "CCNA: Redes Empresariales, Seguridad y Automatización", emisor: "Cisco Networking Academy / UTH", detalle: "2026", imagen: "/certificados/ccna-redes-empresariales.jpg" },
  { nombre: "Network Support and Security", emisor: "Cisco Networking Academy", detalle: "2026", imagen: "/certificados/cisco-soporte-y-seguridad-de-red.jpg" },
  { nombre: "Network Addressing and Basic Troubleshooting", emisor: "Cisco Networking Academy", detalle: "2026", imagen: "/certificados/cisco-direccionamiento-de-red.jpg" },
  { nombre: "Programación de Bases de Datos con SQL", emisor: "Oracle Academy / UTH", detalle: "180 h · 2024", imagen: "/certificados/oracle-bases-de-datos-sql.jpg" },
  { nombre: "Bootcamp «PROGRÁMATE» – Desarrollador Full Stack", emisor: "USAID / UTH / Coursera for Government", detalle: "360 h · 2024", imagen: "/certificados/bootcamp-programate-full-stack.jpg" },
];
