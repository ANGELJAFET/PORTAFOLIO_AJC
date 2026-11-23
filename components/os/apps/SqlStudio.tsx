"use client";

import { useMemo, useState } from "react";
import { certificaciones, lineaDeProceso, modulos, perfil, racks } from "@/app/data";

type Fila = Record<string, string | number>;

// Base de datos de ejemplo construida con el contenido del portafolio.
function crearBD(): Record<string, Fila[]> {
  return {
    Candidatos: [{ id: 1, nombre: perfil.nombre, rol: perfil.titulo, ciudad: "Choluteca", disponible: 1 }],
    Proyectos: modulos.map((m) => ({ codigo: m.codigo, nombre: m.nombre, area: m.area, estado: m.estado, stack: m.stack.join(", ") })),
    Experiencia: lineaDeProceso.map((e, i) => ({ id: i + 1, periodo: e.periodo, puesto: e.titulo, lugar: e.lugar })),
    Stack: racks.flatMap((r) => r.items.map((t) => ({ categoria: r.nombre, tecnologia: t }))),
    Certificaciones: certificaciones.map((c, i) => ({ id: i + 1, nombre: c.nombre, emisor: c.emisor, detalle: c.detalle })),
  };
}

const CONSULTAS = [
  { nombre: "¿Está disponible?", sql: "SELECT nombre, rol, ciudad, disponible\nFROM dbo.Candidatos\nWHERE ciudad = 'Choluteca';" },
  { nombre: "Proyectos en producción", sql: "SELECT codigo, nombre, estado\nFROM dbo.Proyectos\nWHERE estado = 'PRODUCCIÓN';" },
  { nombre: "Experiencia en infraestructura", sql: "SELECT nombre, estado, stack\nFROM dbo.Proyectos\nWHERE area = 'Infraestructura';" },
  { nombre: "Stack de redes", sql: "SELECT tecnologia\nFROM dbo.Stack\nWHERE categoria = 'REDES';" },
  { nombre: "Trayectoria", sql: "SELECT periodo, puesto, lugar\nFROM dbo.Experiencia\nORDER BY id DESC;" },
  { nombre: "Stack de base de datos", sql: "SELECT tecnologia\nFROM dbo.Stack\nWHERE categoria = 'DATOS';" },
  { nombre: "Certificaciones de Cisco", sql: "SELECT nombre, detalle\nFROM dbo.Certificaciones\nWHERE emisor LIKE '%Cisco%';" },
  { nombre: "Contar tecnologías", sql: "SELECT COUNT(*)\nFROM dbo.Stack;" },
];

type Resultado = { filas: Fila[]; columnas: string[]; ms: number } | { error: string };

function ejecutarSQL(sql: string, bd: Record<string, Fila[]>): Resultado {
  const t0 = performance.now();
  const limpio = sql.replace(/--.*$/gm, "").replace(/\s+/g, " ").trim().replace(/;$/, "");
  const re =
    /^SELECT\s+(TOP\s+(\d+)\s+)?(.+?)\s+FROM\s+(?:dbo\.)?\[?(\w+)\]?(?:\s+WHERE\s+(\w+)\s*(=|LIKE)\s*N?'([^']*)')?(?:\s+ORDER\s+BY\s+(\w+)(?:\s+(ASC|DESC))?)?$/i;
  const m = limpio.match(re);
  if (!m) {
    return { error: "Msg 102, Nivel 15: Sintaxis no soportada en esta demo. Prueba: SELECT * FROM dbo.Proyectos;" };
  }
  const [, , top, cols, tabla, wCol, wOp, wVal, oCol, oDir] = m;
  const nombreTabla = Object.keys(bd).find((k) => k.toLowerCase() === tabla.toLowerCase());
  if (!nombreTabla) return { error: `Msg 208, Nivel 16: El nombre de objeto 'dbo.${tabla}' no es válido.` };
  let filas = [...bd[nombreTabla]];
  const todas = Object.keys(filas[0] ?? {});
  const resolver = (c: string) => todas.find((k) => k.toLowerCase() === c.toLowerCase());

  if (wCol) {
    const col = resolver(wCol);
    if (!col) return { error: `Msg 207, Nivel 16: El nombre de columna '${wCol}' no es válido.` };
    if (wOp.toUpperCase() === "=") {
      filas = filas.filter((f) => String(f[col]).toLowerCase() === wVal.toLowerCase());
    } else {
      const patron = new RegExp("^" + wVal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/%/g, ".*").replace(/_/g, ".") + "$", "i");
      filas = filas.filter((f) => patron.test(String(f[col])));
    }
  }
  if (oCol) {
    const col = resolver(oCol);
    if (!col) return { error: `Msg 207, Nivel 16: El nombre de columna '${oCol}' no es válido.` };
    const dir = oDir?.toUpperCase() === "DESC" ? -1 : 1;
    filas.sort((a, b) => (a[col] > b[col] ? dir : a[col] < b[col] ? -dir : 0));
  }
  if (top) filas = filas.slice(0, Number(top));

  if (/^COUNT\(\*\)$/i.test(cols.trim())) {
    return { filas: [{ "(Sin nombre de columna)": filas.length }], columnas: ["(Sin nombre de columna)"], ms: performance.now() - t0 };
  }
  let columnas = todas;
  if (cols.trim() !== "*") {
    columnas = [];
    for (const c of cols.split(",").map((x) => x.trim())) {
      const r = resolver(c);
      if (!r) return { error: `Msg 207, Nivel 16: El nombre de columna '${c}' no es válido.` };
      columnas.push(r);
    }
  }
  return { filas, columnas, ms: performance.now() - t0 };
}

