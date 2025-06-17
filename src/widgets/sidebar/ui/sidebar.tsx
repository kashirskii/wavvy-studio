import { Button } from '@/shared/ui'
import { Link } from '@tanstack/react-router'
import { SidebarHeader } from './header'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'

export type Link = {
  label: string
  to: string
  icon: string
}

const links: Array<Link> = [
  { label: 'Home', to: '/', icon: '#' },
  { label: 'Channel Settings', to: '/channel-settings', icon: '#' },
  { label: 'Analytics', to: '/analytics', icon: '#' },
  { label: 'Content manager', to: '/content-manager', icon: '#' },
  { label: 'Community', to: '/community', icon: '#' },
]

export const Sidebar = ({ className, ...props }: ComponentProps<'nav'>) => {
  return (
    <nav className={cn('flex flex-col', className)} {...props}>
      <SidebarHeader />

      <ul className="flex flex-col p-2 gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Button variant="ghost" asChild className="justify-start w-full">
              <Link to={link.to}>{link.label}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
