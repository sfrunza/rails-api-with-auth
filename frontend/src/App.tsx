import { createBrowserRouter, Link, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import { store } from '@/store'
import { authRoutes } from '@/routes/auth.routes'
import { crmRoutes } from '@/routes/crm.routes'
import ErrorPage from '@/pages/error/page'
import AccountPage from '@/pages/account/page'
import { ThemeProvider } from '@/components/theme-provider'
import CrmLayout from '@/layouts/crm/layout'
import DialogProvider from '@/components/dialog-provider'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="flex flex-col gap-10">
        Hello world!
        <Link to="/auth/login">Login</Link>
        <Link to="/crm">crm</Link>
        <Link to="/account">account</Link>
        <Link to="/testing">testing</Link>
        <Link to="/schedule">schedule</Link>
      </div>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/account',
    element: <AccountPage />
  },
  {
    path: '/crm',
    element: <CrmLayout />
  },
  ...authRoutes,
  crmRoutes
  // accountRoutes,
  // dashboardRoutes
])

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          richColors
          // closeButton
        />
        <DialogProvider />
      </ThemeProvider>
    </Provider>
  )
}
