import { Navigate } from 'react-router'
import { verifyAuthLoader } from '@/loaders'
import CrmLayout from '@/layouts/crm/layout'
import { GlobalFallback } from '@/components/global-fallback'
import PrivateRoute from '@/components/private-route'
import SettingsLayout from '@/pages/crm/settings/layout'
import MovingServicesPage from '@/pages/crm/settings/services/page'
import ExtraServicesPage from '@/pages/crm/settings/extra-services/page'

// const DashboardLayout = lazy(() => import("@/layouts/dashboard/admin/layout"));
// const DashboardRequestsPage = lazy(
//   () => import("@/pages/dashboard/requests/page"),
// );
// const RequestLayout = lazy(() => import("@/layouts/dashboard/request/layout"));
// const DashboardRequestPage = lazy(
//   () => import("@/pages/dashboard/request/page"),
// );
// const ContractLayout = lazy(() => import("@/layouts/contract/layout"));
// const ContractPage = lazy(() => import("@/pages/contract/page"));
// const DashboardDispatchPage = lazy(
//   () => import("@/pages/dashboard/dispatch/page"),
// );
// const DashboardMessagesPage = lazy(
//   () => import("@/pages/dashboard/messages/page"),
// );
// const DashboardMessagePage = lazy(
//   () => import("@/pages/dashboard/messages/message/page"),
// );
// const DashboardSettingsPage = lazy(
//   () => import("@/pages/dashboard/settings/page"),
// );
// const DashboardServicesPage = lazy(
//   () => import("@/pages/dashboard/settings/services/page"),
// );
// const DashboardExtraServicesPage = lazy(
//   () => import("@/pages/dashboard/settings/extra-services/page"),
// );
// const DashboardPackingPage = lazy(
//   () => import("@/pages/dashboard/settings/packing/page"),
// );
// const DashboardTrucksPage = lazy(
//   () => import("@/pages/dashboard/settings/trucks/page"),
// );
// const DashboardRatesPage = lazy(
//   () => import("@/pages/dashboard/settings/rates/page"),
// );
// const DashboardCalendarRatesPage = lazy(
//   () => import("@/pages/dashboard/settings/calendar-rates/page"),
// );
// const DashboardDepartmentPage = lazy(
//   () => import("@/pages/dashboard/settings/department/page"),
// );
// const UserProfile = lazy(
//   () => import("@/pages/dashboard/settings/department/user-profile/page"),
// );
// const DashboardCompanyPage = lazy(
//   () => import("@/pages/dashboard/settings/company/page"),
// );

export const crmRoutes = {
  path: '/crm',
  loader: verifyAuthLoader,
  element: (
    <PrivateRoute allowedRoles={['admin', 'manager']}>
      <CrmLayout />
    </PrivateRoute>
  ),
  hydrateFallbackElement: <GlobalFallback />,
  children: [
    {
      index: true,
      element: <Navigate to="/crm/requests" replace />
    },
    {
      path: 'requests',
      element: <div>Requests</div>
    },
    {
      path: 'dispatch',
      element: <div>Dispatch</div>
    },
    {
      path: 'settings',
      element: <SettingsLayout />,
      children: [
        {
          path: 'services',
          element: <MovingServicesPage />
        },
        {
          path: 'extra-services',
          element: <ExtraServicesPage />
        },
        {
          path: 'packing',
          element: <div>Packing</div>
        }
      ]
    },
    {
      path: 'messages',
      element: <div>Messages</div>
    }
    // {
    //   path: "requests/:id",
    //   // element: <RequestLayout />,
    //   children: [
    //     {
    //       index: true,
    //       element: <DashboardRequestPage />,
    //     },
    //     {
    //       path: "contract",
    //       element: <ContractLayout />,
    //       children: [
    //         {
    //           index: true,
    //           element: <ContractPage />,
    //         },
    //         {
    //           path: "packing",
    //           element: <div>Packing</div>,
    //         },
    //         {
    //           path: "extra-services",
    //           element: <div>extra-services</div>,
    //         },
    //         {
    //           path: "photos",
    //           element: <PhotosPage />,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   path: "dispatch",
    //   element: <DashboardDispatchPage />,
    // },
    // {
    //   path: "messages",
    //   element: <DashboardMessagesPage />,
    //   children: [
    //     {
    //       path: ":requestId",
    //       element: <DashboardMessagePage />,
    //     },
    //   ],
    // },
    // {
    //   path: "settings",
    //   element: <DashboardSettingsPage />,
    //   children: [
    //     {
    //       path: "services",
    //       element: <DashboardServicesPage />,
    //     },
    //     {
    //       path: "extra-services",
    //       element: <DashboardExtraServicesPage />,
    //     },
    //     {
    //       path: "packing",
    //       element: <DashboardPackingPage />,
    //     },
    //     {
    //       path: "trucks",
    //       element: <DashboardTrucksPage />,
    //     },
    //     {
    //       path: "rates",
    //       element: <DashboardRatesPage />,
    //     },
    //     {
    //       path: "calendar-rates",
    //       element: <DashboardCalendarRatesPage />,
    //     },
    //     {
    //       path: "department",
    //       element: <DashboardDepartmentPage />,
    //       children: [
    //         {
    //           path: ":id",
    //           element: <UserProfile />,
    //         },
    //       ],
    //     },
    //     {
    //       path: "calculator",
    //       element: <CalculatorPage />,
    //       children: [
    //         {
    //           path: ":id",
    //           element: <MovingSizePage />,
    //         },
    //       ],
    //     },
    //     {
    //       path: "company",
    //       element: <DashboardCompanyPage />,
    //     },
    //   ],
    // },
  ]
}
