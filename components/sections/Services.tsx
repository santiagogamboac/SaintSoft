"use client";

import { motion } from "framer-motion";
import { Bot, Database, Globe, CalendarClock } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Bot,
      title: "Chatbots de IA",
      description: "Asistentes virtuales inteligentes que atienden a sus clientes 24/7, responden preguntas y capturan leads automáticamente.",
    },
    {
      icon: Database,
      title: "CRM",
      description: "Sistemas para gestionar clientes, oportunidades de venta y el ciclo comercial completo de su negocio.",
    },
    {
      icon: Globe,
      title: "Páginas Web",
      description: "Sitios y aplicaciones web a medida, rápidos y adaptados a las necesidades de su empresa.",
    },
    {
      icon: CalendarClock,
      title: "Agendamiento de Citas",
      description: "Plataformas para que sus clientes reserven citas en línea, con recordatorios y gestión de disponibilidad.",
    },
  ];
  
  return (
    <section id="servicios" className="py-24 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestras Capacidades Core
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Desde la automatización de procesos hasta plataformas web complejas, nuestro expertise impulsa su eficiencia y rentabilidad.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Glow border on hover */}
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-60 blur transition duration-500 group-hover:duration-200" />
                
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="relative p-7 bg-surface-card rounded-2xl border border-surface-border group-hover:border-transparent transition-all duration-300 overflow-hidden h-full shadow-sm dark:shadow-lg dark:shadow-black/20"
                >
                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-blue-600/5 dark:from-primary/10 dark:via-transparent dark:to-primary-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="mb-5 w-12 h-12 bg-linear-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25"
                    >
                      <Icon className="text-white" size={24} />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground mb-2.5 group-hover:text-blue-500 dark:group-hover:text-primary-light transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-blue-600 via-blue-400 to-blue-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
