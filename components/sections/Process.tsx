"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Palette, Code, Rocket } from "lucide-react";
import { useRef } from "react";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const steps = [
    {
      icon: Search,
      title: "Descubrimiento",
      description: "Analizamos sus necesidades, objetivos y desafíos para diseñar la solución perfecta.",
      color: "from-blue-500 to-cyan-400",
      number: "01",
    },
    {
      icon: Palette,
      title: "Diseño",
      description: "Creamos prototipos y arquitecturas que priorizan la experiencia del usuario y la escalabilidad.",
      color: "from-blue-600 to-blue-400",
      number: "02",
    },
    {
      icon: Code,
      title: "Desarrollo",
      description: "Implementamos con metodologías ágiles, entregas iterativas y comunicación constante.",
      color: "from-sky-500 to-blue-500",
      number: "03",
    },
    {
      icon: Rocket,
      title: "Despliegue",
      description: "Lanzamos su solución con soporte completo y monitoreo continuo para garantizar el éxito.",
      color: "from-blue-700 to-sky-500",
      number: "04",
    },
  ];
  
  return (
    <section ref={containerRef} className="py-24 bg-background transition-colors duration-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 dark:opacity-3">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-sm font-medium">
              Proceso Probado
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestra Metodología de{" "}
            <span className="text-primary dark:text-primary-light">Entrega</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Transparencia y Agilidad: Nuestra Metodología Garantiza Entregas Exitosas.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-surface-border -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-primary via-blue-400 to-sky-400"
              style={{ width: lineProgress }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  className="relative group"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Number badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.1 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-background border-2 border-primary rounded-full flex items-center justify-center text-primary font-bold text-sm z-20"
                    >
                      {step.number}
                    </motion.div>
                    
                    {/* Icon container with animated gradient */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative z-10 w-24 h-24 rounded-2xl flex items-center justify-center mb-6 shadow-2xl overflow-hidden"
                    >
                      {/* Animated gradient background */}
                      <motion.div
                        className={`absolute inset-0 bg-linear-to-br ${step.color}`}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                      
                      {/* Glow effect */}
                      <motion.div
                        className={`absolute inset-0 bg-linear-to-br ${step.color} blur-xl opacity-50`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                      
                      <Icon className="relative z-10 text-white" size={36} />
                    </motion.div>
                    
                    {/* Timeline dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.2 }}
                      className="absolute top-[88px] left-1/2 -translate-x-1/2 w-4 h-4 bg-primary dark:bg-primary-light rounded-full border-4 border-surface-card hidden lg:block shadow-lg"
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary dark:bg-primary-light rounded-full"
                        animate={{
                          scale: [1, 2, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                      />
                    </motion.div>
                    
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                      className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors"
                    >
                      {step.title}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.4 }}
                      className="text-gray-600 dark:text-gray-400 leading-relaxed"
                    >
                      {step.description}
                    </motion.p>
                    
                    {/* Connecting arrow (except last item) */}
                    {index < steps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        className="hidden lg:block absolute top-10 -right-4 text-primary/30"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-linear-to-r from-primary to-secondary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Comenzar Mi Proyecto
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
