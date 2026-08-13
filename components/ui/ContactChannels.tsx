"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import {
  CHANNELS,
  detectRegion,
  orderChannels,
  type ContactChannel,
  type Region,
} from "@/lib/contact";
import {
  trackEvent,
  setLastChannel,
  type ChannelPlacement,
} from "@/lib/analytics";
import { WhatsAppIcon } from "./WhatsAppWidget";

/**
 * Devuelve los canales ordenados según la región del visitante.
 *
 * Arranca con el orden por defecto (el mismo que renderiza el servidor) y solo
 * reordena tras montar: la zona horaria únicamente existe en el cliente, así que
 * calcularla durante el render provocaría un desajuste de hidratación.
 */
export function useOrderedChannels() {
  const [region, setRegion] = useState<Region>("unknown");

  useEffect(() => {
    setRegion(detectRegion());
  }, []);

  return { region, channels: orderChannels(region) };
}

export function trackChannelClick(
  channel: ContactChannel,
  placement: ChannelPlacement,
  region: Region
) {
  setLastChannel(channel.id);
  trackEvent("click_contact_channel", {
    channel: channel.id,
    placement,
    region_detected: region,
  });
}

function ChannelIcon({
  channel,
  size = 24,
}: {
  channel: ContactChannel;
  size?: number;
}) {
  return channel.kind === "whatsapp" ? (
    <WhatsAppIcon size={size} />
  ) : (
    <Phone size={size} />
  );
}

/** Bloque completo para la sección de contacto. */
export default function ContactChannels({
  placement = "contact",
}: {
  placement?: ChannelPlacement;
}) {
  const { region, channels } = useOrderedChannels();

  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <Phone className="text-primary" size={24} />
      </div>
      <div className="min-w-0">
        <div className="font-semibold text-gray-900 dark:text-[#ffffff] mb-1">
          Teléfono
        </div>
        <ul className="space-y-2">
          {channels.map((channel) => {
            // Se muestran siempre los dos canales; la región solo decide el
            // orden y cuál se destaca.
            const preferred = channel.region === region;
            return (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  {...(channel.kind === "whatsapp"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onClick={() => trackChannelClick(channel, placement, region)}
                  className="group inline-flex flex-wrap items-baseline gap-x-2 text-gray-600 dark:text-[#d4d4d4] hover:text-primary transition-colors"
                >
                  <span
                    className={`${
                      preferred
                        ? "font-semibold text-gray-900 dark:text-[#ffffff] group-hover:text-primary"
                        : ""
                    }`}
                  >
                    {channel.display}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-[#a6a6a6]">
                    {channel.coverage} · {channel.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** Versión compacta para el pie de página. Reproduce el marcado y las clases
 *  que ya usan el resto de enlaces de contacto del footer. */
export function FooterChannels() {
  const { region, channels } = useOrderedChannels();

  return (
    <>
      {channels.map((channel) => (
        <motion.a
          key={channel.id}
          href={channel.href}
          {...(channel.kind === "whatsapp"
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          onClick={() => trackChannelClick(channel, "footer", region)}
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 text-white/60 dark:text-[#858585] hover:text-white dark:hover:text-[#d4d4d4] transition-colors"
        >
          <span className="flex-shrink-0">
            <ChannelIcon channel={channel} size={18} />
          </span>
          <span className="text-sm">
            {channel.display}
            <span className="block text-white/40 dark:text-[#6e6e6e]">
              {channel.coverage}
            </span>
          </span>
        </motion.a>
      ))}
    </>
  );
}

export { CHANNELS };
