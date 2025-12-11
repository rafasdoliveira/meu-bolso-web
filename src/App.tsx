import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from '../src/router/main.routes';
import { ContextProviders } from '../src/shared/context/main.context';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProviders>
        <Toaster position='top-right' />
        <RouterProvider router={router} />
      </ContextProviders>
    </QueryClientProvider>
  );
}

export default App;
