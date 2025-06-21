import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/video/$id/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/video/$id/edit/"!</div>
}
