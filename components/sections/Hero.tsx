"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Suave fade al hacer scroll — NO desplaza ni escala el contenido
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.6]);
  const dashboardY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);

      mouseX.set(normalizedX * 15);
      mouseY.set(normalizedY * 15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ===== LAYER 1: Gradient base — solo azules ===== */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-50 via-blue-50/30 to-white dark:from-background dark:via-surface-card/30 dark:to-background" />

      {/* ===== LAYER 2: Orbes de gradiente azul monocromático ===== */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-[200px] -left-[200px] w-[800px] h-[800px] rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(59,130,246,0.06) 50%, transparent 70%)",
            }}
            animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-[200px] -right-[200px] w-[700px] h-[700px] rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(6,182,212,0.06) 50%, transparent 70%)",
            }}
            animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(59,130,246,0.04) 50%, transparent 70%)",
            }}
            animate={{ x: [-30, 40, -30], y: [20, -30, 20] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      {/* ===== LAYER 3: Dot grid pattern con fade radial ===== */}
      <div className="absolute inset-0 dot-grid-pattern" />

      {/* ===== LAYER 4: Scanner line animada ===== */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 100px,
            rgba(37,99,235,0.4) 100px, rgba(37,99,235,0.4) 101px
          )`,
        }}
        animate={{ y: [0, 100] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* ===== LAYER 5: Ruido premium ===== */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ===== CONTENIDO PRINCIPAL — Layout Split ===== */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 w-full"
        style={{ opacity: contentOpacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ===== COLUMNA IZQUIERDA: Texto ===== */}
          <div className="text-left relative">
            {/* Contenedor Premium Glassmorphism - Optimizado para visibilidad en Dark Mode */}
            <div className="absolute -inset-x-6 -inset-y-8 sm:-inset-10 lg:-inset-16 -z-10 hidden dark:block">
              {/* Capa de desenfoque y color ligeramente más claro para contraste */}
              <div className="absolute inset-0 bg-surface-card/60 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]" />
            </div>
            
            {/* Badge corporativo */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-500/30 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 tracking-wide uppercase">
                Software + Operación + Automatización
              </span>
            </motion.div>

            {/* Título principal */}
            <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-black leading-[1.1] tracking-tight mb-5">
              {["Transformamos", "operaciones", "reales", "en"].map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3 text-foreground"
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                className="inline-block relative mr-3"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.62, duration: 0.6 }}
              >
                <span className="relative z-10 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 dark:from-blue-400 dark:via-blue-300 dark:to-sky-400 bg-clip-text text-transparent animate-gradient-x">
                  software
                </span>
                {/* Glow detrás de la palabra destacada */}
                <motion.span
                  className="absolute inset-0 blur-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 opacity-20"
                  animate={{ opacity: [0.15, 0.3, 0.15] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.span>
              <motion.span
                className="inline-block text-foreground"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                escalable
              </motion.span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              className="text-base sm:text-lg text-gray-600 dark:text-[#d4d4d4] mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              Diseñamos CRM, automatizaciones y plataformas empresariales a partir de{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                procesos validados
              </span>
              , con implementación estructurada y acompañamiento continuo.
            </motion.p>

            {/* Botones CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
            >
              <motion.a
                href="#contacto"
                onClick={() => trackEvent("click_diagnostic_cta", { source: "hero" })}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Solicitar Diagnóstico
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#caso-tiviplay"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-foreground bg-transparent border-2 border-surface-border hover:border-blue-400 dark:hover:border-blue-500 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Ver Caso TiviPlay
              </motion.a>
            </motion.div>

            {/* Franja de confianza */}
            <motion.a
              href="#caso-tiviplay"
              className="inline-flex items-center gap-2.5 mb-10 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.7 }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600" />
              </span>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Caso real: <span className="font-semibold">JUMOCOL SAS / TiviPlay</span> — servicios recurrentes, recaudo, soporte y conciliación operacional.
              </span>
            </motion.a>
          </div>

          {/* ===== COLUMNA DERECHA: Dashboard flotante 3D ===== */}
          <motion.div
            className="relative hidden lg:block perspective-2000"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.6,
              duration: 1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{ y: dashboardY }}
          >
            {/* Glow detrás del dashboard */}
            <div className="absolute inset-[-40px] -z-10 blur-[60px] opacity-30 dark:opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 via-sky-400 to-cyan-400 rounded-3xl" />
            </div>

            {/* Dashboard principal con perspectiva 3D */}
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                x: smoothMouseX,
                y: smoothMouseY,
                transformStyle: "preserve-3d",
                transform: "rotateY(-4deg) rotateX(2deg)",
              }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/15 dark:shadow-blue-500/10 border border-blue-200/40 dark:border-blue-500/30 ring-1 ring-blue-100/20 dark:ring-blue-900/20">
                <Image
                  src="/dashboard-preview.png"
                  alt="SaintSoft Enterprise Dashboard"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                  priority
                />

                {/* Overlay sutil de reflexión */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/[0.03] via-transparent to-white/[0.05]" />

                {/* Shine sweep effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 6,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ===== Gradient fade inferior ===== */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white dark:from-background via-white/80 dark:via-background/80 to-transparent pointer-events-none z-20" />

      {/* ===== Scroll indicator ===== */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.a
          href="#productos"
          className="flex flex-col items-center gap-2 group"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest group-hover:text-blue-500 transition-colors">
            Explorar
          </span>
          <ChevronDown
            size={18}
            className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors"
          />
        </motion.a>
      </motion.div>
    </section>
  );
}
