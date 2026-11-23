"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [abierta, setAbierta] = useState<number | null>(null);
  const total = certificaciones.length;

  useEffect(() => {
    if (abierta === null) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierta(null);
      if (e.key === "ArrowRight") setAbierta((a) => (a === null ? a : (a + 1) % total));
      if (e.key === "ArrowLeft") setAbierta((a) => (a === null ? a : (a - 1 + total) % total));
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [abierta, total]);

  const c = abierta !== null ? certificaciones[abierta] : null;

  return (
    <div className="relative p-4 sm:p-6">
      <p className="etiqueta-seccion">Control de calidad</p>
      <h2 className="mb-1 mt-1 text-2xl font-bold">Certificaciones</h2>
      <p className="mb-5 text-planta-300">Toca un certificado para verlo completo.</p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {certificaciones.map((x, i) => (
          <li key={x.nombre}>
            <button
              onClick={() => setAbierta(i)}
              className="panel group flex h-full w-full flex-col overflow-hidden text-left transition hover:-translate-y-0.5 hover:border-led-verde/60"
            >
              <div className="relative aspect-[1650/1275] w-full overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={x.imagen} alt={`Certificado: ${x.nombre}`} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                <span className="absolute right-2 top-2 rounded-md bg-planta-950/85 px-2 py-0.5 font-mono text-[10px] text-led-verde">
                  QC{i + 1} · APROBADO
                </span>
              </div>
              <div className="p-3">
                <p className="font-semibold leading-snug">{x.nombre}</p>
                <p className="mt-1 text-xs text-planta-400">
                  {x.emisor} · {x.detalle}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {c && abierta !== null && createPortal(
        <div
          className="fixed inset-0 z-[8000] flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-label={c.nombre}
          onClick={() => setAbierta(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.imagen}
            alt={`Certificado: ${c.nombre}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[78vh] max-w-[min(100%,1200px)] rounded-lg shadow-2xl"
          />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setAbierta((abierta - 1 + total) % total)} className="rounded-lg border border-planta-600 px-3 py-1.5 hover:border-ambar" aria-label="Anterior">
              ←
            </button>
            <span className="px-2 text-center text-planta-100">
              {c.nombre} <span className="text-planta-400">· {abierta + 1}/{total}</span>
            </span>
            <button onClick={() => setAbierta((abierta + 1) % total)} className="rounded-lg border border-planta-600 px-3 py-1.5 hover:border-ambar" aria-label="Siguiente">
              →
            </button>
            <a href={c.imagen} download className="rounded-lg bg-ambar px-3 py-1.5 font-semibold text-planta-950">
              ⬇ Descargar
            </a>
            <button onClick={() => setAbierta(null)} className="rounded-lg border border-planta-600 px-3 py-1.5 hover:border-led-rojo" aria-label="Cerrar">
              ✕
            </button>
          </div>
        </div>,
        document.body
      )}
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
