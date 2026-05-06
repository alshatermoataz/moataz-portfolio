"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedBlobProps {
  className?: string
  color?: string
}

export function AnimatedBlob({ className, color = "bg-emerald-500/30" }: AnimatedBlobProps) {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-3xl",
        color,
        className
      )}
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 30, -30, 0],
        y: [0, -30, 30, 0],
        borderRadius: [
          "60% 40% 30% 70%/60% 30% 70% 40%",
          "30% 60% 70% 40%/50% 60% 30% 60%",
          "60% 40% 30% 70%/60% 30% 70% 40%",
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}
