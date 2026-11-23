"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { perfil, modulos } from "@/app/data";
import Bascula from "@/components/Bascula";
import Terminal from "@/components/Terminal";
import Ticket from "@/components/Ticket";
import Arranque from "./Arranque";
import { IconoApp, LogoAJC, type IdApp } from "./Iconos";
import Ventana, { type EstadoVentana } from "./Ventana";
import { EVENTO_ABRIR, abrirApp } from "./eventos";
import SobreMi from "./apps/SobreMi";
import Proyectos from "./apps/Proyectos";
import SqlStudio from "./apps/SqlStudio";
import { Certificaciones, Experiencia, Papelera, Stack, VisorCV } from "./apps/Varias";

type DefApp = { id: IdApp; etiqueta: string; titulo: string; w: number; h: number; render: () => ReactNode };

const APPS: DefApp[] = [
  { id: "sobre", etiqueta: "Sobre mí", titulo: "Sobre mí — Ángel Contreras", w: 720, h: 600, render: () => <SobreMi /> },
  { id: "proyectos", etiqueta: "Proyectos", titulo: "Explorador — C:\\Ángel\\Proyectos", w: 900, h: 620, render: () => <Proyectos /> },
  { id: "experiencia", etiqueta: "Experiencia", titulo: "Experiencia — Línea de proceso", w: 820, h: 560, render: () => <Experiencia /> },
  { id: "sql", etiqueta: "SQL Studio", titulo: "SQL Studio — AJC-SRV01.Portafolio", w: 900, h: 600, render: () => <SqlStudio /> },
  { id: "terminal", etiqueta: "Terminal", titulo: "visitante@ajc-srv01: ~", w: 720, h: 460, render: () => <Terminal /> },
  { id: "stack", etiqueta: "Data Center", titulo: "Data Center — Stack técnico", w: 940, h: 520, render: () => <Stack /> },
  {
    id: "bascula",
    etiqueta: "Báscula",
    titulo: "Pesado Automático — COM3",
    w: 480,
    h: 640,
    render: () => (
      <div className="grid place-items-center p-4">
        <Bascula />
        <p className="mt-3 text-center font-mono text-xs text-planta-400">Homenaje al módulo de pesado automático que desarrollé.</p>
      </div>
    ),
  },
  { id: "certs", etiqueta: "Certificaciones", titulo: "Certificaciones — Control de calidad", w: 680, h: 560, render: () => <Certificaciones /> },
  { id: "cv", etiqueta: "CV.pdf", titulo: "CV_Angel_Jafet_Contreras.pdf", w: 760, h: 680, render: () => <VisorCV /> },
  {
    id: "contacto",
    etiqueta: "Tickets",
    titulo: "Mesa de ayuda — Nuevo ticket",
    w: 720,
    h: 660,
    render: () => (
      <div className="p-4 sm:p-6">
        <p className="etiqueta-seccion">Mesa de ayuda</p>
        <h2 className="mb-1 mt-1 text-2xl font-bold">Abre un ticket</h2>
        <p className="mb-5 text-planta-300">¿Tienes una vacante o un proyecto? Llena el ticket y se abrirá tu correo con todo listo.</p>
        <Ticket />
      </div>
    ),
  },
  { id: "papelera", etiqueta: "Papelera", titulo: "Papelera de reciclaje", w: 560, h: 420, render: () => <Papelera /> },
];

const porId = Object.fromEntries(APPS.map((a) => [a.id, a])) as Record<IdApp, DefApp>;
const ICONOS_ESCRITORIO: IdApp[] = ["sobre", "proyectos", "experiencia", "sql", "terminal", "stack", "bascula", "certs", "cv", "contacto", "papelera"];

type Aviso = { id: number; titulo: string; texto: string; accion?: { texto: string; app: IdApp } };

