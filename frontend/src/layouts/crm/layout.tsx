import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
  // useSidebar
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
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
// import DialogProvider from '@/components/dialog-provider'
// import { useIsMobile } from '@/hooks/use-mobile'
// import { cn } from '@/lib/utils'

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
  const { state } = useSidebar()
  const isMobile = useIsMobile()
  return (
    <SidebarInset>
      <div
        className={cn(
          'fixed left-0 right-0 top-0 z-10 max-h-screen overflow-hidden bg-background',
          {
            'transition-[left,right,width] duration-200 ease-linear': !isMobile,
            'left-[var(--sidebar-width)] w-[calc(100%-var(--sidebar-width))]':
              !isMobile && state === 'expanded',
            'left-[var(--sidebar-width-icon)] w-[calc(100%-var(--sidebar-width-icon))]':
              !isMobile && state === 'collapsed'
          }
        )}
      >
        <header
          className={cn(
            'z-50 flex h-16 w-full items-center gap-2 border-b bg-background px-4'
          )}
        >
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
        <div className="z-0 h-[calc(100vh-64px)] overflow-hidden">
          <Outlet />
        </div>
      </div>
    </SidebarInset>
  )
}