export default function SqlStudio() {
  const bd = useMemo(crearBD, []);
  const [sql, setSql] = useState(CONSULTAS[0].sql);
  const [res, setRes] = useState<Resultado | null>(null);
  const [pestana, setPestana] = useState<"resultados" | "mensajes">("resultados");

  const ejecutar = () => {
    const r = ejecutarSQL(sql, bd);
    setRes(r);
    setPestana("error" in r ? "mensajes" : "resultados");
  };

  return (
    <div className="flex h-full min-h-[460px] flex-col text-sm">
      {/* barra de herramientas */}
      <div className="flex flex-wrap items-center gap-2 border-b border-planta-700 bg-planta-850 px-3 py-2">
        <button onClick={ejecutar} className="flex items-center gap-1.5 rounded-md bg-led-verde/90 px-3 py-1 font-semibold text-planta-950 hover:bg-led-verde">
          ▶ Ejecutar <span className="font-mono text-[10px] opacity-70">Ctrl+Enter</span>
        </button>
        <select
          aria-label="Consultas de ejemplo"
          onChange={(e) => {
            const q = CONSULTAS[Number(e.target.value)];
            if (q) {
              setSql(q.sql);
              setRes(null);
            }
          }}
          defaultValue=""
          className="rounded-md border border-planta-600 bg-planta-950 px-2 py-1 text-planta-100"
        >
          <option value="" disabled>
            Consultas de ejemplo…
          </option>
          {CONSULTAS.map((q, i) => (
            <option key={q.nombre} value={i}>
              {q.nombre}
            </option>
          ))}
        </select>
        <span className="ml-auto hidden font-mono text-[11px] text-planta-400 sm:inline">AJC-SRV01 · BD: Portafolio</span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* explorador de objetos */}
        <aside className="hidden w-56 shrink-0 overflow-auto border-r border-planta-700 bg-planta-950/50 p-2 font-mono text-xs sm:block">
          <p className="text-planta-300">▾ 🖥 AJC-SRV01</p>
          <p className="pl-3 text-planta-300">▾ 🗄 Portafolio</p>
          <p className="pl-6 text-planta-400">▾ 📁 Tablas</p>
          {Object.keys(bd).map((t) => (
            <button
              key={t}
              onClick={() => {
                setSql(`SELECT TOP 100 *\nFROM dbo.${t};`);
                setRes(null);
              }}
              className="block w-full whitespace-nowrap rounded px-2 py-0.5 pl-9 text-left text-planta-100 hover:bg-planta-800"
            >
              ▦ dbo.{t}
            </button>
          ))}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* editor */}
          <div className="relative flex min-h-[140px] flex-[0_0_42%] border-b border-planta-700 bg-[#05080b]">
            <div className="select-none border-r border-planta-800 px-2 py-3 text-right font-mono text-xs leading-6 text-planta-600" aria-hidden>
              {sql.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={sql}
              onChange={(e) => setSql(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  e.preventDefault();
                  ejecutar();
                }
                if (e.key === "F5") {
                  e.preventDefault();
                  ejecutar();
                }
              }}
              spellCheck={false}
              aria-label="Editor de consultas SQL"
              className="h-full w-full resize-none bg-transparent px-3 py-3 font-mono text-[13px] leading-6 text-sky-200 caret-ambar outline-none"
            />
          </div>

          {/* resultados */}
          <div className="flex gap-1 border-b border-planta-700 bg-planta-850 px-2 pt-1.5 text-xs">
            {(["resultados", "mensajes"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPestana(p)}
                className={`rounded-t-md px-3 py-1 capitalize ${pestana === p ? "bg-planta-900 text-planta-100" : "text-planta-400 hover:text-planta-100"}`}
              >
                {p === "resultados" ? "▦ Resultados" : "✉ Mensajes"}
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1 overflow-auto bg-planta-900">
            {!res && <p className="p-4 font-mono text-xs text-planta-400">Pulsa ▶ Ejecutar para correr la consulta.</p>}
            {res && "error" in res && pestana === "mensajes" && <p className="p-4 font-mono text-xs text-led-rojo">{res.error}</p>}
            {res && !("error" in res) && pestana === "mensajes" && (
              <p className="p-4 font-mono text-xs text-planta-300">
                ({res.filas.length} {res.filas.length === 1 ? "fila afectada" : "filas afectadas"})
                <br />
                Hora de finalización: {new Date().toLocaleTimeString("es-HN")}
              </p>
            )}
            {res && !("error" in res) && pestana === "resultados" && (
              <table className="w-full border-collapse font-mono text-xs">
                <thead className="sticky top-0 bg-planta-800">
                  <tr>
                    <th className="w-8 border border-planta-700 px-2 py-1 text-planta-400" />
                    {res.columnas.map((c) => (
                      <th key={c} className="border border-planta-700 px-2 py-1 text-left font-semibold text-planta-300">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {res.filas.map((f, i) => (
                    <tr key={i} className="hover:bg-ambar-suave">
                      <td className="border border-planta-800 px-2 py-1 text-center text-planta-500">{i + 1}</td>
                      {res.columnas.map((c) => (
                        <td key={c} className="border border-planta-800 px-2 py-1 text-planta-100">
                          {String(f[c])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {res && !("error" in res) && (
            <div className="flex justify-between bg-[#0e5c3a] px-3 py-1 font-mono text-[11px] text-white">
              <span>✔ Consulta ejecutada correctamente.</span>
              <span>
                {res.filas.length} filas · {res.ms.toFixed(1)} ms
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
