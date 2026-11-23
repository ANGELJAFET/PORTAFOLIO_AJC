import type { IdApp } from "./Iconos";

// Permite que cualquier app pida abrir otra (por ejemplo, la terminal abre "contacto").
export const EVENTO_ABRIR = "ajc:abrir";

export function abrirApp(id: IdApp) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<IdApp>(EVENTO_ABRIR, { detail: id }));
  }
}
