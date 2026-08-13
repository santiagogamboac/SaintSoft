"use client";

import { motion } from "framer-motion";
import { implementationStages } from "@/lib/content";

export default function ImplementationModel() {
  return (
    <section id="implementacion" className="py-24 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-sm font-medium">
            Metodología
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-4">
            Cómo Implementamos una Solución
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            No comenzamos programando. Primero entendemos la operación, documentamos las reglas, definimos
            el alcance y establecemos cómo se medirá el resultado. Después configuramos o desarrollamos,
            validamos mediante un piloto y acompañamos la salida en vivo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {implementationStages.map((stage, index) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.1 }}
              className="relative p-7 bg-surface-card rounded-2xl border border-surface-border shadow-sm dark:shadow-lg dark:shadow-black/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-black text-blue-500/20 dark:text-blue-400/20">
                  {stage.number}
                </span>
                <h3 className="text-lg font-semibold text-foreground">{stage.title}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {stage.objective}
              </p>
              <ul className="space-y-1.5 mb-4">
                {stage.activities.map((activity) => (
                  <li key={activity} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-500 dark:bg-blue-400 shrink-0" />
                    {activity}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-surface-border">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  Entregable
                </span>
                <p className="text-sm text-foreground mt-1">{stage.deliverable}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
