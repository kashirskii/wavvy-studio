import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Sidebar } from '@/widgets/sidebar/ui/sidebar'
import { Header } from '@/widgets/header/ui/header'

export const Route = createFileRoute('/_layout')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="bg-[#fafafa] min-h-screen">
      <div className="flex">
        <Sidebar className="p-6 mr-2" />
        <div className="bg-white rounded-xl w-full">
          <Header />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
