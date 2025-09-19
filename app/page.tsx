"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { cn } from "@/lib/utils"

function MainContent() {
  const { state } = useSidebar()
  
  return (
    <div className={cn(
      "flex-1 flex flex-col transition-all duration-300 ease-in-out",
      state === "expanded" ? "ml-46" : "ml-0" // ml-64 = 16rem = 256px, ml-12 = 3rem = 48px
    )}>
      <Header />
      <main className="flex-1 p-6 bg-muted/30">
        <Dashboard />
      </main>
    </div>
  )
}

export default function HomePage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <MainContent />
      </div>
    </SidebarProvider>
  )
}
