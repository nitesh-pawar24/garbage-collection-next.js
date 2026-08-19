'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, ThemeWatcher } from '@/contexts/ThemeContext';
import GlobalScrollLock from '@/components/GlobalScrollLock';

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
      },
    },
  }));

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeWatcher />
        <GlobalScrollLock />
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={3}
        />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
