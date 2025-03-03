import { ScrollArea } from '@/components/ui/scroll-area'
import { Outlet } from 'react-router'
import SettingsPage from './page'

export default function SettingsLayout() {
  return (
    <div className="grid h-full lg:grid-cols-[20rem_1fr] grid-cols-1">
      <SettingsPage />
      <ScrollArea className="h-full overflow-y-auto">
        <div className="p-4 bg-muted min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </ScrollArea>
    </div>
  )
}
