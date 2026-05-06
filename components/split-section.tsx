"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface SplitSectionProps {
  leftContent: React.ReactNode
  rightContent: React.ReactNode
  className?: string
}

export function SplitSection({ leftContent, rightContent, className }: SplitSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const leftY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rightY = useTransform(scrollYProgress, [0, 1], [-100, 100])

  return (
    <div ref={ref} className={cn("grid md:grid-cols-2 gap-8 items-center", className)}>
      <motion.div style={{ y: leftY }}>{leftContent}</motion.div>
      <motion.div style={{ y: rightY }}>{rightContent}</motion.div>
    </div>
  )
}
