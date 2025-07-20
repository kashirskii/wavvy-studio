import { createFileRoute } from '@tanstack/react-router'
import { RegistrationForm } from '@/modules/auth'

export const Route = createFileRoute('/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RegistrationForm />
}
