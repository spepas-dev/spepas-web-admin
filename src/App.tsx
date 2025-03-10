import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { Suspense } from 'react'


import ErrorBoundary from './components/errors/error-boundary'

import BaseTheme from './features/theme/basetheme'
import PageLoader from './components/loaders/pageLoader'


function App() {

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
      </>
  )
}

export default App
