"use client";

import { motion } from "framer-motion";
import { Headset, Repeat, Rocket, Tv } from "lucide-react";
import { sectors } from "@/lib/content";

const icons = [Tv, Headset, Repeat, Rocket];

export default function Sectors() {
  return (
    <section id="sectores" className="py-24 bg-surface-hover/5 dark:bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-sm font-medium">
            Sectores
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-4">
            Experiencia Verificable, No Genérica
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Solo mostramos sectores donde existe un cliente, un piloto o un proceso documentado que lo respalde.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, index) => {
            const Icon = icons[index] ?? Tv;
            return (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-surface-card rounded-2xl border border-surface-border shadow-sm dark:shadow-lg dark:shadow-black/20"
              >
                <div className="w-11 h-11 mb-4 bg-linear-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Icon className="text-white" size={20} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{sector.title}</h3>
                <span className="inline-block mb-4 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-[11px] font-semibold">
                  {sector.verifiedExperience}
                </span>
                <ul className="space-y-1.5">
                  {sector.capabilities.map((c) => (
                    <li key={c} className="text-sm text-gray-600 dark:text-gray-400">
                      {c}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
