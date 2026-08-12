"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "¿Cuánto tiempo toma desarrollar un proyecto de software a medida?",
      answer: "El tiempo de desarrollo varía según la complejidad del proyecto. Un MVP puede estar listo en 8-12 semanas, mientras que plataformas enterprise complejas pueden tomar 6-12 meses. Trabajamos con metodologías ágiles para entregar valor incremental desde las primeras semanas.",
    },
    {
      question: "¿Cómo garantizan la calidad y seguridad del software?",
      answer: "Implementamos las mejores prácticas de la industria: revisiones de código, testing automatizado, auditorías de seguridad, y cumplimiento de estándares como ISO 27001. Cada línea de código pasa por múltiples capas de validación antes del despliegue.",
    },
    {
      question: "¿Ofrecen soporte y mantenimiento post-lanzamiento?",
      answer: "Sí, ofrecemos planes de soporte y mantenimiento continuo que incluyen monitoreo 24/7, actualizaciones de seguridad, optimizaciones de rendimiento y evolución de funcionalidades según las necesidades de su negocio.",
    },
    {
      question: "¿Trabajan con empresas de todos los tamaños?",
      answer: "Nos especializamos en empresas medianas a grandes y startups de alto crecimiento. Nuestro enfoque está en organizaciones que requieren soluciones enterprise robustas y escalables con un alto nivel de personalización.",
    },
    {
      question: "¿Cómo funciona el modelo de staff augmentation?",
      answer: "Proporcionamos equipos dedicados de expertos que se integran con su organización. Usted mantiene el control del proyecto mientras nosotros aportamos el talento técnico especializado. Los equipos pueden escalarse según sus necesidades.",
    },
    {
      question: "¿Qué metodologías de desarrollo utilizan?",
      answer: "Utilizamos metodologías ágiles (Scrum/Kanban) adaptadas a las necesidades de cada cliente. Esto incluye sprints de 2 semanas, entregas incrementales, comunicación constante y flexibilidad para ajustar prioridades según evoluciona el proyecto.",
    },
  ];
  
  return (
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Respuestas a las dudas más comunes sobre nuestros servicios
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Animated border on active */}
              {openIndex === index && (
                <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-blue-600 dark:from-primary-light dark:to-primary rounded-xl opacity-50 blur" />
              )}
              
              <div className="relative bg-surface-card rounded-xl border border-surface-border hover:border-primary/50 dark:hover:border-primary-light/50 overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-surface-hover/20 dark:hover:bg-surface-hover/20 transition-colors"
                >
                  <span className="text-lg font-semibold text-foreground pr-8">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-primary dark:text-primary-light shrink-0" size={24} />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
                
                {/* Bottom accent line on active */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-blue-500 to-primary dark:from-primary-light dark:via-primary dark:to-primary-light"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: openIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
