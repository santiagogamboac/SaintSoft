"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, FileWarning } from "lucide-react";
import { caseStudy, contactHref } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

export default function CaseStudy() {
  return (
    <section
      id="caso-tiviplay"
      className="py-24 bg-surface-hover/5 dark:bg-background transition-colors duration-300"
    >
      <motion.div
        onViewportEnter={() => trackEvent("view_case_study")}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-sm font-medium">
            Caso real
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-4">
            {caseStudy.sectionTitle}
          </h2>
        </motion.div>

        {/* Identificación del caso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: "Empresa", value: caseStudy.company },
            { label: "Operación", value: caseStudy.operation },
            { label: "Sector", value: caseStudy.sector },
            { label: "Tipo de proyecto", value: caseStudy.projectType },
          ].map((item) => (
            <div
              key={item.label}
              className="p-5 bg-surface-card rounded-xl border border-surface-border shadow-sm dark:shadow-lg dark:shadow-black/20"
            >
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1.5">
                {item.label}
              </div>
              <div className="text-sm text-foreground leading-snug">{item.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Contexto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl mx-auto text-center mb-16"
        >
          {caseStudy.context}
        </motion.p>

        {/* Problema — flujo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-2">
            El problema empresarial
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-8">
            {caseStudy.problemIntro}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {caseStudy.problemFlow.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-sm font-semibold whitespace-nowrap">
                  {step}
                </span>
                {i < caseStudy.problemFlow.length - 1 && (
                  <ArrowRight size={16} className="text-blue-400/60 dark:text-blue-500/40 shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto p-6 bg-surface-card rounded-2xl border border-surface-border shadow-sm dark:shadow-lg dark:shadow-black/20">
            <div className="flex items-center gap-2 mb-4">
              <FileWarning size={18} className="text-amber-500" />
              <span className="text-sm font-semibold text-foreground">
                Una diferencia entre pagos, registros internos y plataforma de servicio podía producir:
              </span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {caseStudy.problemConsequences.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Solución — 4 capas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            La solución construida
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudy.solutionLayers.map((layer, index) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-surface-card rounded-2xl border border-surface-border shadow-sm dark:shadow-lg dark:shadow-black/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 shrink-0 rounded-lg bg-linear-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </span>
                  <h4 className="text-lg font-semibold text-foreground">
                    Capa {index + 1} — {layer.title}
                  </h4>
                </div>
                <ul className="space-y-2">
                  {layer.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle2 size={15} className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resultado verificable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16"
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Resultado verificable y publicable
          </h3>
          <ul className="space-y-3">
            {caseStudy.results.map((r) => (
              <li key={r} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <CheckCircle2 size={18} className="text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                {r}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Cierre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-lg text-foreground leading-relaxed italic mb-8">
            &ldquo;{caseStudy.closing}&rdquo;
          </p>
          <motion.a
            href={contactHref("Caso similar a TiviPlay / JUMOCOL")}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
          >
            {caseStudy.cta}
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
