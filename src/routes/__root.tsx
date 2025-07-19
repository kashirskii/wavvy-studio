import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'
import { NotFound } from '@/pages/not-found'
import { Header } from '@/pages/_layout/header/ui/header'
import { Sidebar } from '@/pages/_layout/sidebar'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
})

function RootComponent() {
  return (
    <>
      <div className="bg-sidebar min-h-screen">
        <div className="p-4 flex items-start">
          <Sidebar className="py-6 pr-6 mr-2" />
          <div className="bg-background rounded-xl shadow-sm border shrink-1 min-w-0 grow-1">
            <Header />
            <main className="p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
      <TanStackRouterDevtools />
      <Toaster />
    </>
  )
}
