"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { partnership } from "@/lib/content";

export default function Partnership() {
  return (
    <section id="alianza" className="py-24 bg-surface-hover/5 dark:bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-sm font-medium">
            Experiencia empresarial aplicada
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            {partnership.sectionTitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-4">
            {partnership.intro}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {partnership.outro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-7 bg-surface-card rounded-2xl border border-surface-border shadow-sm dark:shadow-lg dark:shadow-black/20"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Aportes verificables de JUMOCOL SAS
            </h3>
            <ul className="space-y-2.5">
              {partnership.jumocolContributions.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <Check size={16} className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-7 bg-surface-card rounded-2xl border border-surface-border shadow-sm dark:shadow-lg dark:shadow-black/20"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Aportes verificables de SaintSoft
            </h3>
            <ul className="space-y-2.5">
              {partnership.saintsoftContributions.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <Check size={16} className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
