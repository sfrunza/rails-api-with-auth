// import PageContainer from '@/components/page-container'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  CalculatorIcon,
  CalendarCogIcon,
  DollarSignIcon,
  HousePlusIcon,
  Package2Icon,
  PencilRulerIcon,
  SettingsIcon,
  TruckIcon,
  UserRoundCogIcon
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router'

const navLinks = [
  {
    name: 'Moving Services',
    href: 'services',
    icon: PencilRulerIcon
  },
  {
    name: 'Extra Services',
    href: 'extra-services',
    icon: HousePlusIcon
  },
  {
    name: 'Packing',
    href: 'packing',
    icon: Package2Icon
  },
  { name: 'Trucks', href: 'trucks', icon: TruckIcon, prefetchUrl: '/trucks' },
  {
    name: 'Rates',
    href: 'rates',
    icon: DollarSignIcon
  },
  {
    name: 'Calendar Rates',
    href: 'calendar-rates',
    icon: CalendarCogIcon
  },
  {
    name: 'Department',
    href: 'department',
    icon: UserRoundCogIcon
  },
  {
    name: 'Company',
    href: 'company',
    icon: SettingsIcon
  },
  {
    name: 'Calculator',
    href: 'calculator',
    icon: CalculatorIcon
  }
]

export default function SettingsPage() {
  const { pathname } = useLocation()
  return (
    <aside
      className={cn(
        'hidden bg-pink-200 p-2 overflow-y-auto h-full lg:block lg:border-r',
        {
          block: pathname === '/crm/settings'
        }
      )}
    >
      <div className="p-4 bg-green-200">
        <h2 className="px-6 pt-4 text-lg font-semibold">Settings</h2>
        <div className="space-y-2 p-4">
          {navLinks.map((item, i) => {
            return (
              <NavLink
                key={i}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({
                      variant: isActive ? 'secondary' : 'ghost',
                      className: 'w-full justify-start text-left'
                    })
                  )
                }
              >
                <item.icon className="size-4" />
                {item.name}
              </NavLink>
            )
          })}
          {navLinks.map((item, i) => {
            return (
              <NavLink
                key={i}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({
                      variant: isActive ? 'secondary' : 'ghost',
                      className: 'w-full justify-start text-left'
                    })
                  )
                }
              >
                <item.icon className="size-4" />
                {item.name}
              </NavLink>
            )
          })}
          {navLinks.map((item, i) => {
            return (
              <NavLink
                key={i}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({
                      variant: isActive ? 'secondary' : 'ghost',
                      className: 'w-full justify-start text-left'
                    })
                  )
                }
              >
                <item.icon className="size-4" />
                {item.name}
              </NavLink>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
