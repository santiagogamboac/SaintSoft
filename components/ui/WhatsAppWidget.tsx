"use client";

import { motion } from "framer-motion";
import { trackEvent, setLastChannel } from "@/lib/analytics";
import { WHATSAPP_CO } from "@/lib/contact";

// El número vive en lib/contact.ts, que es la fuente única de los canales.
// Se reexporta porque otros módulos ya importaban WHATSAPP_HREF desde aquí.
export const WHATSAPP_HREF = WHATSAPP_CO.href;

export function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.1c-.24.68-1.4 1.32-1.94 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.91-1.26-4.81-4.18-4.96-4.38-.15-.2-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.81 2.01.88 2.16.07.15.12.32.02.52-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.46.13.63-.07.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.15.27.1 1.69.8 1.98.94.29.15.48.22.55.34.07.13.07.72-.17 1.4z" />
    </svg>
  );
}

export default function WhatsAppWidget() {
  return (
    <motion.a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      onClick={() => {
        setLastChannel(WHATSAPP_CO.id);
        trackEvent("click_contact_channel", {
          channel: WHATSAPP_CO.id,
          placement: "widget",
        });
      }}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-[60] flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 hover:shadow-xl hover:shadow-[#25D366]/50 transition-shadow"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <WhatsAppIcon />
    </motion.a>
  );
}
