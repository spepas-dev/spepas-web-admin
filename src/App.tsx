import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { Suspense } from 'react'
import ManufacturersPage from './features/inventoryManagement/manufacturers'
import ModelsPage from './features/inventoryManagement/models'
import BrandsPage from './features/inventoryManagement/brands'
import SparePartsPage from './features/inventoryManagement/spareParts'
import PermissionsPage from './features/accessControl/permissions'
import RolesPage from './features/accessControl/roles'
import UsersPage from './features/userManagement/users'
import GorosPage from './features/userManagement/goros'
import MechanicsPage from './features/userManagement/mechanics'
import ErrorBoundary from './components/errors/error-boundary'
import SellersPage from './features/userManagement/sellers'
import RidersPage from './features/userManagement/riders'
import VehiclesPage from './features/userManagement/vehicles'
import PaymentAccountsPage from './features/userManagement/payments'
import WelcomePage from './components/shared/welcome'
import PageLoader from './components/loaders/pageLoader'
import BaseTheme from './features/theme/basetheme'



function App() {

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          {/* <RouterProvider router={router} /> */}
          {/* <ModelsPage /> */}
          {/* <BrandsPage /> */}
          {/* <SparePartsPage /> */}
          {/* <ManufacturersPage /> */}
        {/* <RolesPage /> */}
        {/* <UsersPage /> */}
        {/* <GorosPage /> */}
        {/* <MechanicsPage /> */}
        {/* <SellersPage /> */}
        {/* <RidersPage /> */}
        {/* <VehiclesPage /> */}
        {/* <PaymentAccountsPage /> */}
        <WelcomePage />
        {/* <PageLoader /> */}
        {/* <BaseTheme /> */}
      </Suspense>
      </ErrorBoundary>
      </>
  )
}

export default App