function useReloj() {
  const [ahora, setAhora] = useState<Date | null>(null);
  useEffect(() => {
    setAhora(new Date());
    const id = setInterval(() => setAhora(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return ahora;
}

const fmtHora = (d: Date, seg = false) =>
  new Intl.DateTimeFormat("es-HN", { timeZone: "America/Tegucigalpa", hour: "2-digit", minute: "2-digit", ...(seg ? { second: "2-digit" } : {}), hour12: false }).format(d);
const fmtFecha = (d: Date, largo = false) =>
  new Intl.DateTimeFormat("es-HN", { timeZone: "America/Tegucigalpa", ...(largo ? { weekday: "long", day: "numeric", month: "long" } : { day: "2-digit", month: "2-digit", year: "numeric" }) }).format(d);

export default function Escritorio() {
  const [arrancado, setArrancado] = useState(false);
  const [ventanas, setVentanas] = useState<EstadoVentana[]>([]);
  const [activa, setActiva] = useState<IdApp | null>(null);
  const [menu, setMenu] = useState(false);
  const [apagado, setApagado] = useState(false);
  const [seleccion, setSeleccion] = useState<IdApp | null>(null);
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [movil, setMovil] = useState(false);
  const zTop = useRef(10);
  const idAviso = useRef(0);
  const ahora = useReloj();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const f = () => setMovil(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  const avisar = useCallback((a: Omit<Aviso, "id">) => {
    const id = ++idAviso.current;
    setAvisos((x) => [...x, { ...a, id }]);
    setTimeout(() => setAvisos((x) => x.filter((y) => y.id !== id)), 7000);
  }, []);

  const abrir = useCallback(
    (id: IdApp) => {
      setMenu(false);
      zTop.current += 1;
      const z = zTop.current;
      setVentanas((vs) => {
        const existe = vs.find((v) => v.id === id);
        if (existe) return vs.map((v) => (v.id === id ? { ...v, z, minimizada: false } : v));
        const def = porId[id];
        const anchoPant = window.innerWidth;
        const altoPant = window.innerHeight - 52;
        const w = Math.min(def.w, anchoPant - 40);
        const h = Math.min(def.h, altoPant - 30);
        const n = vs.length % 6;
        const x = Math.max(16, Math.round((anchoPant - w) / 2) + (n - 2) * 32);
        const y = Math.max(12, Math.round((altoPant - h) / 2) + (n - 2) * 26);
        return [...vs, { id, x, y, w, h, z, minimizada: false, maximizada: false }];
      });
      setActiva(id);
    },
    []
  );

  const enfocar = (id: IdApp) => {
    if (activa === id) return;
    zTop.current += 1;
    const z = zTop.current;
    setVentanas((vs) => vs.map((v) => (v.id === id ? { ...v, z } : v)));
    setActiva(id);
  };
  const cerrar = (id: IdApp) => {
    setVentanas((vs) => vs.filter((v) => v.id !== id));
    setActiva((a) => (a === id ? null : a));
  };
  const cambiar = (id: IdApp, c: Partial<EstadoVentana>) => setVentanas((vs) => vs.map((v) => (v.id === id ? { ...v, ...c } : v)));

  // Otras apps pueden pedir abrir una ventana (por ejemplo, la terminal).
  useEffect(() => {
    const h = (e: Event) => abrir((e as CustomEvent<IdApp>).detail);
    window.addEventListener(EVENTO_ABRIR, h);
    return () => window.removeEventListener(EVENTO_ABRIR, h);
  }, [abrir]);

  // Arranque: solo se muestra la primera vez en la sesión.
  useEffect(() => {
    try {
      if (sessionStorage.getItem("ajc-arrancado")) setArrancado(true);
    } catch {
      /* sin almacenamiento: se muestra el arranque */
    }
  }, []);

  const alArrancar = useCallback(() => {
    setArrancado(true);
    try {
      sessionStorage.setItem("ajc-arrancado", "1");
    } catch {
      /* ignorar */
    }
  }, []);

  const primeraVez = useRef(true);
  useEffect(() => {
    if (!arrancado || !primeraVez.current) return;
    primeraVez.current = false;
    abrir("sobre");
    const t1 = setTimeout(() => avisar({ titulo: "Bienvenido a AJC OS", texto: "Abre las apps del escritorio para conocer mi trabajo." }), 900);
    const t2 = setTimeout(
      () => avisar({ titulo: "Báscula detectada en COM3", texto: "¿Quieres probar el pesado automático?", accion: { texto: "Abrir báscula", app: "bascula" } }),
      4200
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [arrancado, abrir, avisar]);

  const abiertas = [...ventanas].sort((a, b) => APPS.findIndex((x) => x.id === a.id) - APPS.findIndex((x) => x.id === b.id));

  return (
    <div className="fondo-os fixed inset-0 select-none overflow-hidden text-planta-100" onPointerDown={() => setSeleccion(null)}>
      {!arrancado && <Arranque onFin={alArrancar} />}

      {/* Marca de agua del fondo */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden>
        <span className="marca-agua font-bold tracking-tighter">AJC</span>
      </div>

      {/* Widgets (escritorio grande) */}
      {ahora && (
        <aside className="pointer-events-none absolute right-6 top-6 hidden w-72 flex-col gap-3 lg:flex" aria-label="Widgets">
          <div className="widget p-5">
            <p className="font-mono text-5xl font-light tabular-nums tracking-tight">{fmtHora(ahora)}</p>
            <p className="mt-1 capitalize text-planta-300">{fmtFecha(ahora, true)}</p>
            <p className="mt-0.5 font-mono text-[11px] text-planta-400">Choluteca, Honduras · UTC−6</p>
          </div>
          <div className="widget p-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-planta-400">Estado</p>
            <p className="mt-2 flex items-center gap-2 font-semibold">
              <span className="led led-parpadea text-led-verde" /> Disponible para nuevas oportunidades
            </p>
            <p className="mt-1 text-sm text-planta-300">{perfil.titulo} · presencial, híbrido o remoto</p>
          </div>
          <div className="widget p-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-planta-400">Sistemas que he construido</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {modulos.map((m) => (
                <li key={m.codigo} className="flex items-center gap-2">
                  <span className={`led ${m.estado === "PRODUCCIÓN" ? "text-led-verde" : "led-parpadea text-ambar"}`} style={{ width: 7, height: 7 }} />
                  <span className="flex-1">{m.nombre}</span>
                  <span className="font-mono text-[10px] text-planta-400">{m.estado === "PRODUCCIÓN" ? "PROD" : "DEV"}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}

      {/* Iconos del escritorio */}
      <nav
        aria-label="Aplicaciones del escritorio"
        className="absolute inset-x-0 top-0 grid grid-cols-4 gap-x-2 gap-y-4 p-4 pb-20 sm:grid-cols-6 md:inset-x-auto md:left-0 md:grid-flow-col md:grid-cols-none md:grid-rows-[repeat(6,104px)] md:gap-1 md:p-3"
      >
        {ICONOS_ESCRITORIO.map((id) => (
          <button
            key={id}
            onPointerDown={(e) => {
              e.stopPropagation();
              setSeleccion(id);
            }}
            onClick={() => movil && abrir(id)}
            onDoubleClick={() => !movil && abrir(id)}
            onKeyDown={(e) => e.key === "Enter" && abrir(id)}
            className={`group flex w-full flex-col items-center gap-1.5 rounded-lg p-2 text-center outline-none transition md:w-24 ${
              seleccion === id ? "bg-white/15 ring-1 ring-white/25" : "hover:bg-white/8"
            } focus-visible:ring-2 focus-visible:ring-ambar`}
          >
            <span className="transition group-active:scale-90">
              <IconoApp id={id} tamano={movil ? 54 : 46} />
            </span>
            <span className="text-shadow line-clamp-2 text-[12px] leading-tight text-white">{porId[id].etiqueta}</span>
          </button>
        ))}
      </nav>

      {/* Ventanas */}
      {ventanas.map((v) => (
        <Ventana
          key={v.id}
          v={v}
          titulo={porId[v.id].titulo}
          activa={activa === v.id}
          movil={movil}
          onFoco={() => enfocar(v.id)}
          onCerrar={() => cerrar(v.id)}
          onMinimizar={() => {
            cambiar(v.id, { minimizada: true });
            setActiva(null);
          }}
          onMaximizar={() => cambiar(v.id, { maximizada: !v.maximizada })}
          onCambio={(c) => cambiar(v.id, c)}
        >
          <div className="h-full select-text">{porId[v.id].render()}</div>
        </Ventana>
      ))}

      {/* Avisos */}
      <div className="pointer-events-none absolute bottom-[64px] right-3 z-[5000] flex w-[min(92vw,340px)] flex-col gap-2" aria-live="polite">
        {avisos.map((a) => (
          <div key={a.id} className="aviso-entrar pointer-events-auto rounded-xl border border-planta-600 bg-planta-850/95 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <LogoAJC tamano={22} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{a.titulo}</p>
                <p className="mt-0.5 text-sm text-planta-300">{a.texto}</p>
                {a.accion && (
                  <button
                    onClick={() => {
                      abrir(a.accion!.app);
                      setAvisos((x) => x.filter((y) => y.id !== a.id));
                    }}
                    className="mt-2 rounded-md bg-ambar px-3 py-1 text-xs font-semibold text-planta-950"
                  >
                    {a.accion.texto}
                  </button>
                )}
              </div>
              <button onClick={() => setAvisos((x) => x.filter((y) => y.id !== a.id))} aria-label="Cerrar aviso" className="text-planta-400 hover:text-planta-100">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Menú inicio */}
      {menu && (
        <>
          <div className="absolute inset-0 z-[5990]" onPointerDown={() => setMenu(false)} />
          <div className="menu-entrar absolute bottom-[60px] left-2 z-[6000] w-[min(94vw,420px)] overflow-hidden rounded-2xl border border-planta-600 bg-planta-900/95 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center gap-3 border-b border-planta-700 p-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-ambar to-turquesa font-bold text-planta-950">ÁC</div>
              <div>
                <p className="font-semibold">{perfil.nombre}</p>
                <p className="text-sm text-planta-400">{perfil.titulo}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1 p-3">
              {APPS.map((a) => (
                <button key={a.id} onClick={() => abrir(a.id)} className="flex flex-col items-center gap-1.5 rounded-lg p-2 hover:bg-planta-800">
                  <IconoApp id={a.id} tamano={38} />
                  <span className="text-[11px] leading-tight text-planta-300">{a.etiqueta}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-planta-700 bg-planta-950/60 px-4 py-2.5 text-sm">
              <a href={`mailto:${perfil.correo}`} className="truncate font-mono text-xs text-planta-400 hover:text-ambar">
                {perfil.correo}
              </a>
              <button
                onClick={() => {
                  setMenu(false);
                  setApagado(true);
                }}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-planta-300 hover:bg-planta-800"
              >
                ⏻ Apagar
              </button>
            </div>
          </div>
        </>
      )}

      {/* Barra de tareas */}
      <footer className="absolute inset-x-0 bottom-0 z-[6000] flex h-[52px] items-center gap-1.5 border-t border-white/10 bg-planta-950/80 px-2 backdrop-blur-2xl">
        <button
          onClick={() => setMenu((m) => !m)}
          aria-label="Menú inicio"
          aria-expanded={menu}
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg transition hover:bg-white/10 ${menu ? "bg-white/10" : ""}`}
        >
          <LogoAJC tamano={26} />
        </button>
        <div className="mx-1 h-6 w-px bg-white/10" />
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          {abiertas.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                if (activa === v.id && !v.minimizada) {
                  cambiar(v.id, { minimizada: true });
                  setActiva(null);
                } else abrir(v.id);
              }}
              title={porId[v.id].titulo}
              className={`relative flex h-10 shrink-0 items-center gap-2 rounded-lg px-2.5 transition hover:bg-white/10 ${activa === v.id && !v.minimizada ? "bg-white/10" : ""}`}
            >
              <IconoApp id={v.id} tamano={24} />
              <span className="hidden max-w-[120px] truncate text-xs text-planta-300 lg:inline">{porId[v.id].etiqueta}</span>
              <span
                className={`absolute bottom-0.5 left-1/2 h-[3px] -translate-x-1/2 rounded-full ${activa === v.id && !v.minimizada ? "w-4 bg-ambar" : "w-1.5 bg-planta-400"}`}
              />
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-3 pr-2 text-planta-300">
          <span className="hidden items-center gap-1.5 font-mono text-[11px] sm:flex" title="Conectado">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
              <path d="M2 9a15 15 0 0120 0M5.5 12.5a10 10 0 0113 0M9 16a5 5 0 016 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="12" cy="19" r="1.5" fill="currentColor" />
            </svg>
            UniFi
          </span>
          <span className="hidden font-mono text-[11px] sm:inline">ES</span>
          {ahora && (
            <span className="text-right font-mono text-[11px] leading-tight">
              {fmtHora(ahora)}
              <br />
              <span className="text-planta-400">{fmtFecha(ahora)}</span>
            </span>
          )}
        </div>
      </footer>

      {/* Pantalla de apagado */}
      {apagado && (
        <div className="fixed inset-0 z-[9000] grid place-items-center bg-black/90 p-6 backdrop-blur" role="dialog" aria-label="Apagar">
          <div className="max-w-sm text-center">
            <LogoAJC tamano={56} />
            <h2 className="mt-5 text-2xl font-bold">¿Seguro que quieres apagar?</h2>
            <p className="mt-2 text-planta-300">Antes de irte: estoy disponible para nuevas oportunidades. Un ticket tarda menos que este apagado.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => {
                  setApagado(false);
                  abrirApp("contacto");
                }}
                className="rounded-lg bg-ambar px-4 py-2 font-semibold text-planta-950"
              >
                Abrir un ticket
              </button>
              <button onClick={() => setApagado(false)} className="rounded-lg border border-planta-600 px-4 py-2">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
