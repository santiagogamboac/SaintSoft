"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Clock, Shield, Target } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

export default function Benefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const benefits = [
    {
      icon: TrendingUp,
      title: "Reducción de Costos Operativos",
      description: "Optimice recursos y reduzca gastos con soluciones eficientes que maximizan el ROI.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: Clock,
      title: "Time-to-Market Acelerado",
      description: "Lance productos más rápido con metodologías ágiles y equipos experimentados.",
      color: "from-blue-600 to-blue-400",
    },
    {
      icon: Shield,
      title: "Seguridad Enterprise",
      description: "Proteja sus activos digitales con las más altas certificaciones y estándares de seguridad.",
      color: "from-sky-500 to-blue-500",
    },
    {
      icon: Target,
      title: "Escalabilidad Garantizada",
      description: "Arquitecturas diseñadas para crecer con su negocio sin comprometer el rendimiento.",
      color: "from-blue-700 to-sky-500",
    },
  ];
  
  return (
    <section ref={containerRef} className="relative py-24 bg-background transition-colors duration-300 overflow-hidden">
      {/* Background illustration */}
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 opacity-10 dark:opacity-5"
        style={{ y, opacity }}
      >
        <Image 
          src="/cloud-network.svg" 
          alt="" 
          width={500} 
          height={300}
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
            <span className="px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-sm font-medium">
              Ventajas Competitivas
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Por qué los Líderes Eligen{" "}
            <span className="text-primary dark:text-primary-light">SaintSoft</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convierta desafíos tecnológicos en ventajas competitivas con un equipo de élite a su lado.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className="relative group"
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-linear-to-br ${benefit.color} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                
                <div className="relative p-8 bg-surface-card rounded-3xl border border-surface-border group-hover:border-primary/30 dark:group-hover:border-primary-light/30 transition-all duration-300 h-full shadow-sm dark:shadow-lg dark:shadow-black/20">
                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-blue-600/5 dark:from-primary/10 dark:via-transparent dark:to-primary-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  
                  {/* Icon with animated background */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative inline-flex items-center justify-center w-16 h-16 mb-6"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-linear-to-br ${benefit.color} rounded-2xl`}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{ opacity: 0.1 }}
                    />
                    <div className={`relative z-10 w-full h-full bg-linear-to-br ${benefit.color} rounded-2xl flex items-center justify-center`}>
                      <Icon className="text-white" size={32} />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                  
                  {/* Animated corner accent */}
                  <motion.div
                    className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${benefit.color} opacity-0 group-hover:opacity-20 rounded-bl-full transition-opacity duration-500`}
                    style={{ borderRadius: "0 24px 0 100%" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
