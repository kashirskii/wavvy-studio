import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/analytics/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/analytics/"!</div>
}
