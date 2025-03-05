import { Outlet } from 'react-router'
import Cookies from 'js-cookie'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { ModeToggle } from '@/components/mode-toggle'
import { AppSidebar } from './app-sidebar'
import { CreateRequestButton } from './create-request-button'
import { GlobalSearch } from './global-search'
import MessageNotifications from './message-notifications'

export default function CrmLayout() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <CrmMain />
    </SidebarProvider>
  )
}

function CrmMain() {
  return (
    <SidebarInset>
      <header className="z-50 flex h-16 w-full items-center border-b bg-background px-4">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <CreateRequestButton />
            <GlobalSearch />
          </div>
          <div className="flex items-center gap-2">
            <MessageNotifications />
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="h-[calc(100svh-4rem)] overflow-hidden">
        <Outlet />
      </div>
    </SidebarInset>
  )
}
