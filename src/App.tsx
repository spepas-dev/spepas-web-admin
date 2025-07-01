import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import ErrorBoundary from '@/components/errors/error-boundary';
import PageLoader from '@/components/loaders/pageLoader';
import { ModalManager } from '@/components/ui/custom/modals';
import { Toaster } from '@/components/ui/sonner';
import { queryClient } from '@/lib/react-query';
import { router } from '@/routes';
import { useStore } from '@/stores';

function App() {
  const { actions } = useStore();

  // Initialize authentication on app start
  useEffect(() => {
    actions.checkAuth();
  }, [actions]);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
          <ModalManager />
        </Suspense>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
