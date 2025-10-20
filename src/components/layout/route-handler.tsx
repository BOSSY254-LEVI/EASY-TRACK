"use client"

import { usePathname } from "next/navigation"
import { AppLayout } from "./app-layout"
import { DashboardView } from "@/components/dashboard/dashboard-view"
import { DataEntryView } from "@/components/data-entry/data-entry-view"

export function RouteHandler() {
  const pathname = usePathname()

  const renderView = () => {
    switch (pathname) {
      case "/":
        return <DashboardView />
      case "/data-entry":
        return <DataEntryView />
      default:
        return <DashboardView />
    }
  }

  return (
    <AppLayout>
      {renderView()}
    </AppLayout>
  )
}