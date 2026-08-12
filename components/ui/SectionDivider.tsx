"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "wave" | "dots" | "gradient";
}

export default function SectionDivider({ variant = "wave" }: SectionDividerProps) {
  if (variant === "dots") {
    return (
      <div className="relative h-24 flex items-center justify-center overflow-hidden">
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className="relative h-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-primary/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  // Wave variant (default)
  return (
    <div className="relative h-24 overflow-hidden">
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="currentColor"
          className="text-primary/10"
          animate={{
            d: [
              "M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z",
              "M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z",
              "M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}
