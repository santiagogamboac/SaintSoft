// Fuente única de los canales de contacto. Antes el número de WhatsApp vivía
// hardcodeado dentro de WhatsAppWidget; al añadir el segundo canal se centraliza
// aquí para no acabar con el mismo número repetido en cuatro archivos.

export type ChannelId = "phone_us" | "whatsapp_co";
export type Region = "us" | "latam" | "unknown";

export interface ContactChannel {
  id: ChannelId;
  /** Región a la que atiende principalmente este canal. */
  region: Exclude<Region, "unknown">;
  /** Etiqueta corta para la UI. */
  label: string;
  /** Cobertura, para que el visitante sepa cuál le toca. */
  coverage: string;
  /** Número formateado para leer. */
  display: string;
  /** Destino del enlace. */
  href: string;
  /** Cómo se contacta, para elegir icono y texto de acción. */
  kind: "tel" | "whatsapp";
}

const WHATSAPP_MESSAGE =
  "Hola, quiero más información sobre los servicios de SaintSoft.";

export const PHONE_US: ContactChannel = {
  id: "phone_us",
  region: "us",
  label: "Estados Unidos",
  coverage: "Línea comercial",
  display: "+1 786-948-3374",
  href: "tel:+17869483374",
  kind: "tel",
};

export const WHATSAPP_CO: ContactChannel = {
  id: "whatsapp_co",
  region: "latam",
  label: "Colombia y Latinoamérica",
  coverage: "WhatsApp Business",
  display: "+57 302-777-5527",
  href: `https://wa.me/573027775527?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  kind: "whatsapp",
};

export const CHANNELS: ContactChannel[] = [WHATSAPP_CO, PHONE_US];

/** El widget flotante es específicamente de WhatsApp. */
export const WHATSAPP_HREF = WHATSAPP_CO.href;

// Zonas horarias continentales de EE.UU. más las que cubren sus territorios.
// Se comparan contra el IANA timezone del navegador: no hace falta un servicio
// de geo-IP, no cuesta nada y no expone la IP del visitante a un tercero.
const US_TIMEZONES = new Set([
  "America/New_York",
  "America/Detroit",
  "America/Chicago",
  "America/Denver",
  "America/Phoenix",
  "America/Boise",
  "America/Los_Angeles",
  "America/Anchorage",
  "America/Juneau",
  "America/Indiana/Indianapolis",
  "America/Kentucky/Louisville",
  "America/Puerto_Rico",
  "Pacific/Honolulu",
]);

/**
 * Deduce la región desde la zona horaria del navegador.
 *
 * La zona horaria no es la nacionalidad: un colombiano en Miami se detecta como
 * "us". Por eso el resultado solo se usa para ORDENAR y destacar, nunca para
 * ocultar un canal. Ver orderChannels.
 */
export function detectRegion(): Region {
  if (typeof Intl === "undefined") return "unknown";
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return "unknown";
    if (US_TIMEZONES.has(tz)) return "us";
    // El resto del continente americano se atiende desde el canal de LatAm.
    if (tz.startsWith("America/")) return "latam";
    return "unknown";
  } catch {
    return "unknown";
  }
}

/**
 * Pone delante el canal de la región detectada. Siempre devuelve los dos:
 * esconder uno perdería al visitante que quiere justo el otro.
 */
export function orderChannels(region: Region): ContactChannel[] {
  if (region === "us") return [PHONE_US, WHATSAPP_CO];
  return [WHATSAPP_CO, PHONE_US];
}
