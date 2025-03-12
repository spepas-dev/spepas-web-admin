import { RouterProvider } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from '@/routes'
import { Suspense } from 'react'


import ErrorBoundary from './components/errors/error-boundary'
import PageLoader from './components/loaders/pageLoader'
import { AuthProvider } from './features/auth/contexts/AuthContext/AuthContext'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </Suspense>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
