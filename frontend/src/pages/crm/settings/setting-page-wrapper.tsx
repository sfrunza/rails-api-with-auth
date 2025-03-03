import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { Link } from 'react-router'

type PageProps = {
  children: React.ReactNode
  className?: string
  title: string
}

export default function SettingPageWrapper({ children, title }: PageProps) {
  return (
    <div className="space-y-4">
      <div className="flex w-full items-center gap-4 pb-4 lg:border-none">
        <div className="lg:hidden">
          <Button variant="outline" size="icon" asChild>
            <Link to="/crm/settings">
              <ChevronLeftIcon />
            </Link>
          </Button>
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  )
}
