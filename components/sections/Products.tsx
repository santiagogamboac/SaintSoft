"use client";

import { motion } from "framer-motion";
import { Database, Globe, Bot, Code2, Check, ArrowRight } from "lucide-react";
import { products, contactHref, type ProductStatus } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

const icons: Record<string, typeof Database> = {
  "crm-operacional": Database,
  "kit-presencia-digital": Globe,
  "automatizacion-comercial": Bot,
  "desarrollo-a-medida": Code2,
};

const statusStyles: Record<ProductStatus, string> = {
  pilot: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30",
  available: "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/30",
  modular: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30",
  consulting: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-500/10 dark:text-slate-300 dark:border-slate-500/30",
};

export default function Products() {
  return (
    <section id="productos" className="py-24 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-sm font-medium">
            Productos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-4">
            Soluciones Replicables, No Proyectos Únicos
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Productos construidos a partir de operaciones reales, listos para diagnosticar, probar e implementar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.map((product, index) => {
            const Icon = icons[product.id] ?? Code2;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onViewportEnter={() => trackEvent("view_product", { product: product.id })}
                transition={{ delay: (index % 2) * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-40 blur transition duration-500 group-hover:duration-200" />

                <div className="relative flex flex-col h-full p-8 bg-surface-card rounded-2xl border border-surface-border group-hover:border-transparent transition-all duration-300 shadow-sm dark:shadow-lg dark:shadow-black/20">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-12 h-12 shrink-0 bg-linear-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <Icon className="text-white" size={24} />
                    </div>
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold whitespace-nowrap ${statusStyles[product.status]}`}>
                      {product.statusLabel}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-2.5">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {product.shortDescription}
                  </p>

                  {product.problem && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 pl-4 border-l-2 border-blue-200 dark:border-blue-500/30">
                      {product.problem}
                    </p>
                  )}

                  {product.capabilities.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-5">
                      {product.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Check size={16} className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {product.idealFor.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.idealFor.map((who) => (
                        <span
                          key={who}
                          className="px-3 py-1 rounded-full bg-surface-hover/50 dark:bg-surface-hover/20 border border-surface-border text-xs text-gray-600 dark:text-gray-400"
                        >
                          {who}
                        </span>
                      ))}
                    </div>
                  )}

                  <motion.a
                    href={contactHref(product.interestValue)}
                    onClick={() => trackEvent("select_product_interest", { product: product.id })}
                    whileHover={{ x: 2 }}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {product.cta}
                    <ArrowRight size={16} />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
