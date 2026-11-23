"use client";

import { useEffect, useState } from "react";
import { perfil } from "@/app/data";

// Formulario de contacto con forma de ticket de mesa de ayuda (como GCM Tickets).
// No necesita servidor: arma un correo ordenado y listo para enviar.
const TIPOS = ["Oferta de empleo", "Proyecto freelance", "Consulta técnica", "Otro"];
const MODALIDADES = ["Presencial", "Híbrido", "Remoto"];
const PRIORIDADES = [
  { valor: "Normal", color: "text-turquesa border-turquesa" },
  { valor: "Alta", color: "text-ambar border-ambar" },
  { valor: "Urgente", color: "text-led-rojo border-led-rojo" },
];

const limpiar = (t: string) => t.trim().replace(/\s+/g, " ");

export default function Ticket() {
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipo, setTipo] = useState(TIPOS[0]);
  const [puesto, setPuesto] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [prioridad, setPrioridad] = useState(PRIORIDADES[0].valor);
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<"" | "enviado" | "copiado">("");
  const [numero, setNumero] = useState("TK-······");
  useEffect(() => setNumero(`TK-${String(Date.now()).slice(-6)}`), []);

  const esEmpleo = tipo === "Oferta de empleo";

  const armarCorreo = () => {
    const fecha = new Intl.DateTimeFormat("es-HN", {
      timeZone: "America/Tegucigalpa",
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    const detalle = [esEmpleo && limpiar(puesto), limpiar(empresa)].filter(Boolean).join(" – ");
    const asunto = `${tipo}${detalle ? `: ${detalle}` : ""}`;

    const fila = (etiqueta: string, valor: string) => (limpiar(valor) ? `  ${(etiqueta + ":").padEnd(11)} ${limpiar(valor)}` : null);
    const linea = "─".repeat(36);

    const contacto = [fila("Nombre", nombre), fila("Empresa", empresa), fila("Correo", correo), fila("Teléfono", telefono)].filter(Boolean);
    const oportunidad = esEmpleo
      ? [fila("Puesto", puesto), fila("Modalidad", modalidad), fila("Ubicación", ubicacion)].filter(Boolean)
      : [];

    const cuerpo = [
      "Hola Ángel,",
      "",
      mensaje.trim(),
      "",
      linea,
      `${tipo.toUpperCase()}  ·  Prioridad ${prioridad.toLowerCase()}`,
      linea,
      "",
      "DATOS DE CONTACTO",
      ...contacto,
      ...(oportunidad.length ? ["", "DETALLES DE LA OPORTUNIDAD", ...oportunidad] : []),
      "",
      linea,
      `Enviado desde el portafolio de ${perfil.nombreCorto} · ${fecha} (hora de Honduras)`,
    ].join("\n");

    return { asunto, cuerpo };
  };

  const { asunto, cuerpo } = armarCorreo();
  const mailto = `mailto:${perfil.correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(perfil.correo)}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

  const campo =
    "w-full rounded-lg border border-planta-700 bg-planta-950 px-3 py-2.5 text-planta-100 outline-none transition placeholder:text-planta-600 focus:border-ambar";

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(`Para: ${perfil.correo}\nAsunto: ${asunto}\n\n${cuerpo}`);
      setEstado("copiado");
    } catch {
      setEstado("");
    }
  };

  return (
    <form
      className="panel grid gap-4 p-5 sm:p-7"
      onSubmit={(e) => {
        e.preventDefault();
        setEstado("enviado");
        window.location.href = mailto;
      }}
    >
      <div className="flex items-center justify-between font-mono text-xs text-planta-400">
        <span>NUEVO TICKET · {numero}</span>
        <span className="flex items-center gap-1.5">
          <span className="led text-led-verde" aria-hidden /> ESTADO: ABIERTO
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-planta-300">Tu nombre *</span>
          <input required value={nombre} onChange={(e) => setNombre(e.target.value)} className={campo} placeholder="María López" autoComplete="name" />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-planta-300">Empresa</span>
          <input value={empresa} onChange={(e) => setEmpresa(e.target.value)} className={campo} placeholder="Nombre de la empresa" autoComplete="organization" />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-planta-300">Tu correo *</span>
          <input required type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className={campo} placeholder="para responderte" autoComplete="email" />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-planta-300">Teléfono o WhatsApp</span>
          <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} className={campo} placeholder="Opcional" autoComplete="tel" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-planta-300">Categoría</span>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={campo}>
            {TIPOS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <fieldset className="grid gap-1.5 text-sm">
          <legend className="mb-1.5 text-planta-300">Prioridad</legend>
          <div className="flex gap-2">
            {PRIORIDADES.map((p) => (
              <button
                type="button"
                key={p.valor}
                onClick={() => setPrioridad(p.valor)}
                aria-pressed={prioridad === p.valor}
                className={`flex-1 rounded-lg border px-2 py-2.5 font-mono text-xs transition ${
                  prioridad === p.valor ? p.color + " bg-planta-800" : "border-planta-700 text-planta-400 hover:border-planta-500"
                }`}
              >
                {p.valor}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {esEmpleo && (
        <div className="grid gap-4 rounded-lg border border-dashed border-planta-700 p-4 sm:grid-cols-3">
          <label className="grid gap-1.5 text-sm">
            <span className="text-planta-300">Puesto</span>
            <input value={puesto} onChange={(e) => setPuesto(e.target.value)} className={campo} placeholder="Ej. Desarrollador Full Stack" />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="text-planta-300">Modalidad</span>
            <select value={modalidad} onChange={(e) => setModalidad(e.target.value)} className={campo}>
              <option value="">Sin definir</option>
              {MODALIDADES.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="text-planta-300">Ubicación</span>
            <input value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} className={campo} placeholder="Ej. Choluteca" />
          </label>
        </div>
      )}

      <label className="grid gap-1.5 text-sm">
        <span className="text-planta-300">Mensaje *</span>
        <textarea
          required
          rows={5}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={campo}
          placeholder={esEmpleo ? "Cuéntame sobre el puesto, los requisitos y los siguientes pasos…" : "Cuéntame en qué te puedo ayudar…"}
        />
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <button type="submit" className="rounded-lg bg-ambar px-5 py-2.5 font-semibold text-planta-950 transition hover:brightness-110">
          Enviar ticket →
        </button>
        <a
          href={gmail}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            const f = (e.currentTarget.closest("form") as HTMLFormElement | null);
            if (f && !f.reportValidity()) e.preventDefault();
          }}
          className="rounded-lg border border-planta-600 px-4 py-2.5 text-planta-300 transition hover:border-ambar hover:text-ambar"
        >
          Abrir en Gmail
        </a>
        <button type="button" onClick={copiar} className="rounded-lg border border-planta-600 px-4 py-2.5 text-planta-300 transition hover:border-turquesa hover:text-turquesa">
          Copiar
        </button>
        <a
          href={`https://wa.me/${perfil.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-planta-600 px-4 py-2.5 text-planta-300 transition hover:border-led-verde hover:text-led-verde"
        >
          WhatsApp
        </a>
      </div>
      {estado === "enviado" && <p className="font-mono text-xs text-led-verde">✔ Se abrió tu app de correo con el ticket listo. Solo pulsa Enviar.</p>}
      {estado === "copiado" && <p className="font-mono text-xs text-led-verde">✔ Copiado. Pégalo en un correo para {perfil.correo}.</p>}
    </form>
  );
}
