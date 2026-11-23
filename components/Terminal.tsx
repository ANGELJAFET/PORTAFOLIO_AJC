"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { certificaciones, lineaDeProceso, modulos, perfil, racks } from "@/app/data";
import { abrirApp } from "@/components/os/eventos";

type Linea = { id: number; contenido: ReactNode };

const PROMPT = "visitante@ajc-srv01:~$";

const COMANDOS: Record<string, string> = {
  ayuda: "lista de comandos",
  sobre: "quién soy",
  experiencia: "trayectoria",
  proyectos: "módulos en producción",
  stack: "tecnologías",
  certificaciones: "certificaciones",
  sql: "consulta de ejemplo en SQL Server",
  contacto: "cómo contactarme",
  cv: "descargar mi CV (PDF)",
  limpiar: "limpiar la pantalla",
};

function ejecutar(cmd: string): ReactNode {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "":
      return null;
    case "ayuda":
    case "help":
      return (
        <div className="grid grid-cols-[9rem_1fr] gap-x-3">
          {Object.entries(COMANDOS).map(([k, v]) => (
            <div key={k} className="contents">
              <span className="text-turquesa">{k}</span>
              <span className="text-planta-300">{v}</span>
            </div>
          ))}
          <span className="text-turquesa">sudo contratar</span>
          <span className="text-planta-300">¯\_(ツ)_/¯</span>
        </div>
      );
    case "sobre":
    case "whoami":
      return (
        <p>
          <span className="text-ambar">{perfil.nombre}</span> — {perfil.titulo}, {perfil.ubicacion}.<br />
          {perfil.resumen}
        </p>
      );
    case "experiencia":
      return (
        <ul>
          {lineaDeProceso.map((e) => (
            <li key={e.id}>
              <span className="text-ambar">[{e.periodo}]</span> {e.titulo} <span className="text-planta-400">— {e.lugar}</span>
            </li>
          ))}
        </ul>
      );
    case "proyectos":
    case "ls":
      return (
        <ul>
          {modulos.map((m) => (
            <li key={m.codigo}>
              <span className={m.estado === "PRODUCCIÓN" ? "text-led-verde" : "text-ambar"}>●</span> {m.codigo}{" "}
              <span className="text-turquesa">{m.nombre}</span> <span className="text-planta-400">— {m.resumen}</span>
            </li>
          ))}
        </ul>
      );
    case "stack":
      return (
        <ul>
          {racks.map((r) => (
            <li key={r.nombre}>
              <span className="inline-block w-28 text-ambar">{r.nombre}</span>
              {r.items.join(" · ")}
            </li>
          ))}
        </ul>
      );
    case "certificaciones":
      return (
        <ul>
          {certificaciones.map((x) => (
            <li key={x.nombre}>
              <span className="text-led-verde">✔</span> {x.nombre} <span className="text-planta-400">— {x.emisor}, {x.detalle}</span>
            </li>
          ))}
        </ul>
      );
    case "sql":
      return (
        <div>
          <pre className="whitespace-pre-wrap text-planta-300">
            {`SELECT nombre, rol, ciudad, disponible
FROM   dbo.Candidatos
WHERE  ciudad = N'Choluteca' AND stack LIKE N'%SQL Server%';`}
          </pre>
          <pre className="mt-2 overflow-x-auto text-planta-100">
            {`nombre               rol                ciudad      disponible
-------------------  -----------------  ----------  ----------
Ángel J. Contreras   Full Stack Dev     Choluteca   1

(1 fila afectada)`}
          </pre>
        </div>
      );
    case "contacto":
      return (
        <ul>
          <li>
            correo   → <a className="text-turquesa underline" href={`mailto:${perfil.correo}`}>{perfil.correo}</a>
          </li>
          <li>
            whatsapp → <a className="text-turquesa underline" href={`https://wa.me/${perfil.whatsapp}`} target="_blank" rel="noreferrer">{perfil.telefono}</a>
          </li>
          {perfil.linkedin && (
            <li>
              linkedin → <a className="text-turquesa underline" href={perfil.linkedin} target="_blank" rel="noreferrer">{perfil.linkedin}</a>
            </li>
          )}
          {perfil.github && (
            <li>
              github   → <a className="text-turquesa underline" href={perfil.github} target="_blank" rel="noreferrer">{perfil.github}</a>
            </li>
          )}
        </ul>
      );
    case "cv":
      setTimeout(() => abrirApp("cv"), 400);
      return <p>Abriendo CV_Angel_Jafet_Contreras.pdf …</p>;
    case "sudo contratar":
    case "sudo hire":
      setTimeout(() => abrirApp("contacto"), 700);
      return (
        <p>
          <span className="text-led-verde">[sudo]</span> permiso concedido. Abriendo un ticket de contratación…
        </p>
      );
    case "contratar":
      return <p className="text-led-rojo">contratar: permiso denegado. Prueba con <span className="text-turquesa">sudo contratar</span></p>;
    default:
      return (
        <p>
          <span className="text-led-rojo">comando no encontrado:</span> {cmd}. Escribe <span className="text-turquesa">ayuda</span>.
        </p>
      );
  }
}

