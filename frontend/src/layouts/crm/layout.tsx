import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
  // useSidebar
} from '@/components/ui/sidebar'
import { Outlet } from 'react-router'
import { AppSidebar } from './app-sidebar'
import { CreateRequestButton } from './create-request-button'
import { GlobalSearch } from './global-search'
import MessageNotifications from './message-notifications'
// import { useIsMobile } from '@/hooks/use-mobile'
import { ModeToggle } from '@/components/mode-toggle'
import Cookies from 'js-cookie'
import DialogProvider from '@/components/dialog-provider'

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
  // const { state } = useSidebar()
  // const isMobile = useIsMobile()
  return (
    <SidebarInset>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
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
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Outlet />
        <DialogProvider />
      </div>
    </SidebarInset>
  )
}
