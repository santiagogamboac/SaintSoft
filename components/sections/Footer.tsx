"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    productos: [
      { label: "CRM Operacional", href: "#productos" },
      { label: "Kit de Presencia Digital", href: "#productos" },
      { label: "Automatización Comercial", href: "#productos" },
      { label: "Desarrollo a Medida", href: "#productos" },
    ],
    empresa: [
      { label: "Caso TiviPlay", href: "#caso-tiviplay" },
      { label: "Tecnologías", href: "#tecnologias" },
      { label: "Contacto", href: "#contacto" },
    ],
    legal: [
      { label: "Política de Privacidad", href: "#" },
      { label: "Términos de Servicio", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  };

  const contactInfo = [
    { icon: Mail, text: "contacto@saintsoft.com", href: "mailto:contacto@saintsoft.com" },
    { icon: MapPin, text: "Carrera 63 #174B-11, Bogotá, Colombia", href: "#" },
  ];
  
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 dark:text-foreground">SaintSoft</h3>
              <p className="text-white/70 dark:text-gray-400 mb-6 leading-relaxed">
                Construimos el software que impulsa a las empresas del futuro. 
                Soluciones a medida, escalables y seguras.
              </p>
              <div className="space-y-3">
                {contactInfo.map((contact) => {
                  const Icon = contact.icon;
                  return (
                    <motion.a
                      key={contact.text}
                      href={contact.href}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-white/60 dark:text-[#858585] hover:text-white dark:hover:text-[#d4d4d4] transition-colors"
                    >
                      <Icon size={18} />
                      <span className="text-sm">{contact.text}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
          
          {/* Products */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-semibold mb-4 dark:text-[#d4d4d4]">Productos</h4>
              <ul className="space-y-3">
                {footerLinks.productos.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 dark:text-[#a6a6a6] hover:text-white dark:hover:text-[#d4d4d4] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Company */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-semibold mb-4 dark:text-[#d4d4d4]">Empresa</h4>
              <ul className="space-y-3">
                {footerLinks.empresa.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 dark:text-[#a6a6a6] hover:text-white dark:hover:text-[#d4d4d4] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Legal */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-semibold mb-4 dark:text-[#d4d4d4]">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 dark:text-[#a6a6a6] hover:text-white dark:hover:text-[#d4d4d4] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/40 dark:text-[#858585] text-sm">
            © {currentYear} SaintSoft. Todos los derechos reservados.
          </p>
          <p className="text-white/40 dark:text-[#858585] text-sm">
            Hecho con ❤️ para empresas que construyen el futuro
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
