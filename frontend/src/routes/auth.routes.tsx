import { Navigate } from 'react-router'

import { GlobalFallback } from '@/components/global-fallback'
import ForgotPasswordPage from '@/pages/auth/forgot-password/page'
import AuthLayout from '@/pages/auth/layout'
import LoginPage from '@/pages/auth/login/page'
import ResetPasswordPage from '@/pages/auth/reset-password/page'
import { settingsLoader } from '@/loaders'

export const authRoutes = [
  {
    path: 'auth',
    element: <AuthLayout />,
    loader: settingsLoader,
    hydrateFallbackElement: <GlobalFallback />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />
      }
    ]
  }
]
