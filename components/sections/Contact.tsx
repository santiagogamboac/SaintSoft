"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "No se pudo enviar el formulario.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "No se pudo enviar el formulario.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  return (
    <section id="contacto" className="py-24 bg-surface-hover/5 dark:bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-[#ffffff] mb-4">
            Agenda tu Sesión Estratégica
          </h2>
          <p className="text-xl text-gray-600 dark:text-[#d4d4d4] max-w-3xl mx-auto">
            Conversemos sobre cómo podemos impulsar su transformación digital
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface-card p-8 rounded-2xl border border-surface-border dark:shadow-lg dark:shadow-black/20"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-[#ffffff] mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-[#ffffff] mb-2">
                  Email Corporativo *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-[#ffffff] mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Opcional, si prefieres que te llamemos"
                  className="w-full px-4 py-3 bg-background border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-900 dark:text-[#ffffff] mb-2">
                  Empresa *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-[#ffffff] mb-2">
                  Cuéntanos sobre tu proyecto *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3c3c3c] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-[#ffffff] resize-none"
                />
              </div>
              
              {status === "success" && (
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-sm">
                  ¡Gracias por contactarnos! Nos pondremos en contacto pronto.
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm">
                  {errorMessage}
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
                {status === "submitting" ? "Enviando..." : "Enviar Solicitud"}
              </Button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-[#ffffff] mb-6">
                Información de Contacto
              </h3>
              <p className="text-gray-600 dark:text-[#d4d4d4] leading-relaxed mb-8">
                Estamos aquí para ayudarle a transformar su visión en realidad. 
                Contáctenos y descubra cómo podemos impulsar su negocio con tecnología de vanguardia.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-[#ffffff] mb-1">Email</div>
                  <a href="mailto:contacto@saintsoft.com" className="text-gray-600 dark:text-[#d4d4d4] hover:text-primary transition-colors">
                    contacto@saintsoft.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-[#ffffff] mb-1">Ubicación</div>
                  <p className="text-gray-600 dark:text-[#d4d4d4]">
                    Carrera 63 #174B-11<br />
                    Bogotá, Colombia
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-surface-border">
              <p className="text-sm text-gray-600 dark:text-[#a6a6a6]">
                Tiempo de respuesta promedio: <span className="font-semibold text-gray-900 dark:text-[#ffffff]">24 horas</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
