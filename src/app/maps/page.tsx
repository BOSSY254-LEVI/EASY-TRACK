"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { InteractiveMap } from "@/components/maps/interactive-map"

export default function MapsPage() {
  return (
    <AppLayout>
      <InteractiveMap />
    </AppLayout>
  )
}
