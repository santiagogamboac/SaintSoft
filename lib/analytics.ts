// Eventos comerciales mínimos del brief (sección 13). No depende de ningún proveedor:
// empuja a window.dataLayer si existe (GTM/GA4 u otro), y es un no-op en caso contrario.

export type AnalyticsEvent =
  | "view_product"
  | "view_case_study"
  | "click_diagnostic_cta"
  | "select_product_interest"
  | "start_contact_form"
  | "submit_contact_form"
  | "click_contact_channel";

/** Dónde se pulsó un canal de contacto, para saber qué emplazamiento convierte. */
export type ChannelPlacement = "header" | "contact" | "footer" | "widget";

// El último canal que tocó el visitante, para poder atribuir el envío del
// formulario a un canal aunque el clic haya ocurrido en otra sección.
let lastChannel: string | null = null;

export function setLastChannel(channel: string) {
  lastChannel = channel;
}

export function getLastChannel() {
  return lastChannel;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}
