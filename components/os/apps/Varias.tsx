"use client";

import { useState } from "react";
import { certificaciones, perfil } from "@/app/data";
import LineaProceso from "@/components/LineaProceso";
import Racks from "@/components/Racks";
import { abrirApp } from "../eventos";

export function Experiencia() {
  return (
    <div className="p-4 sm:p-6">
      <p className="etiqueta-seccion">Línea de proceso</p>
      <h2 className="mb-4 mt-1 text-2xl font-bold">Mi trayectoria, estación por estación</h2>
      <LineaProceso />
    </div>
  );
}

export function Stack() {
  return (
    <div className="p-4 sm:p-6">
      <p className="etiqueta-seccion">Data center</p>
      <h2 className="mb-1 mt-1 text-2xl font-bold">Mi stack, rack por rack</h2>
      <p className="mb-5 text-planta-300">Del frontend al cableado: desarrollo de software, redes e infraestructura en el mismo perfil.</p>
      <Racks />
    </div>
  );
}

export function Certificaciones() {
  return (
    <div className="p-4 sm:p-6">
      <p className="etiqueta-seccion">Control de calidad</p>
      <h2 className="mb-5 mt-1 text-2xl font-bold">Certificaciones</h2>
      <ul className="grid gap-3">
        {certificaciones.map((c, i) => (
          <li key={c.nombre} className="panel flex items-start gap-4 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-led-verde/50 font-mono text-sm text-led-verde">
              QC{i + 1}
            </span>
            <div>
              <p className="font-semibold leading-snug">{c.nombre}</p>
              <p className="mt-1 text-sm text-planta-400">
                {c.emisor} · {c.detalle}
              </p>
            </div>
            <span className="ml-auto hidden rounded-md border border-led-verde/40 px-2 py-0.5 font-mono text-[10px] text-led-verde sm:block">
              APROBADO
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VisorCV() {
  return (
    <div className="flex h-full min-h-[460px] flex-col">
      <div className="flex items-center gap-2 border-b border-planta-700 bg-planta-850 px-3 py-2 text-sm">
        <span className="truncate font-mono text-xs text-planta-300">CV_Angel_Jafet_Contreras.pdf</span>
        <a
          href={perfil.cv}
          download
          className="ml-auto rounded-md bg-ambar px-3 py-1 font-semibold text-planta-950 hover:brightness-110"
        >
          ⬇ Descargar
        </a>
        <a href={perfil.cv} target="_blank" rel="noreferrer" className="rounded-md border border-planta-600 px-3 py-1 hover:border-ambar">
          Abrir aparte
        </a>
      </div>
      <iframe src={`${perfil.cv}#view=FitH`} title="CV de Ángel Contreras" className="min-h-0 w-full flex-1 bg-white" />
    </div>
  );
}

const EXCUSAS = [
  { nombre: "excusas_para_no_contratarme.txt", contenido: "Archivo vacío. No se encontraron excusas válidas." },
  { nombre: "deploy_sin_reversa.sql", contenido: "Descartado. Cada cambio a producción lleva su script de reversa. 😉" },
  { nombre: "push_directo_a_main.sh", contenido: "Eliminado. Aquí se trabaja con ramas y pull requests." },
];

export function Papelera() {
  const [abierto, setAbierto] = useState<number | null>(null);
  return (
    <div className="p-4 sm:p-6">
      <p className="mb-3 font-mono text-xs text-planta-400">C:\$Papelera · {EXCUSAS.length} elementos</p>
      <ul className="space-y-1">
        {EXCUSAS.map((x, i) => (
          <li key={x.nombre}>
            <button
              onClick={() => setAbierto(abierto === i ? null : i)}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-planta-800"
            >
              <span aria-hidden>🗎</span>
              <span className="font-mono text-sm">{x.nombre}</span>
            </button>
            {abierto === i && <p className="ml-10 rounded-md bg-planta-950 p-3 font-mono text-xs text-planta-300">{x.contenido}</p>}
          </li>
        ))}
      </ul>
      <button onClick={() => abrirApp("contacto")} className="mt-6 rounded-lg border border-planta-600 px-4 py-2 text-sm hover:border-ambar hover:text-ambar">
        Mejor abre un ticket →
      </button>
    </div>
  );
}
