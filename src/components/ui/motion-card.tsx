"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface MotionCardProps {
  children: ReactNode
  className?: string
  delay?: number
  index?: number
}

export function MotionCard({ children, className, delay = 0, index = 0 }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay + (index * 0.1),
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -4,
        boxShadow: "0 12px 24px rgba(15, 89, 89, 0.15)"
      }}
      className={cn("h-full", className)}
    >
      <Card className="neumorphic bg-card border-border h-full hover:shadow-card-hover transition-all duration-300">
        <CardContent className="p-0 h-full">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface MotionBadgeProps {
  children: ReactNode
  className?: string
  variant?: "default" | "success" | "warning" | "info"
}

export function MotionBadge({ children, className, variant = "default" }: MotionBadgeProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "bg-earth-green text-white"
      case "warning":
        return "bg-amber-alert text-white"
      case "info":
        return "bg-hope-blue text-white"
      default:
        return "bg-teal-primary text-white"
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        getVariantClasses(),
        className
      )}>
        {children}
      </div>
    </motion.div>
  )
}

interface MotionButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
}

export function MotionButton({ children, className, onClick, variant = "default", size = "default" }: MotionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        variant === "default" && "bg-teal-primary text-white hover:bg-teal-primary/90",
        variant === "outline" && "border border-input hover:bg-accent hover:text-accent-foreground",
        variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
        size === "sm" && "h-8 px-3",
        size === "default" && "h-10 py-2 px-4",
        size === "lg" && "h-12 px-8",
        className
      )}
    >
      {children}
    </motion.button>
  )
}