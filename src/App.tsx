import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { Suspense } from 'react'


import ErrorBoundary from './components/errors/error-boundary'
import PageLoader from './components/loaders/pageLoader'
import { AuthProvider } from './features/auth/contexts/AuthContext/AuthContext'


function App() {

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </Suspense>
      </ErrorBoundary>
      </>
  )
}

export default App
