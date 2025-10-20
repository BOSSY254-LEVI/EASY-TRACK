"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
  variant?: "card" | "text" | "avatar" | "button"
  lines?: number
}

export function LoadingSkeleton({ className, variant = "card", lines = 3 }: LoadingSkeletonProps) {
  const baseClasses = "bg-muted rounded-lg animate-pulse"
  
  const variantClasses = {
    card: "h-32 w-full",
    text: "h-4 w-full",
    avatar: "h-8 w-8 rounded-full",
    button: "h-10 w-24"
  }

  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(baseClasses, variantClasses.text)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{ width: i === lines - 1 ? "60%" : "100%" }}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  )
}

interface LoadingCardProps {
  className?: string
}

export function LoadingCard({ className }: LoadingCardProps) {
  return (
    <div className={cn("neumorphic bg-card border-border p-6 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <LoadingSkeleton variant="text" className="w-32" />
        <LoadingSkeleton variant="button" />
      </div>
      <LoadingSkeleton variant="text" lines={2} />
      <div className="space-y-2">
        <LoadingSkeleton variant="text" className="w-24" />
        <LoadingSkeleton variant="text" className="w-16" />
      </div>
    </div>
  )
}

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  }

  return (
    <motion.div
      className={cn(
        "border-2 border-teal-primary border-t-transparent rounded-full animate-spin",
        sizeClasses[size],
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  )
}