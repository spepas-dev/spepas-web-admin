import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import ErrorBoundary from '@/components/errors/error-boundary';
import PageLoader from '@/components/loaders/pageLoader';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/features/auth/contexts/AuthContext/AuthContext';
import { queryClient } from '@/lib/react-query';
import { router } from '@/routes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </Suspense>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
