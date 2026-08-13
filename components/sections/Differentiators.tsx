"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { differentiators } from "@/lib/content";

export default function Differentiators() {
  return (
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-sm font-medium">
            Diferenciadores
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-4">
            {differentiators.sectionTitle}
          </h2>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto mb-20"
        >
          <table className="w-full border-separate border-spacing-y-2 min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-500 dark:text-gray-400 w-1/2">
                  Agencia tradicional
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 w-1/2">
                  Modelo SaintSoft
                </th>
              </tr>
            </thead>
            <tbody>
              {differentiators.comparison.map((row) => (
                <tr key={row.agency} className="bg-surface-card">
                  <td className="px-6 py-4 rounded-l-xl border border-r-0 border-surface-border align-top">
                    <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                      <X size={16} className="text-gray-400 dark:text-gray-500 shrink-0 mt-0.5" />
                      {row.agency}
                    </div>
                  </td>
                  <td className="px-6 py-4 rounded-r-xl border border-l-0 border-surface-border align-top">
                    <div className="flex items-start gap-2.5 text-sm text-foreground font-medium">
                      <Check size={16} className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                      {row.saintsoft}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.1 }}
              className="p-6 bg-surface-card rounded-2xl border border-surface-border shadow-sm dark:shadow-lg dark:shadow-black/20"
            >
              <span className="text-2xl font-black text-blue-500/20 dark:text-blue-400/20 block mb-2">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold text-foreground mb-2">{principle.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
