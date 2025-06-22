import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/channel-settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/channel-settings/"!</div>
}
