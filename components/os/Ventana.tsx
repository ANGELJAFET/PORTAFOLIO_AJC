"use client";

import { useRef, type ReactNode, type PointerEvent as RPointerEvent } from "react";
import { IconoApp, type IdApp } from "./Iconos";

export type EstadoVentana = {
  id: IdApp;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimizada: boolean;
  maximizada: boolean;
};

type Props = {
  v: EstadoVentana;
  titulo: string;
  activa: boolean;
  movil: boolean;
  children: ReactNode;
  onFoco: () => void;
  onCerrar: () => void;
  onMinimizar: () => void;
  onMaximizar: () => void;
  onCambio: (cambio: Partial<EstadoVentana>) => void;
};

const ALTO_BARRA_TAREAS = 52;

export default function Ventana({ v, titulo, activa, movil, children, onFoco, onCerrar, onMinimizar, onMaximizar, onCambio }: Props) {
  const arrastre = useRef<{ dx: number; dy: number } | null>(null);
  const redim = useRef<{ x0: number; y0: number; w0: number; h0: number } | null>(null);
  const completa = movil || v.maximizada;

  const iniciarArrastre = (e: RPointerEvent<HTMLDivElement>) => {
    if (completa || (e.target as HTMLElement).closest("button")) return;
    onFoco();
    arrastre.current = { dx: e.clientX - v.x, dy: e.clientY - v.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const moverArrastre = (e: RPointerEvent<HTMLDivElement>) => {
    if (!arrastre.current) return;
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - ALTO_BARRA_TAREAS - 40;
    onCambio({
      x: Math.min(Math.max(e.clientX - arrastre.current.dx, -v.w + 140), maxX),
      y: Math.min(Math.max(e.clientY - arrastre.current.dy, 0), maxY),
    });
  };
  const finArrastre = () => {
    arrastre.current = null;
  };

  const iniciarRedim = (e: RPointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onFoco();
    redim.current = { x0: e.clientX, y0: e.clientY, w0: v.w, h0: v.h };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const moverRedim = (e: RPointerEvent<HTMLDivElement>) => {
    if (!redim.current) return;
    const r = redim.current;
    onCambio({ w: Math.max(340, r.w0 + e.clientX - r.x0), h: Math.max(240, r.h0 + e.clientY - r.y0) });
  };

  const estilo = completa
    ? { left: 0, top: 0, width: "100vw", height: `calc(100dvh - ${ALTO_BARRA_TAREAS}px)`, zIndex: v.z }
    : { left: v.x, top: v.y, width: v.w, height: v.h, zIndex: v.z };

  return (
    <section
      role="dialog"
      aria-label={titulo}
      onPointerDown={onFoco}
      style={estilo}
      className={`ventana-abrir absolute flex flex-col overflow-hidden border bg-planta-900/95 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.75)] backdrop-blur-xl ${
        completa ? "rounded-none" : "rounded-xl"
      } ${activa ? "border-planta-500/70" : "border-planta-700/80"} ${v.minimizada ? "hidden" : ""}`}
    >
      <div
        onPointerDown={iniciarArrastre}
        onPointerMove={moverArrastre}
        onPointerUp={finArrastre}
        onDoubleClick={() => !movil && onMaximizar()}
        className={`flex h-10 shrink-0 select-none items-center gap-2.5 border-b px-3 ${
          activa ? "border-planta-700 bg-planta-800" : "border-planta-800 bg-planta-850"
        } ${completa ? "" : "cursor-grab active:cursor-grabbing"}`}
      >
        <IconoApp id={v.id} tamano={20} />
        <span className={`truncate text-sm font-medium ${activa ? "text-planta-100" : "text-planta-400"}`}>{titulo}</span>
        <div className="ml-auto flex items-center gap-1">
          {!movil && (
            <>
              <button onClick={onMinimizar} aria-label="Minimizar" className="grid h-7 w-8 place-items-center rounded-md text-planta-300 hover:bg-planta-700">
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6h8" stroke="currentColor" strokeWidth="1.4" /></svg>
              </button>
              <button onClick={onMaximizar} aria-label={v.maximizada ? "Restaurar" : "Maximizar"} className="grid h-7 w-8 place-items-center rounded-md text-planta-300 hover:bg-planta-700">
                <svg width="12" height="12" viewBox="0 0 12 12"><rect x="2" y="2" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.3" fill="none" /></svg>
              </button>
            </>
          )}
          <button onClick={onCerrar} aria-label="Cerrar" className="grid h-7 w-8 place-items-center rounded-md text-planta-300 hover:bg-led-rojo hover:text-white">
            <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-auto">{children}</div>

      {!completa && (
        <div
          onPointerDown={iniciarRedim}
          onPointerMove={moverRedim}
          onPointerUp={() => (redim.current = null)}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize"
          aria-hidden
        >
          <svg width="16" height="16" viewBox="0 0 16 16" className="text-planta-600">
            <path d="M14 6v8H6M14 10v4h-4" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
        </div>
      )}
    </section>
  );
}
