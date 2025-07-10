import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'
import { Sidebar } from '@/widgets/sidebar/ui/sidebar'
import { Header } from '@/widgets/header/ui/header'
import { NotFound } from '@/pages/not-found'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
})

function RootComponent() {
  return (
    <>
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
      <TanStackRouterDevtools />
      <Toaster />
    </>
  )
}
