"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Technologies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);


  return (
    <section id="tecnologias" ref={containerRef} className="relative py-24 bg-surface-hover/5 dark:bg-background overflow-hidden">
      {/* Background illustrations */}
      <motion.div
        className="absolute left-0 top-1/4 w-1/4 opacity-5 dark:opacity-[0.02]"
        style={{ y }}
      >
        <Image
          src="/code-illustration.svg"
          alt=""
          width={600}
          height={400}
          className="w-full h-auto"
        />
      </motion.div>

      <motion.div
        className="absolute right-0 bottom-1/4 w-1/5 opacity-5 dark:opacity-[0.02]"
        style={{ rotate }}
      >
        <Image
          src="/ai-brain.svg"
          alt=""
          width={400}
          height={400}
          className="w-full h-auto"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
              Tecnologías de Vanguardia
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Stack Tecnológico de{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-blue-400 to-sky-400">
              Vanguardia
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-[#d4d4d4] max-w-3xl mx-auto">
            Utilizamos las tecnologías más modernas y robustas para construir soluciones escalables y de alto rendimiento.
          </p>
        </motion.div>

        {/* Tech grid with stagger animation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">

        </div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {[
            {
              title: "Siempre Actualizado",
              description: "Adoptamos las últimas versiones y mejores prácticas de la industria",
              icon: "🚀",
            },
            {
              title: "Arquitectura Escalable",
              description: "Diseñamos sistemas que crecen con tu negocio sin límites",
              icon: "📈",
            },
            {
              title: "Seguridad Primero",
              description: "Implementamos las más altas certificaciones y estándares de seguridad",
              icon: "🔒",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group p-6 bg-surface-card rounded-2xl border border-surface-border hover:border-primary/30 transition-all duration-300 dark:shadow-lg dark:shadow-black/20"
            >
              <motion.div
                className="text-4xl mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-[#ffffff] mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-[#d4d4d4] text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
