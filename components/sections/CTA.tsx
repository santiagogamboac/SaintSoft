"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { trackEvent } from "@/lib/analytics";

export default function CTA() {
  return (
    <section className="py-24 bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-[#252526] dark:via-[#2d2d30] dark:to-[#1e1e1e] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para Organizar su Operación?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Empecemos por un diagnóstico: entendemos su proceso antes de proponer una solución.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="#contacto"
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 border-0"
              onClick={() => trackEvent("click_diagnostic_cta", { source: "cta_banner" })}
            >
              Solicitar Diagnóstico
              <ArrowRight size={20} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