export default function Terminal() {
  const [lineas, setLineas] = useState<Linea[]>([
    {
      id: 0,
      contenido: (
        <p className="text-planta-400">
          ssh visitante@ajc-srv01 · conexión establecida
          <br />
          Escribe <span className="text-turquesa">ayuda</span> para ver los comandos.
        </p>
      ),
    },
  ]);
  const [entrada, setEntrada] = useState("");
  const [historial, setHistorial] = useState<string[]>([]);
  const [idxHist, setIdxHist] = useState(-1);
  const contador = useRef(1);
  const input = useRef<HTMLInputElement>(null);
  const pantalla = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pantalla.current?.scrollTo({ top: pantalla.current.scrollHeight });
  }, [lineas]);

  const enviar = (cmd: string) => {
    if (cmd.trim().toLowerCase() === "limpiar" || cmd.trim().toLowerCase() === "clear") {
      setLineas([]);
    } else {
      const salida = ejecutar(cmd);
      setLineas((l) => [
        ...l,
        {
          id: contador.current++,
          contenido: (
            <div>
              <p>
                <span className="text-led-verde">{PROMPT}</span> {cmd}
              </p>
              {salida && <div className="mb-2 mt-1">{salida}</div>}
            </div>
          ),
        },
      ]);
    }
    if (cmd.trim()) setHistorial((h) => [cmd, ...h].slice(0, 30));
    setIdxHist(-1);
    setEntrada("");
  };

  return (
    <div className="flex h-full min-h-[360px] flex-col bg-[#05080b]">
      <div
        ref={pantalla}
        onClick={() => input.current?.focus()}
        className="min-h-0 flex-1 cursor-text overflow-y-auto p-4 font-mono text-[13px] leading-relaxed text-planta-100"
      >
        {lineas.map((l) => (
          <div key={l.id}>{l.contenido}</div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            enviar(entrada);
          }}
          className="flex items-center gap-2"
        >
          <label htmlFor="terminal-entrada" className="shrink-0 text-led-verde">
            {PROMPT}
          </label>
          <input
            id="terminal-entrada"
            ref={input}
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" && historial.length) {
                e.preventDefault();
                const n = Math.min(idxHist + 1, historial.length - 1);
                setIdxHist(n);
                setEntrada(historial[n]);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const n = idxHist - 1;
                setIdxHist(n);
                setEntrada(n >= 0 ? historial[n] : "");
              }
            }}
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent text-planta-100 caret-ambar outline-none"
            aria-label="Comando de terminal"
          />
        </form>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-planta-700 bg-planta-900 px-4 py-2.5">
        {["ayuda", "proyectos", "sql", "contacto", "sudo contratar"].map((c) => (
          <button
            key={c}
            onClick={() => enviar(c)}
            className="rounded border border-planta-600 px-2 py-0.5 font-mono text-xs text-planta-300 transition hover:border-turquesa hover:text-turquesa"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
