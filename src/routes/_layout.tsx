import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Sidebar } from '@/widgets/sidebar/ui/sidebar'
import { Header } from '@/widgets/header/ui/header'

export const Route = createFileRoute('/_layout')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="bg-muted min-h-screen">
      <div className="p-4 flex">
        <Sidebar className="p-6 mr-2" />
        <div className="bg-background rounded-xl shadow-sm border shrink-1 min-w-0 grow-1">
          <Header />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
