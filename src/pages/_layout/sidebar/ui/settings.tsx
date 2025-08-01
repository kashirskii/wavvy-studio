import { Bot, Home, Settings, User } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

const tabs = [
  {
    name: 'Home',
    value: 'home',
    icon: Home,
  },
  {
    name: 'Profile',
    value: 'profile',
    icon: User,
  },
  {
    name: 'Messages',
    value: 'messages',
    icon: Bot,
  },
  {
    name: 'Settings',
    value: 'settings',
    icon: Settings,
  },
]

export const SidebarSettingsDialog = () => {
  return (
    <Tabs
      orientation="vertical"
      defaultValue={tabs[0].value}
      className="w-full flex items-start gap-4 justify-center flex-row"
    >
      <TabsList className="shrink-0 grid grid-cols-1 min-w-28 p-0 bg-background">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="border-l-2 border-transparent justify-start rounded-none data-[state=active]:shadow-none data-[state=active]:border-l-primary data-[state=active]:bg-primary/5 py-1.5"
          >
            <tab.icon className="h-5 w-5 me-2" /> {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="h-full flex items-center justify-center w-full border rounded-md font-medium text-muted-foreground">
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.name} Content
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
