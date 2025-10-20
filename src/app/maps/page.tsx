"use client"

import { AppLayout } from "@/components/layout/app-layout"
import dynamic from "next/dynamic"

const InteractiveMap = dynamic(
  () => import("@/components/maps/interactive-map").then((m) => m.InteractiveMap),
  { ssr: false }
)

export default function MapsPage() {
  return (
    <AppLayout>
      <InteractiveMap />
    </AppLayout>
  )
}
