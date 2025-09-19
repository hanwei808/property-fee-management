import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"

export default function HomePage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col" style={{ marginLeft: '184px' }}>
          <Header />
          <main className="flex-1 p-6 bg-muted/30">
            <Dashboard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
